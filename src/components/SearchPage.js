import React from 'react';
import SelectCol from "./SelectCol";
import SearchBar from './SearchBar'
import Table from "./Table";
import Pagination from './Pagination';
import debounce from 'lodash.debounce';

import "./css/SearchPage.css"
import { RowsPerPageToggleButton } from "./RowsPerPageToggleButton";

class SearchPage extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            selectedColumns: this.initLanguages(),
            word: '',
            tableData: [],
            isTableLoading: true,
            sequenceNumber: "",
            totalPages: 1,
            currentPage: 1,
            rowsPerPage: 10,
        };

        // only emit changes if this function has not been called in the past 180 ms
        this.emitChangeDebounced = debounce(this.emitChange, 180);

        this.handleRowsPerPageChanges = this.handleRowsPerPageChanges.bind(this);
    }

    componentDidMount() {
        this.retrieveTableData();
    }

    initLanguages() {
        const languages = [ "Chinese", "English", "Italian", "Arabic", "Serbian", "Croatian", "Russian", "German",
                            "Hebrew", "French", "Hungarian", "Slovak", "Spanish", "Português", "Türkçe", "Greek",
                            "Romanian" ]
        let allLanguages = []
        languages.forEach( ( language, index ) => {
            if ( index < 5 ) {
                allLanguages.push( {
                    id: language,
                    select: true
                } )
            }
            else {
                allLanguages.push( {
                    id: language,
                    select: false
                } )
            }
        } )

        return allLanguages;
    }

    handleChangeWord( searchWord ) {
        this.emitChangeDebounced( searchWord );
    }

    // change the searching word which is provided by the SearchBar class
    emitChange( searchWord ) {
        this.setState( {
            word: searchWord
        } );
    }

    // received all languages with their state from select Columns
    handleSelectCol = ( allLanguages ) => {
        this.setState( {
            selectedColumns: allLanguages
        } );
    }

    handleRowsPerPageChanges( numberOfPagesPerRow ) {
    	this.setState( {
			rowsPerPage: numberOfPagesPerRow
		} )
	}

    componentDidUpdate( prevProps, prevState, snapshot ) {
        if ( this.state.word !== prevState.word ) {
            this.retrieveTableData();
        }
    }

    // update table on page change
    onPageChanged = data => {
        this.setState( { currentPage: data } );
    }

    // retrieve data for table
    retrieveTableData() {

        let sequenceTime = new Date();

        // for testing, change cmlgbackend.wdcc to cmlgdevbackend.wdcc
        let url = 'https://cmlgdevbackend.wdcc.co.nz/api/translations?sequence=' + sequenceTime.getTime() +
                  '&pageRows=' + this.state.rowsPerPage;


        if ( this.state.word !== '' ) {
            // add search words
            url += '&word=' + this.state.word;
        }

        fetch( url )
            .then( results => {
                return results.json();
            } )
            .then( responseData => {
                const data = responseData.data;
                const sequence = responseData.sequence;

                if ( sequence <= this.state.sequenceNumber ) {
                    return;
                }

                let sortedListOfWords = [];
                let translationsForOneWord = [];
                let dataIndex;
                let currentData;

                for ( dataIndex = 0; dataIndex < data.length; dataIndex++ ) {
                    currentData = data[ dataIndex ];

                    // Check if the translated word is in the correct column (under the correct language). So if the
                    // English translation for the word is not under English, throw an exception.
                    // + 1 in front of translationsForOneWord.length because the index starts from 0, whereas language_id
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

                // calculate how many pages are needed if user doesn't want to see all pages
                let totalPages = responseData.totalPageNum;
                if ( this.state.rowsPerPage !== "all" ) {
                    totalPages = Math.ceil( sortedListOfWords.length / this.state.rowsPerPage );
                }

                this.setState( {
                    tableData: sortedListOfWords,
                    isTableLoading: false,
                    sequenceNumber: sequence,
                    totalPages: totalPages,
                    currentPage: 1
                } );
            } )

    }

    render() {
        return (
            <div className = { this.props.darkMode ? "search-page dark-mode" : "search-page"   }>
                <div>
                    <SearchBar data = { { changeWord: this.handleChangeWord.bind( this ) } } darkMode = { this.props.darkMode }> </SearchBar>
                    <SelectCol darkMode= {this.props.darkMode}
                               getsSelectedLanguage = { this.handleSelectCol }
                               allLanguages = { this.state.selectedColumns }/>

                    <RowsPerPageToggleButton darkMode= {this.props.darkMode} onButtonClicked = { this.handleRowsPerPageChanges }/>
                    {console.log(this.props.darkMode)}
                </div>


                <div className = "table-div">
                    <Table columns = { this.state.selectedColumns }
                           data = { this.state.tableData }
                           isLoading = { this.state.isTableLoading }
                           currentPage = { this.state.currentPage }
                           rowsPerPage = { this.state.rowsPerPage }
                           darkMode = { this.props.darkMode }
                    />
                </div>
                <div>
                    { this.state.totalPages > 1 &&
                      <Pagination totalPages = { this.state.totalPages }
                                  pageNeighbours={ 2 }
                                  onPageChanged={ this.onPageChanged }
                                  currentPage = { this.state.currentPage }
                      /> }
                </div>
            </div>
        );
    }
}

export default SearchPage;
