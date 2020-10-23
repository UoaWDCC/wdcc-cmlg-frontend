import React from "react";
import './css/Table.css'

class Table extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            columnSortStatus: {
                currentSortedColumnIndex: -1,
                sortStatus: new Array( 17 ).fill( "undefined" )
            }
        };
    }

    renderTableData() {

        if ( this.props.data.length !== 0 ) {

            let sortedData = this.sortColumn();

            if ( this.props.rowsPerPage !== "all" ) {
                sortedData = this.getDisplayedData( sortedData );
            }

            return sortedData.map( ( translation, index ) => {

                const [ chinese, pinyin, english ] = translation // Destructuring.
                const translationsWithoutChineseAndEnglish = translation.slice( 3 );

                return (
                    // <tr key={ index } className={ this.props.darkMode ? "" : "" }>
                    <tr key={ index } >
                        <td style={ { display: this.props.columns[ 0 ].select ? "table-cell" : "none" } }>
                            { chinese + " " + pinyin }
                        </td>

                        {   // TODO fix the english column
                            /* English is not put into the loop because we may need to put a special function
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
            this.state.columnSortStatus.sortStatus.map( ( sortStatus, colIndex ) => {
                if ( colIndex === 1 ) {
                    return (
                        <th key={ colIndex } scope={ "col" } className={ sortStatus }
                            onClick={ ( event ) => this.onSortChanges( event ) }
                            style={ {
                                display: this.props.columns[ colIndex ].select ? "table-cell" : "none",
                                // TODO: fix this column when scrolling horizontally
                                // left: this.props.columns[ 0 ].select ? "11.45%" : 0
                            } }>
                            { this.props.columns[ colIndex ].id }
                        </th>
                    );
                } else {
                    return (
                        <th key={ colIndex } scope={ "col" } className={ sortStatus }
                            onClick={ ( event ) => this.onSortChanges( event ) }
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

    onSortChanges( event ) {
        const clickedColumnIndex = event.target.cellIndex;

        let newColumnSortStatusValue = this.state.columnSortStatus.sortStatus.slice();

        newColumnSortStatusValue.map( ( sortDirection, colIndex ) => {
            if ( colIndex === clickedColumnIndex ) {
                return sortDirection === "ascending" ? newColumnSortStatusValue[ colIndex ] = "descending" :
                       newColumnSortStatusValue[ colIndex ] = "ascending";
            } else {
                return newColumnSortStatusValue[ colIndex ] = "undefined";
            }
        } )

        this.setState( {
            columnSortStatus: {
                currentSortedColumnIndex: clickedColumnIndex,
                sortStatus: newColumnSortStatusValue
            }
        } )
    }

    sortColumn() {

        let sortedTranslationData = this.props.data.slice();
        const sortedColumnIndex = this.state.columnSortStatus.currentSortedColumnIndex;

        // check if a column needs to be sorted
        if ( sortedColumnIndex >= 0 ) {
            // headers in the table are in the format: [ chinese + pinyin, english ... ]
            // translationData contains array in the format: [ chinese, pinyin, english ... ]
            const dataIndex = sortedColumnIndex + 1;

            const order = this.state.columnSortStatus.sortStatus[ sortedColumnIndex ];

            sortedTranslationData.sort( ( row1, row2 ) => {

                let word1 = row1[ dataIndex ];
                let word2 = row2[ dataIndex ];

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
        }

        return sortedTranslationData;
    }

    getDisplayedData(sortedData ) {

        let dataDisplayed = [];

        // only display the required rows of data
        const startRowIndex = ( this.props.currentPage - 1 ) * this.props.rowsPerPage;

        for ( let rowCount = 0; rowCount < this.props.rowsPerPage; rowCount++ ) {
            if ( startRowIndex + rowCount < sortedData.length ) {
                dataDisplayed[ rowCount ] = sortedData[ startRowIndex + rowCount ];
            } else {
                break;
            }
        }

        return dataDisplayed;
    }

    render() {
        return (
            <table className={ this.props.darkMode ? "table table-dark table-striped " : "table table-striped"  }>

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

