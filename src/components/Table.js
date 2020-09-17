import React from "react";
import './css/Table.css'

class Table extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            translationData: this.props.data,
            columnSortStatus: new Array( 17 ).fill( "undefined" )
        };
    }

    componentDidUpdate( prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS ) {
        console.log("component did update gets called");

        if ( this.props.data !== prevState.translationData ) {
            console.log("update state is called")
            this.setState( {
                translationData: this.props.data
            } )
        }
    }

    renderTableData() {
        console.log("data in table state")
        console.log(this.state.translationData);

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
                        <td style={ { display: this.props.columns[ 1 ].select ? "table-cell" : "none",
                            // left: this.props.columns[ 0 ].select ? "11.45%" : 0
                        } }>
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
        } else if ( this.props.isLoading ) {
            return (
                <tr>
                    <td>{ "Loading" }</td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{ "No results found" }</td>
                </tr>
            )
        }
    }

    renderTableHeaders() {
        return (
            this.state.columnSortStatus.map( ( sortStatus, colIndex ) => {
                if ( colIndex === 1 ) {
                    return (
                        <th key={ colIndex } scope={ "col" } className={ sortStatus }
                            onClick={ ( event ) => this.sortColumn( event ) }
                            style={ {
                                display: this.props.columns[ colIndex ].select ? "table-cell" : "none",
                                // left: this.props.columns[ 0 ].select ? "11.45%" : 0
                            } }>
                            { this.props.columns[ colIndex ].id }
                        </th>
                    );
                } else {
                    return (
                        <th key={ colIndex } scope={ "col" } className={ sortStatus }
                            onClick={ ( event ) => this.sortColumn( event ) }
                            style={ {
                                display: this.props.columns[ colIndex ].select ?
                                    "table-cell" : "none"
                            } }>
                            { this.props.columns[ colIndex ].id }
                        </th>
                    );
                }
            } )
        );
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

