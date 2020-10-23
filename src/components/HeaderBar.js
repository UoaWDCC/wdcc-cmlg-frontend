import React from "react";
import "./css/HeaderBar.css";
import { Link } from "react-router-dom";

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BarOpen : window.innerWidth > 600
        }
        this.handleBarToggleClick = this.handleBarToggleClick.bind( this )
        this.updateBarOpen = this.updateBarOpen.bind( this )
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    handleBarToggleClick() {
        this.setState( ( prevState ) => {
            return { BarOpen: !prevState.BarOpen }
        } )
    }

    updateBarOpen() {
        if ( window.innerWidth > 600 ) {
            this.setState( { BarOpen: true } );
        } else {
            this.setState( { BarOpen: false } );
        }
    }

    handleClickOutside(event) {
        if (!this.node || !this.node.contains(event.target)) {
            this.setState({
                BarOpen: window.innerWidth > 600
            });
        }
    }

    // Add event listener
    componentDidMount() {
        window.addEventListener( "resize", this.updateBarOpen);
        document.addEventListener('click', this.handleClickOutside);
    }

    //Remove event listener
    componentWillUnmount() {
        window.removeEventListener( "resize", this.updateBarOpen );
        document.removeEventListener('click', this.handleClickOutside);
    }

    render() {
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
        return (
            <nav>
                <ul>
                    <li id="bar" ref={ node => this.node = node } onClick={ this.handleBarToggleClick }>
                        <i className="fas fa-bars"/>
                    </li>
                    <li id="darkMode">
                        <i className="fas fa-moon"/>
                    </li>
                    {this.state.BarOpen ? items : null}
                </ul>
            </nav>
        );
    }

}

export default HeaderBar;