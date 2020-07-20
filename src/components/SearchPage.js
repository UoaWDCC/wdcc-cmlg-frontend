import React from 'react';
import SearchBar from './SearchBar'
import Table from "./Table";


class SearchPage extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            word: ''
        };
    }

    // change the searching word which is provided by the SearchBar class
    handleChangeWord( searchWord ) {
        this.setState( {
            word: searchWord
        } );
    }

    render() {
       return (
            <div className="SearchPage">
                <SearchBar data = {
                    {
                        changeWord: this.handleChangeWord.bind(this)
                    }
                }> 
                </SearchBar>   
                <Table />
            </div>
        );
    }

}

export default SearchPage;
