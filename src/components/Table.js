import React from "react";
import './css/Table.css'

class Table extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            translationData: [],
            columnConfig: [
                {
                    name: "zh_cn",
                    sortOrder: "undefined"
                },
                {
                    name: "English",
                    sortOrder: "undefined"
                },
                {
                    name: "it_italiano",
                    sortOrder: "undefined"
                },
                {
                    name: "arabic",
                    sortOrder: "undefined"
                },
                {
                    name: "serbian",
                    sortOrder: "undefined",

                },
                {
                    name: "croatian",
                    sortOrder: "undefined"
                },
                {
                    name: "russian",
                    sortOrder: "undefined"
                },
                {
                    name: "de_german",
                    sortOrder: "undefined"
                },
                {
                    name: "hebrew",
                    sortOrder: "undefined"
                },
                {
                    name: "fr_french",
                    sortOrder: "undefined"
                },
                {
                    name: "hu_hungarian",
                    sortOrder: "undefined"
                },
                {
                    name: "slovak",
                    sortOrder: "undefined"
                },
                {
                    name: "es_spanish",
                    sortOrder: "undefined"
                },
                {
                    name: "portuguese",
                    sortOrder: "undefined"
                },
                {
                    name: "turkce",
                    sortOrder: "undefined"
                },
                {
                    name: "gr_greek",
                    sortOrder: "undefined"
                },
                {
                    name: "romanian",
                    sortOrder: "undefined"
                }
            ]
        };
    }

    renderTableData() {
        if ( this.state.translationData.length !== 0 ) {
            return this.state.translationData.map( ( translation, index ) => {

                const [ chinese, pinyin, english, italian, arabic, serbian, croatian, russian, german, hebrew, french,
                    hungarian, slovak, spanish, portuguese, turkce, greek, romanian ]
                    = translation // Destructuring.

                return (
                    <tr key={ index }>
                        <td>{ chinese + " " + pinyin }</td>
                        <td>{ english }</td>
                        <td>{ italian }</td>
                        <td>{ arabic }</td>
                        <td>{ serbian }</td>
                        <td>{ croatian }</td>
                        <td>{ russian }</td>
                        <td>{ german }</td>
                        <td>{ hebrew }</td>
                        <td>{ french }</td>
                        <td>{ hungarian }</td>
                        <td>{ slovak }</td>
                        <td>{ spanish }</td>
                        <td>{ portuguese }</td>
                        <td>{ turkce }</td>
                        <td>{ greek }</td>
                        <td>{ romanian }</td>
                    </tr>
                )
            })
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
            this.state.columnConfig.map( ( column, index ) => {
                return (
                    <th key={ index } scope={ "col" } className={ column.sortOrder }
                        onClick={ ( event ) => this.sortColumn( event ) }>{ column.name }
                    </th>
                );
            } )
        );
    }

    componentDidMount() {
        fetch( 'https://cmlgbackend.wdcc.co.nz/translations' )
            .then( results => {
                return results.json();
            })
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

                this.setState({
                    translationData: sortedListOfWords
                });
            })
    }

    sortColumn( event ) {

        // headers in the table are in the format: [ chinese + pinyin, english ... ]
        // translationData contains array in the format: [ chinese, pinyin, english ... ]
        const clickedColumnIndex = event.target.cellIndex;
        const sortElementIndex = clickedColumnIndex + 1;

        let newColumnConfig = this.state.columnConfig.slice();

        newColumnConfig.map( ( column, index ) => {
            if ( index === clickedColumnIndex ) {
                return column.sortOrder === "ascending" ? column.sortOrder = "descending" :
                       column.sortOrder = "ascending";
            } else {
                return column.sortOrder = "undefined"
            }
        } )

        const order = newColumnConfig[ clickedColumnIndex ].sortOrder;
        let sortedTranslationData = this.state.translationData.slice();
        sortedTranslationData.sort(( row1, row2 ) => {

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

        });

        this.setState({
            translationData: sortedTranslationData,
            columnConfig: newColumnConfig
        })
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

