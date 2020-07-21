import React from 'react';
import './SearchBar.css';
import { ReactComponent as SearchIcon } from './search-solid.svg';

class SearchBar extends React.Component{

    // call the changeWord function in the SearchPage class to change its state
    render() {
        return(
            <div className='search'> 
                <SearchIcon className='search-icon'/>
                <input className='bar' type="text" placeholder="Please enter the word you want to search" 
                       onChange = { ( e ) => this.props.data.changeWord( e.target.value ) }/>
            </div>
        )
    }

}

export default SearchBar 