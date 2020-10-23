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


class App extends React.Component{
    constructor(props){
        super(props);
        this.darkModeChanged = this.onDarkModeChanged.bind(this);
        this.state = {
            darkMode : false
        }
    }

    onDarkModeChanged( bool ){
        this.setState( {
            darkMode : bool
        } );
        console.log("in the APP darkMode is" + this.state.darkMode);
    }


    render(){
        return (
            <Router className="App" >
                <HeaderBar callbackParent = { this.darkModeChanged } />  
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
                    </Switch>
            </Router>
        );
    }
}

export default App;

// export default function App() {
//   return (
//         <Router className="App">
//             <HeaderBar/>
//             {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//                 <Switch>
//                     <Route path="/translations">
//                         <SearchPage />
//                     </Route>
//                     <Route exact path="/">
//                         <WelcomePage />
//                     </Route>
//                     <Route path="/about">
//                         <AboutUsPage />
//                     </Route>
//                 </Switch>
//         </Router>
//   );
// }

