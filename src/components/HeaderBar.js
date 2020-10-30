import React from "react";
import "./css/HeaderBar.css";
<<<<<<< HEAD
import { Link } from "react-router-dom";
//import "./css/DarkMode.css"
=======
import { NavLink } from "react-router-dom";
>>>>>>> 9195442719fa71194eeecc72f261bb8c7c44f7e3

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
            // <div className={this.state.darkMode ? "dark-mode-Headerbar" : ""} >
            // <div className={this.state.darkMode ? "" : "dark-mode-Headerbar"} >
            //     <Link to="/">
            <div >
                <NavLink activeStyle={{textShadow: "2px 2px 5px #5DADE2"}} exact to="/">
                    <li>
                        <i className={this.state.darkMode ? "fas fa-home " : "fas fa-home dark-mode-icon" }>&nbsp;Home</i>
                        {/* <i className="fas fa-home">&nbsp;Home</i> */}
                    </li>
                </NavLink>
                <NavLink activeStyle={{textShadow: "2px 2px 5px #5DADE2"}} to="/translations">
                    <li>
                        <i className={this.state.darkMode ? "fas fa-search " : "fas fa-search dark-mode-icon"}>&nbsp;Search</i>
                        {/* <i className="fas fa-search">&nbsp;Search</i> */}
                    </li>
                </NavLink>
                <NavLink activeStyle={{textShadow: "2px 2px 5px #5DADE2"}} to="/about">
                    <li>
                        <i className={this.state.darkMode ? "fas fa-info-circle " : "fas fa-info-circle dark-mode-icon"}>&nbsp;About</i>
                        {/* <i className="fas fa-info-circle">&nbsp;About</i> */}
                    </li>
                </NavLink>
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