import React from "react";
import "./css/HeaderBar.css";
import { Link } from "react-router-dom";

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BarOpen : true
        }
        this.HandleBarToggleClick = this.HandleBarToggleClick.bind(this)
    }
    HandleBarToggleClick(){
        this.setState( (prevState) => {
            return {BarOpen: !prevState.BarOpen}
        } )
    }

    render() {
        let values;
        const items = (
            <div>
                <Link to="/">
                    <li>
                        <i className="fas fa-home">&nbsp;Home</i>
                    </li>
                </Link>
                <Link to="/translations">
                    <li>
                        <i className="fas fa-search">&nbsp;Search</i>
                    </li>
                </Link>
                <Link to="/about">
                    <li>
                        <i className="fas fa-info-circle">&nbsp;About</i>
                    </li>
                </Link>
            </div>
        );
        if(this.state.BarOpen){
            values = items;
        }
        return (
            <nav>
             {/*<nav className="navbar navbar-expand-lg navbar-light bg-light">*/}
             <ul>
                {/*<ul className="navbar-nav mr-auto mt-2 mt-lg-0">*/}
                {/* {items}*/}
                    <li id="bar" onClick={this.HandleBarToggleClick}>
                        <i className="fas fa-bars"/>
                    </li>
                    <li id="darkMode">
                        <i className="fas fa-moon"/>
                    </li>
                 {values}
                </ul>
            </nav>
        );
    }

}

export default HeaderBar;