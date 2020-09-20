import React from "react";
import { Link } from "react-router-dom";

class HeaderBar extends React.Component {
    render() {
        return (
             <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <Link to="/">
                        <li className="nav-item">
                            <i className="fas fa-home">Home</i>
                        </li>
                    </Link>


                    <Link to="/translations">
                        <li className="nav-item">
                            <i className="fas fa-search">Search</i>
                        </li>
                    </Link>

                    <Link to="/about">
                        <li className="nav-item">
                            <i className="fas fa-info-circle">About</i>
                        </li>
                    </Link>
                    <li className="nav-item">
                        <i className="fas fa-moon"/>
                    </li>
                </ul>
            </nav>
        );
    }

}

export default HeaderBar;