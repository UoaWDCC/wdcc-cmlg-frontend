import React from 'react';
import SelectCol from "./SelectCol";
import SearchBar from './SearchBar'
import Table from "./Table";

class SearchPage extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            //@todo place to store value such as search term and select column
            selectedColumns: [],
            word: ''
        };
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
                <SelectCol getsSelectedLanguage = { this.handleSelectCol } />
                <Table />
            </div>
        );
    }
}

export default SearchPage;
