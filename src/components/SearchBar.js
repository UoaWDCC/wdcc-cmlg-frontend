import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{

    // call the changeWord function in the SearchPage class to change its state
    render(){
        return(
            <div>
                <input className='search' type="text" placeholder="Search your word" onChange={(e)=>this.props.data.changeWord(e.target.value)}/>
            </div>
        )
    }
    
}

export default SearchBar 