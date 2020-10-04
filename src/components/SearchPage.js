import React from 'react';
import SelectCol from "./SelectCol";
import SearchBar from './SearchBar'
import Table from "./Table";
import debounce from 'lodash.debounce';

import "./css/SearchPage.css"
import { RowsPerPageToggleButton } from "./RowsPerPageToggleButton";

class SearchPage extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            selectedColumns : this.initLanguages(),
            word: '',
            tableData: [],
            isTableLoading: true,
            sequenceNumber: "",
			rowsPerPage: 10
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
        } ) ;
    }

    handleRowsPerPageChanges( numberOfPagesPerRow ) {
    	this.setState( {
			rowsPerPage: numberOfPagesPerRow
		} )
	}

    componentDidUpdate( prevProps, prevState, snapshot ) {
        if ( this.state.word !== prevState.word || this.state.rowsPerPage !== prevState.rowsPerPage ) {
            this.retrieveTableData();
        }
    }

    // retrieve data for table
    retrieveTableData() {

        let sequenceTime = new Date();

		let url = 'https://cmlgbackend.wdcc.co.nz/api/translations?sequence=' + sequenceTime.getTime() +
				  '&word=' + this.state.word + "&pageRow=" + this.state.rowsPerPage;

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
                this.setState( {
                    tableData: sortedListOfWords,
                    isTableLoading: false,
                    sequenceNumber: sequence
                } );
            } )

    }

    render() {
        return (
            <div className = "search-page">
                <div>
                    <SearchBar data = { { changeWord: this.handleChangeWord.bind( this ) } }> </SearchBar>
                    <SelectCol getsSelectedLanguage = { this.handleSelectCol }
                               allLanguages = { this.state.selectedColumns }/>

                    <RowsPerPageToggleButton onButtonClicked = { this.handleRowsPerPageChanges }/>
                </div>


                <div className = "table-div">
                    <Table columns = { this.state.selectedColumns }
                           data = { this.state.tableData }
                           isLoading = { this.state.isTableLoading }
                    />
                </div>
            </div>
        );
    }
}

export default SearchPage;
