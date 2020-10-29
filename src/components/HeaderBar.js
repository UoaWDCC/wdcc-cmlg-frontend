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
        this.handleClickOutside = this.handleClickOutside.bind( this )
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

    handleClickOutside( event ) {
        if ( !this.node || !this.node.contains( event.target ) ) {
            this.setState( {
                BarOpen: window.innerWidth > 600
            } );
        }
    }

    // Add event listener
    componentDidMount() {
        window.addEventListener( "resize", this.updateBarOpen );
        document.addEventListener( 'click', this.handleClickOutside );
    }

    //Remove event listener
    componentWillUnmount() {
        window.removeEventListener( "resize", this.updateBarOpen );
        document.removeEventListener( 'click', this.handleClickOutside );
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
        return (


            <nav className={this.state.darkMode ? "" : "dark-mode-Headerbar"}> 
                <ul>
                    <li id="bar" ref={ node => this.node = node } onClick={ this.handleBarToggleClick }>
                        <i className="fas fa-bars"/>
                    </li>
                    
                    <li id="darkMode" onClick={this.handleDarkMode } >
                        <i className={ this.state.darkMode ? "fas fa-sun" : "fas fa-moon dark-mode-icon" }/>
                    </li>
                    { this.state.BarOpen ? items : null }
                </ul>
            </nav>
            
        );
    }

}

export default HeaderBar;