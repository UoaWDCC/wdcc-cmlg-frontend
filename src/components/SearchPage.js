import React from 'react';
import SelectCol from "./SelectCol";


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
                place to render other components
                <SelectCol/>
            </div>
        );
    }


}

export default SearchPage;
