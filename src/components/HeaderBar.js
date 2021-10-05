import React from "react";
import "../css/HeaderBar.css";

import { NavLink } from "react-router-dom";
import UploadPopUp from "./UploadPopUp";

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BarOpen: window.innerWidth > 600,
            SettingOpen: false,
            popUpOpen: false
        }
        this.handleBarToggleClick = this.handleBarToggleClick.bind(this)
        this.handleSettingToggleClick = this.handleSettingToggleClick.bind(this)
        this.updateBarOpen = this.updateBarOpen.bind(this)
        this.handleDarkMode = this.handleDarkModeChanged.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.handleClickOutsideForSetting = this.handleClickOutsideForSetting.bind(this)
        this.updatePopUpOpen = this.updatePopUpOpen.bind(this)
    }

    handleBarToggleClick() {
        if (!this.state.BarOpen) {
            document.addEventListener("click", this.handleClickOutside);
        } else {
            document.removeEventListener("click", this.handleClickOutside);
        }

        this.setState((prevState) => {
            return { BarOpen: !prevState.BarOpen }
        })
    }

    handleSettingToggleClick() {
        if (!this.state.SettingOpen) {
            document.addEventListener("click", this.handleClickOutsideForSetting);
        } else {
            document.removeEventListener("click", this.handleClickOutsideForSetting);
        }
        this.setState((prevState) => {
            return { SettingOpen: !prevState.SettingOpen }
        })
    }

    updateBarOpen() {
        if (window.innerWidth > 600) {
            this.setState({ BarOpen: true });
        } else {
            this.setState({ BarOpen: false });
        }
    }

    updatePopUpOpen() {
        this.setState({ popUpOpen: !this.state.popUpOpen });
    }

    handleClickOutside(event) {
        if (this.node && !this.node.contains(event.target)) {
            this.setState({
                BarOpen: window.innerWidth > 600,
            });
        }
    }

    handleClickOutsideForSetting(event) {

        if (this.nodeSetting && event.target.className !== "dark-mode-span " && event.target.className !== "light-mode-span " && !this.nodeSetting.contains(event.target)) {

            this.setState({
                SettingOpen: false
            });
        }
    }


    // Add event listener
    componentDidMount() {
        window.addEventListener("resize", this.updateBarOpen);
    }

    //Remove event listener
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateBarOpen);
    }

    handleDarkModeChanged() {
        this.props.callbackParent(this.state.darkMode);
    }

    handleSetting() {
        this.setState({
            SettingOpen: !this.state.SettingOpen
        });
    }

    render() {

        const items = (
            <div className="items">
                <NavLink activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} exact to="/">
                    <li>
                        <i className={` fas fa-home ${this.props.darkMode ? "dark-mode-icon" : ""} `}><span className="headerBarText">&nbsp;Home</span></i>
                    </li>
                </NavLink>
                <NavLink activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} to="/translations">
                    <li>
                        <i className={` fas fa-search ${this.props.darkMode ? "dark-mode-icon" : ""} `}><span className="headerBarText">&nbsp;Search</span></i>
                    </li>
                </NavLink>
                <NavLink activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} to="/about">
                    <li>
                        <i className={` fas fa-info-circle ${this.props.darkMode ? "dark-mode-icon" : ""} `}><span className="headerBarText">&nbsp;About</span></i>
                    </li>
                </NavLink>
            </div>
        );

        const settingOptions = (
            <div className={` settingCard ${this.props.darkMode ? "dark-mode-settingCard" : ""}  `}>
                <li id="darkModeIcon" className="setting-item" onClick={this.handleDarkMode} >
                    <i className={ ` fas ${ this.props.darkMode ? "dark-mode-icon fa-sun" : "fa-moon" } ` } > </i>
                    <i > <span className={ `${ this.props.darkMode ? "dark-mode-span" : "light-mode-span" } ` }> {this.props.darkMode ? "Light Mode" : "Dark Mode" }  </span>  </i>
                </li>
                <li id="uploadIcon" className="setting-item" onClick={this.updatePopUpOpen} >
                    <i className={` fa fa-upload ${this.props.darkMode ? "dark-mode-icon" : ""} `} />
                    <span> Upload Translation </span>
                </li>
                <li id="login">
                    <NavLink className="setting-item setting-nav-item" activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} to="/login">
                        <i className={` fas fa-sign-in-alt ${this.props.darkMode ? "dark-mode-icon" : ""} `}></i>
                        <span className={`${this.props.darkMode ? "dark-mode-span-login" : ""} `}> Login </span>
                    </NavLink>
                </li>
            </div>
        )

        return (
            <nav className={this.props.darkMode ? "dark-mode-Headerbar" : ""}>
                <ul>
                    <li id="bar" ref={node => this.node = node} onClick={this.handleBarToggleClick}>
                        <i className={` fas fa-bars ${this.props.darkMode ? "dark-mode-icon" : ""} `} />
                    </li>
                    <li id="setting" ref={nodeSetting => this.nodeSetting = nodeSetting} onClick={this.handleSettingToggleClick} >
                        <i className={` fas fa-cog ${this.props.darkMode ? "dark-mode-icon" : ""} `} />
                    </li>
                    {this.state.BarOpen && items}
                    {this.state.SettingOpen && settingOptions}
                </ul>
                <UploadPopUp isOpen={this.state.popUpOpen} handleClosePopUp={this.updatePopUpOpen} darkMode={this.props.darkMode}/>
            </nav>
        );
    }
}

export default HeaderBar;