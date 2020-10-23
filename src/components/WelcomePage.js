import React from "react";
import "./css/WelcomePage.css";
import { Link } from "react-router-dom";
import flagsImage from "./background4.png";

class WelcomePage extends React.Component {
    render() {
        return (
            <div className= { this.props.darkMode ?  "welcomePage dark-mode" : "welcomePage" }>
                <img id="background-img" src={flagsImage} alt="Flags background" />
                <Link to="/translations">
                    <button type="button" className={ this.props.darkMode? "btn btn-outline-dark btn-dark-mode " : "btn btn-outline-dark" }>Start searching</button>
                </Link>
            </div>

        );
    }

}

export default WelcomePage;