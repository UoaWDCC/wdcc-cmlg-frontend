import React from "react";
import "../css/AboutUsPage.css";

class AboutUsPage extends React.Component {
    render() {
        return (

            <div className= { this.props.darkMode ? "aboutUsPage dark-mode" : "aboutUsPage" }>
                <p id="mainTitle">
                    ABOUT US<br/>
                </p>
                <p>
                    We are a group of six students studying at The University of Auckland. As part of
                    UoA's Web Development Consulting Club (WDCC), we have came together to development
                    this Multilingual Glossary. We hope you enjoy using our software!<br/><br/><br/>
                </p>
                <p id="smallTitle">
                    CONTRIBUTORS:<br/>
                </p>
                <p>
                    Emily Yang<br/>
                    Annie Chau<br/>
                    Dave Shin<br/>
                    Eileen Liang<br/>
                    Kevin Ge<br/>
                    Yujia Wu<br/>
                    Janus Li<br/>
                    Davis Dimalen<br/><br/><br/>
                </p>
                <p id="smallTitle">
                    RELEASE HISTORY:<br/>
                </p>
                <p id="version">
                    - v1.0<br/>
                </p>
                <p>
                    1. First release.<br/><br/>
                </p>
                <p id="version">
                    - v2.0<br/>
                </p>
                <p>
                    1. Updated UI for the website,<br/>
                    2. Implemented instant searching,<br/>
                    3. Updated alphabetically sorting words,<br/>
                    4. Display optional languages,<br/>
                    5. Fix the first column and the header,<br/>
                    6. Implement the WelcomePage,<br/>
                    7. Fixed minor bugs.<br/><br/>
                </p>
                <p id="version">
                    - v3.0<br/>
                </p>
                <p>
                    1. Renewed the welcome page,<br/>
                    2. Changed the font of the whole page to be Helvetica,<br/>
                    3. Implemented dark mode,<br/>
                    4. Page pagination added, <br/>
                    5. Fixed minor bugs.<br/><br/><br/>
                </p>
            </div>

        );
    }

}

export default AboutUsPage;