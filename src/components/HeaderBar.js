import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "../css/HeaderBar.css";

import { NavLink } from "react-router-dom";
import UploadPopUp from "./UploadPopUp";
import AuthContext from "../context/AuthContext";

function HeaderBar({darkMode, callbackParent}) {
    const [barOpen, setBarOpen] = useState(window.innerWidth > 600);
    const [settingOpen, setSettingOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const {getToken} = useContext(AuthContext);

    const nodeSetting = useRef(null);
    const nodeHeaderBar = useRef(null);

    function handleBarToggleClick() {
        if (!barOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        setBarOpen(!barOpen);
    }

    function handleSettingToggleClick() {
        if (!settingOpen) {
            document.addEventListener("click", handleClickOutsideForSetting);
        } else {
            document.removeEventListener("click", handleClickOutsideForSetting);
        }

        setSettingOpen(!settingOpen);
    }

    function updateBarOpen() {
        if (window.innerWidth > 600) {
            setBarOpen(true);
        } else {
            setBarOpen(false);
        }
    }

    function updatePopUpOpen() {
        setPopupOpen(!popupOpen);
    }

    const handleClickOutside = useCallback((event) => {
        if (nodeHeaderBar.current && !nodeHeaderBar.current.contains(event.target)) {
            setBarOpen(window.innerWidth > 600);
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    // useCallback is required to pass the equality check of function for event listener 
    // ref: https://dev.to/marcostreng/how-to-really-remove-eventlisteners-in-react-3och
    const handleClickOutsideForSetting = useCallback((event) => {
        if (nodeSetting.current && !nodeSetting.current.contains(event.target)) {
            setSettingOpen(false);
            document.removeEventListener("click", handleClickOutsideForSetting);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updateBarOpen);

        return () => {
            window.removeEventListener("resize", updateBarOpen);
        }
    }, [])

    function handleDarkModeChanged() {
        callbackParent(darkMode);
    }

    const items = (
        <div ref={nodeHeaderBar} className="items">
            <NavLink activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} exact to="/">
                <li>
                    <i className={` fas fa-home ${darkMode ? "dark-mode-icon" : ""} `}><span className="headerBarText">&nbsp;Home</span></i>
                </li>
            </NavLink>
            <NavLink activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} to="/translations">
                <li>
                    <i className={` fas fa-search ${darkMode ? "dark-mode-icon" : ""} `}><span className="headerBarText">&nbsp;Search</span></i>
                </li>
            </NavLink>
            <NavLink activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} to="/about">
                <li>
                    <i className={` fas fa-info-circle ${darkMode ? "dark-mode-icon" : ""} `}><span className="headerBarText">&nbsp;About</span></i>
                </li>
            </NavLink>
        </div>
    );

    const settingOptions = (
        <div ref={nodeSetting} className={` settingCard ${darkMode ? "dark-mode-settingCard" : ""}  `}>
            <li id="darkModeIcon" className="setting-item" onClick={handleDarkModeChanged} >
                <i className={` fas ${darkMode ? "dark-mode-icon fa-sun" : "fa-moon"} `} > </i>
                <i > <span className={`${darkMode ? "dark-mode-span" : "light-mode-span"} `}> {darkMode ? "Light Mode" : "Dark Mode"}  </span>  </i>
            </li>
            {getToken() &&
            <li id="uploadIcon" className="setting-item" onClick={updatePopUpOpen} >
                <i className={` fa fa-upload ${darkMode ? "dark-mode-icon" : ""} `} />
                <span> Upload Translation </span>
            </li>}
            <li id="login">
                <NavLink className="setting-item setting-nav-item" activeStyle={{ textShadow: "2px 2px 5px #5DADE2" }} to="/login">
                    <i className={` fas fa-sign-in-alt ${darkMode ? "dark-mode-icon" : ""} `}></i>
                    <span className={`${darkMode ? "dark-mode-span-login" : ""} `}> Login </span>
                </NavLink>
            </li>
        </div>
    )

    return (
        <nav className={darkMode ? "dark-mode-Headerbar" : ""}>
            <ul>
                <li id="bar" onClick={handleBarToggleClick}>
                    <i className={` fas fa-bars ${darkMode ? "dark-mode-icon" : ""} `} />
                </li>
                <li id="setting" onClick={handleSettingToggleClick} >
                    <i className={` fas fa-cog ${darkMode ? "dark-mode-icon" : ""} `} />
                </li>
                {barOpen && items}
                {settingOpen && settingOptions}
            </ul>
            <UploadPopUp isOpen={popupOpen} handleClosePopUp={updatePopUpOpen} darkMode={darkMode} />
        </nav>
    );
}

export default HeaderBar;