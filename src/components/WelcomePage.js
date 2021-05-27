import React from "react";
import "../css/WelcomePage.css";
import { Link } from "react-router-dom";
import UploadPopUp from "./UploadPopUp";

class WelcomePage extends React.Component {
    render() {
        return (
            <div className={ ` welcomePage ${ this.props.darkMode ? "dark-mode" : "" } ` }>
                <h1 id="title-txt"> COVID-19 Multilingual Glossary </h1>
                <br />
                <Link to="/translations">
                    <button type="button" className={ ` btn welcomeBtn btn-outline-dark 
                    ${ this.props.darkMode? "btn-dark-mode" : "" } ` }>Start searching</button>
                </Link>
                <UploadPopUp></UploadPopUp>
            </div>

        );
    }

}

export default WelcomePage;
