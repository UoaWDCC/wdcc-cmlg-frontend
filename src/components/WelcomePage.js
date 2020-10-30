import React from "react";
import "./css/WelcomePage.css";
import { Link } from "react-router-dom";
import flagsImageNight from "./flagsImageNight.png";
import flagsImageDay from "./flagsImageDay.png";

class WelcomePage extends React.Component {
    render() {
        return (
            <div className= { ` welcomePage ${ this.props.darkMode ? "dark-mode" : "" } ` }>
                <img id="background-img" src={ this.props.darkMode ? flagsImageNight : flagsImageDay } alt="Flags background" />
                <Link to="/translations">
                    <button type="button" className={ ` btn btn-outline-dark ${ this.props.darkMode? "btn-dark-mode" : "" } ` }>Start searching</button>
                </Link>
            </div>

        );
    }

}

export default WelcomePage;