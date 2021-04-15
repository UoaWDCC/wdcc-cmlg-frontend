import React from "react";
import "../css/HeaderBar.css";

import { NavLink } from "react-router-dom";

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BarOpen : window.innerWidth > 600,
            SettingOpen : false
        }
        this.handleBarToggleClick = this.handleBarToggleClick.bind( this )
        this.handleSettingToggleClick = this.handleSettingToggleClick.bind( this )
        this.updateBarOpen = this.updateBarOpen.bind( this )
        this.handleDarkMode = this.handleDarkModeChanged.bind( this )
        this.handleClickOutside = this.handleClickOutside.bind( this )
        this.handleClickOutsideForSetting = this.handleClickOutsideForSetting.bind( this )
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

    handleSettingToggleClick() {
        if (!this.state.SettingOpen) {
            document.addEventListener("click", this.handleClickOutsideForSetting);
        } else {
            document.removeEventListener("click", this.handleClickOutsideForSetting);
        }
        this.setState( ( prevState ) => {
            return { SettingOpen: !prevState.SettingOpen }
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
                BarOpen: window.innerWidth > 600,
            } );
        }
    }

    handleClickOutsideForSetting( event ) {
        if ( this.nodeSetting && !this.nodeSetting.contains( event.target ) ) {
            this.setState( {
                SettingOpen : false
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

    handleDarkModeChanged() {
        this.props.callbackParent(this.state.darkMode);
    }

    handleSetting() {
        this.setState( {
            SettingOpen : !this.state.SettingOpen
        } );
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

        const settingOptions = (
            <div className="settingCard">
                <li id="darkMode" onClick={ this.handleDarkMode } >
                    <i className={ ` fas ${ this.props.darkMode ? "dark-mode-icon fa-moon" : "fa-sun" } ` } />
                </li>
                <NavLink activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} to="/login">
                    <li id="login">
                        <i className={ ` fas fa-sign-in-alt ${ this.props.darkMode ? "dark-mode-icon" : ""} `}></i>
                    </li>
                </NavLink>
            </div>
        )

        return (
            <nav className={ this.props.darkMode ? "dark-mode-Headerbar" : "" }>
                <ul>
                    <li id="bar" ref={ node => this.node = node } onClick={ this.handleBarToggleClick }>
                        <i className= { ` fas fa-bars ${ this.props.darkMode ? "dark-mode-icon" : "" } ` } />
                    </li>
                    <li id="setting" ref={ nodeSetting => this.nodeSetting = nodeSetting } onClick={ this.handleSettingToggleClick } >
                        <i className={ ` fas fa-cog ${ this.props.darkMode ? "dark-mode-icon" : "" } ` } />
                    </li>
                    { this.state.BarOpen && items }
                    { this.state.SettingOpen && settingOptions}
                </ul>
            </nav>
        );
    }
}

export default HeaderBar;