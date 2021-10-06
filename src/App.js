import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SearchPage from "./components/SearchPage";
import WelcomePage from "./components/WelcomePage";
import HeaderBar from "./components/HeaderBar";
import AboutUsPage from "./components/AboutUsPage";
import "./App.css";
import LoginPage from "./components/LoginPage";
import UploadPopUp from "./components/UploadPopUp";

import AuthContextProvider from "./context/AuthContextProvider";

class App extends React.Component{
    constructor(props){
        super(props);
        this.darkModeChanged = this.onDarkModeChanged.bind(this);
        this.state = {
            darkMode : false
        }
    }

    onDarkModeChanged(){
        this.setState( {
            darkMode : !this.state.darkMode
        } );
    }

    handleUploadButtonPressed() {
        this.setState( {
            darkMode : !this.state.darkMode,
            isOpen : true
        } );
    }

    render(){
        return (
            <div className={ ` App ${this.state.darkMode ? "dark-mode" : ""} `} >
                <AuthContextProvider>
                    <Router>
                        <HeaderBar callbackParent = { this.darkModeChanged } darkMode = {this.state.darkMode} />
                        {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                            <Switch>
                                <Route path="/translations">
                                    <SearchPage darkMode= {this.state.darkMode} />
                                </Route>
                                <Route exact path="/">
                                    <WelcomePage darkMode= {this.state.darkMode}/>
                                </Route>
                                <Route path="/about">
                                    <AboutUsPage darkMode= {this.state.darkMode}/>
                                </Route>
                                <Route path="/login">
                                    <LoginPage darkMode= {this.state.darkMode}/>
                                </Route>
                            </Switch>
                    </Router>
                </AuthContextProvider>
            </div>
        );
    }
}

export default App;


