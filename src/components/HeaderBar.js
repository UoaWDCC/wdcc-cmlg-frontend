import React from "react";
import "../css/HeaderBar.css";

import { NavLink } from "react-router-dom";

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BarOpen : window.innerWidth > 600,
        }
        this.handleBarToggleClick = this.handleBarToggleClick.bind( this )
        this.updateBarOpen = this.updateBarOpen.bind( this )
        this.handleDarkMode = this.handleDarkModeChanged.bind( this )
        this.handleClickOutside = this.handleClickOutside.bind( this )
    }

    handleBarToggleClick() {
        if (!this.state.BarOpen) {
            document.addEventListener("click", this.handleClickOutside);
        } else {
            document.removeEventListener("click", this.handleClickOutside);
        }

        this.setState( ( prevState ) => {
            return { BarOpen: !prevState.BarOpen }
        } )
    }

    updateBarOpen() {
        if ( window.innerWidth > 600 ) {
            this.setState( { BarOpen: true } );
        } else {
            this.setState( { BarOpen: false } );
        }
    }

    handleClickOutside( event ) {
        if ( this.node && !this.node.contains( event.target ) ) {
            this.setState( {
                BarOpen: window.innerWidth > 600
            } );
        }
    }

    // Add event listener
    componentDidMount() {
        window.addEventListener( "resize", this.updateBarOpen );
    }

    //Remove event listener
    componentWillUnmount() {
        window.removeEventListener( "resize", this.updateBarOpen );
    }
    

    handleDarkModeChanged(){
        this.props.callbackParent(this.state.darkMode);
    }


    render() {

        const items = (
            <div>
                <NavLink activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} exact to="/">
                    <li>
                        <i className={ ` fas fa-home ${ this.props.darkMode ? "dark-mode-icon" : "" } ` }><span className="headerBarText">&nbsp;Home</span></i>
                    </li>
                </NavLink>
                <NavLink activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} to="/translations">
                    <li>
                        <i className={ ` fas fa-search ${ this.props.darkMode ? "dark-mode-icon" : "" } ` }><span className="headerBarText">&nbsp;Search</span></i>
                    </li>
                </NavLink>
                <NavLink activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} to="/about">
                    <li>
                        <i className={ ` fas fa-info-circle ${ this.props.darkMode ? "dark-mode-icon" : "" } ` }><span className="headerBarText">&nbsp;About</span></i>
                    </li>
                </NavLink>
            </div>
        );

        return (
            <nav className={ this.props.darkMode ? "dark-mode-Headerbar" : "" }>
                <ul>
                    <li id="bar" ref={ node => this.node = node } onClick={ this.handleBarToggleClick }>
                        <i className= { ` fas fa-bars ${ this.props.darkMode ? "dark-mode-icon" : "" } ` } />
                    </li>
                    
                    <li id="darkMode" onClick={ this.handleDarkMode } >
                        <i className={ ` fas ${ this.props.darkMode ? "dark-mode-icon fa-moon" : "fa-sun" } ` }/>
                    </li>
                    { this.state.BarOpen && items }
                </ul>
            </nav>
            
        );
    }
}

export default HeaderBar;