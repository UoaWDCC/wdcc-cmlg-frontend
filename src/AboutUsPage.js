import React from "react";
import { Link } from "react-router-dom";

class AboutUsPage extends React.Component {
    render() {
        return (
            <div className="aboutUsPage">
                <h1>About us</h1>
                <p>
                    <br/>
                    We are a group of six students studying at The University of Auckland. As part of
                    UoA’s Web Development Consulting Club (WDCC), we have came together to development
                    this Multilingual Glossary. We hope you enjoy using our software!
                </p>
                <p>
                    <br/>
                    Contributors:<br/>
                    Emily Yang<br/>
                    Annie Chau<br/>
                    Dave Shin<br/>
                    Eileen Liang<br/>
                    Kevin Ge<br/>
                    Yujia Wu<br/>
                </p>
                <p>
                    <br/>
                    Release history:<br/>

                    - v1.0<br/>
                    First release.<br/><br/>

                    - v2.0<br/>
                    Updated UI for the website,<br/>
                    Implemented instant searching,<br/>
                    Updated alphabetically sorting words,<br/>
                    Display optional languages,<br/>
                    Fix the first column and the header,<br/>
                    Implement the WelcomePage,<br/>
                    Fixed minor bugs.<br/>
                </p>
                <Link to="/translations">
                    <button type="button" className="btn btn-outline-dark">Return to search</button>
                </Link>
            </div>

        );
    }

}

export default AboutUsPage;