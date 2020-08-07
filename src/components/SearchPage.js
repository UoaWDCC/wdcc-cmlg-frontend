import React from 'react';
import SelectCol from "./SelectCol";
import SearchBar from './SearchBar'
import Table from "./Table";

class SearchPage extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            //@todo place to store value such as search term and select column
            selectedColumns : this.initLanguages(),
            word: ''
        };
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

    // change the searching word which is provided by the SearchBar class
    handleChangeWord( searchWord ) {
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

    render() {
        return (
            <div className = "SearchPage">
                <SearchBar data = { { changeWord: this.handleChangeWord.bind( this ) } }> </SearchBar>
                <SelectCol getsSelectedLanguage = { this.handleSelectCol } allLanguages = { this.state.selectedColumns }/>
                <Table columns = { this.state.selectedColumns }
                       words = { this.state.word }
                />
            </div>
        );
    }
}

export default SearchPage;
