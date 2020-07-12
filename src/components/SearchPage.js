import React from 'react';
import Table from "./Table";


class SearchPage extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            //@todo place to store value such as search term and select column
        }
    }

    render() {
       return (
            <div className="SearchPage">
                <Table />
            </div>
        );
    }


}

export default SearchPage;
