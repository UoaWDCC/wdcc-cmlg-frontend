import React from "react";
import "./css/WelcomePage.css";
import { Link } from "react-router-dom";

class WelcomePage extends React.Component {
    render() {
        return (
            <div className="welcomePage">
                <h1>Welcome</h1>
                <p>to Crisis Translation</p>
                <Link to="/translations">
                    <button type="button" className="btn btn-outline-dark">Start searching</button>
                </Link>
            </div>

        );
    }

}

export default WelcomePage;