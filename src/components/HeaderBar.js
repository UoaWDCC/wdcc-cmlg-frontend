import React from "react";
import "./css/HeaderBar.css";
import { Link } from "react-router-dom";
//import "./css/DarkMode.css"

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BarOpen : window.innerWidth > 600,
            darkMode : true
        }
        this.handleBarToggleClick = this.handleBarToggleClick.bind( this )
        this.updateBarOpen = this.updateBarOpen.bind( this )
        this.handleDarkMode = this.handleDarkModeChanged.bind( this )
    }

    handleBarToggleClick() {
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

    // Add event listener
    componentDidMount() {
        this.updateBarOpen();
        window.addEventListener( "resize", this.updateBarOpen);
    }

    //Remove event listener
    componentWillUnmount() {
        window.removeEventListener( "resize", this.updateBarOpen );
    }
    

    handleDarkModeChanged(){
        if (this.state.darkMode === false) {
            this.setState( { darkMode : true } )
        } else {
            this.setState( { darkMode : false } )
        }
        this.props.callbackParent(this.state.darkMode);
    }


    render() {

        let values;
        const items = (
            <div className={this.state.darkMode ? "" : "dark-mode-Headerbar"} >
                <Link to="/">
                    <li>
                        <i className={this.state.darkMode ? "fas fa-home " : "fas fa-home dark-mode-icon" }>&nbsp;Home</i>
                    </li>
                </Link>
                <Link to="/translations">
                    <li>
                        <i className={this.state.darkMode ? "fas fa-search " : "fas fa-search dark-mode-icon"}>&nbsp;Search</i>
                    </li>
                </Link>
                <Link to="/about">
                    <li>
                        <i className={this.state.darkMode ? "fas fa-info-circle " : "fas fa-info-circle dark-mode-icon"}>&nbsp;About</i>
                    </li>
                </Link>
            </div>
        );
        if( this.state.BarOpen ) {
            values = items;
        }
        return (
            <nav className={this.state.darkMode ? "" : "dark-mode-Headerbar"}>
                <ul >
                    <li id="bar" onClick={ this.handleBarToggleClick }>
                        <i className="fas fa-bars"/>
                    </li>
                    
                    <li id="darkMode" onClick={this.handleDarkMode } >
                        <i className={ this.state.darkMode ? "fas fa-sun" : "fas fa-moon dark-mode-icon" }/>
                    </li>
                    {values}
                </ul>
            </nav>
        );
    }

}

export default HeaderBar;