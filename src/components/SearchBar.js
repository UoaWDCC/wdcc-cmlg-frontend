import React from 'react';
import './css/SearchBar.css';
import { ReactComponent as SearchIcon } from './search-solid.svg';

class SearchBar extends React.Component{
    constructor( props ) {
        super( props )
        this.state = {
            placeholderText : ''
        }
    }

    updateDimensions() {
        if ( window.innerWidth < 900 ) {
          this.setState( { placeholderText : "Search a word" } );
        } else {
          this.setState( { placeholderText : "Enter the word you want to search" } );
        }
    }

    // Add event listener
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener( "resize", this.updateDimensions.bind( this ) );
    }

    //Remove event listener
    componentWillUnmount() {
        window.removeEventListener( "resize", this.updateDimensions.bind( this ) );
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = ( state, callback ) => { };
    }

    // call the changeWord function in the SearchPage class to change its state
    render() {
        return(

            <div className='search' > 
                <input autoFocus className= { this.props.darkMode ? 'bar dark-mode-bar' : 'bar' } 
                       type="text" placeholder={ this.state.placeholderText }
                       onChange = { ( e ) => this.props.data.changeWord( e.target.value ) }/>
                <SearchIcon className={ this.props.darkMode ? 'search-icon dark-mode' : 'search-icon' }/>
            </div>
        )
    }

}

export default SearchBar 