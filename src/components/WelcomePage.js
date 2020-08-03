import React from "react";
import "./css/WelcomePage.css";
import { Link } from "react-router-dom";

class WelcomePage extends React.Component {
    render() {
        return (
          <div class="startButton">
            <Link to="/translations">
            <button type="button" class="btn btn-outline-dark">Start searching</button>
            </Link>
          </div>
        );
    }

}

export default WelcomePage;