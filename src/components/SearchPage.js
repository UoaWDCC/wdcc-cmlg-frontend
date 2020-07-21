import React from 'react';
import SelectCol from "./SelectCol";
import SearchBar from './SearchBar'
import Table from "./Table";

class SearchPage extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            //@todo place to store value such as search term and select column
            selectedColumns: [ ],
            defaultLans: [{ name:'Chinese', value: true }, { name:'English',value: true },
                { name:'Italian',value: true }],
            word: ''
        };
    }

    // change the searching word which is provided by the SearchBar class
    handleChangeWord( searchWord ) {
        this.setState( {
            word: searchWord
        } );
    }
      
   // received the selected values from select Columns
    callbackFunction = (childData) => {
        //store the selectedValues from selectCol and print to check
        this.setState({ selectedColumns: childData },
            () => { console.log("checkedValues:", this.state.selectedColumns)});
    }

    render() {
       return (
            <div className="SearchPage">
                <SearchBar data = {{ changeWord: this.handleChangeWord.bind(this) }}> </SearchBar> 
                <SelectCol parentCallback={ this.callbackFunction } default={ this.state.defaultLans }/>
                <Table />
            </div>
        );
    }
}

export default SearchPage;
