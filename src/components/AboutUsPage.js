import React from "react";
import "./css/AboutUsPage.css";

class AboutUsPage extends React.Component {
    render() {
        return (
            <div className= { this.props.darkMode ? "aboutUsPage dark-mode" : "aboutUsPage" }>
                <h1>
                    About us<br/>
                </h1>
                <p>
                    We are a group of six students studying at The University of Auckland. As part of
                    UoA’s Web Development Consulting Club (WDCC), we have came together to development
                    this Multilingual Glossary. We hope you enjoy using our software!<br/><br/>
                </p>
                <p id="title">
                    Contributors:<br/>
                </p>
                <p>
                    Emily Yang<br/>
                    Annie Chau<br/>
                    Dave Shin<br/>
                    Eileen Liang<br/>
                    Kevin Ge<br/>
                    Yujia Wu<br/><br/>
                </p>
                <p id="title">
                    Release history:<br/>
                </p>
                <p id="version">
                    v1.0<br/>
                </p>
                <p>
                    First release.<br/><br/>
                </p>
                <p id="version">
                    v2.0<br/>
                </p>
                <p>
                    Updated UI for the website,<br/>
                    Implemented instant searching,<br/>
                    Updated alphabetically sorting words,<br/>
                    Display optional languages,<br/>
                    Fix the first column and the header,<br/>
                    Implement the WelcomePage,<br/>
                    Fixed minor bugs.<br/><br/>
                </p>
            </div>

        );
    }

}

export default AboutUsPage;