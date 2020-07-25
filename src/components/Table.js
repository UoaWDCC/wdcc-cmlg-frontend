import React from "react";
import './css/Table.css'

class Table extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            translationData: [],
            columnSortStatus: new Array( 17 ).fill( "undefined" )
        };
    }

    renderTableData() {
        if ( this.state.translationData.length !== 0 ) {
            return this.state.translationData.map( ( translation, index ) => {

                const [ chinese, pinyin, english ] = translation // Destructuring.
                const translationsWithoutChineseAndEnglish = translation.slice( 3 );

                return (
                    <tr key={ index }>
                        <td style={ { display: this.props.columns[ 0 ].select ? "table-cell" : "none" } }>
                            { chinese + " " + pinyin }
                        </td>

                        {/* English is not put into the loop because we may need to put a special function
                            on it later to fix the position of this column, i.e. when the user scrolls the table
                            to the right, this column is fixed.
                         */}
                        <td style={ { display: this.props.columns[ 1 ].select ? "table-cell" : "none" } }>
                            { english }
                        </td>

                        {
                            // index starts with 0, representing the word in Italian
                            // Italian in property "columns" is at position 2
                            translationsWithoutChineseAndEnglish.map( ( word, index ) => {
                                const columnIndex = index + 2;
                                return (
                                    <td key={ columnIndex }
                                        style={ { display: this.props.columns[ columnIndex ].select ?
                                                "table-cell" : "none" } }>
                                        { word }
                                    </td>
                                );
                            } )
                        }

                    </tr>
                )
            } )
        } else {
            return (
                <tr>
                    <td>{ "loading" }</td>
                </tr>
            )
        }
    }

    renderTableHeaders() {
        return (
            this.state.columnSortStatus.map( ( sortStatus, colIndex ) => {
                return (
                    <th key={ colIndex } scope={ "col" } className={ sortStatus }
                        onClick={ ( event ) => this.sortColumn( event ) }
                        style={ { display: this.props.columns[ colIndex ].select ?
                                  "table-cell" : "none" } }>
                        { this.props.columns[ colIndex ].id }
                    </th>
                );
            } )
        );
    }

    componentDidMount() {
        fetch( 'https://cmlgbackend.wdcc.co.nz/translations' )
            .then( results => {
                return results.json();
            } )
            .then( data => {
                let sortedListOfWords = [];
                let translationsForOneWord = [];
                let dataIndex;
                let currentData;

                for ( dataIndex = 0; dataIndex < data.length; dataIndex++ ) {
                    currentData = data[ dataIndex ];

                    // Check if the translated word is in the correct column (under the correct language). So if the
                    // English translation for the word is not under English, throw an exception.
                    // + 1 infront of translationsForOneWord.length because the index starts from 0, whereas language_id
                    // starts from 1.
                    if ( translationsForOneWord.length + 1 === currentData.language_id ) {
                        translationsForOneWord[ translationsForOneWord.length ] = currentData.name;
                    } else {
                        throw new Error( "The translated word does not match the language." );
                    }

                    const numberOfLanguages = 18;

                    // When the word is translated to all languages, add translationsForOneWord into sortedListOfWords.
                    // Empty translationsForOneWord so a new translationsForOneWord can be made for a new word.
                    if ( translationsForOneWord.length === numberOfLanguages ) {
                        sortedListOfWords[ sortedListOfWords.length ] = translationsForOneWord;
                        translationsForOneWord = [];
                    }
                }

                this.setState( {
                    translationData: sortedListOfWords
                } );
            } )
    }

    sortColumn( event ) {

        // headers in the table are in the format: [ chinese + pinyin, english ... ]
        // translationData contains array in the format: [ chinese, pinyin, english ... ]
        const clickedColumnIndex = event.target.cellIndex;
        const sortElementIndex = clickedColumnIndex + 1;

        let newColumnSortStatus = this.state.columnSortStatus.slice();

        newColumnSortStatus.map( ( sortDirection, colIndex ) => {
            if ( colIndex === clickedColumnIndex ) {
                return sortDirection === "ascending" ? newColumnSortStatus[ colIndex ] = "descending" :
                       newColumnSortStatus[ colIndex ] = "ascending";
            } else {
                return newColumnSortStatus[ colIndex ] = "undefined";
            }
        } )

        const order = newColumnSortStatus[ clickedColumnIndex ];
        let sortedTranslationData = this.state.translationData.slice();
        sortedTranslationData.sort( ( row1, row2 ) => {

            let word1 = row1[ sortElementIndex ];
            let word2 = row2[ sortElementIndex ];

            if ( !word1 ) {
                return 1;
            } else if ( !word2 ) {
                return -1;
            } else {

                const collator = new Intl.Collator();

                if ( order === "ascending" ) {
                    return collator.compare( word1, word2 );
                } else {
                    return collator.compare( word2, word1 );
                }
            }

        } );

        this.setState( {
            translationData: sortedTranslationData,
            columnSortStatus: newColumnSortStatus
        } )
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        { this.renderTableHeaders() }
                    </tr>
                </thead>

                <tbody>
                    { this.renderTableData() }
                </tbody>
            </table>
        );
    }
}

export default Table;

