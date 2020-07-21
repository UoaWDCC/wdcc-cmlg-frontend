import React from 'react';
import SelectCol from "./SelectCol";


class SearchPage extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            //@todo place to store value such as search term and select column
            selectedColumns: [],
            defaultLans: [{ name:'Chinese', value: true }, { name:'English',value: true },
                { name:'Italian',value: true }],
        }
    }

    callbackFunction = (childData) => {
        console.log("The parent Call back function is called.")
        //store the selectedValues from selectCol and print to check
        this.setState({ selectedColumns: childData },
            () => { console.log("checkedValues:", this.state.selectedColumns)});
    }

    render() {
       return (
            <div className="SearchPage">
                place to render other components
                <SelectCol parentCallback={ this.callbackFunction } default={ this.state.defaultLans }/>
            </div>
        );
    }
}

export default SearchPage;