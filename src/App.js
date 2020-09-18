import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SearchPage from "./components/SearchPage";
import WelcomePage from "./components/WelcomePage";
import HeaderBar from "./components/HeaderBar";
import AboutUs from "./components/AboutUs";

export default function App() {
  return (
    <Router className="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/translations">
            <div>
              <HeaderBar />
              <SearchPage />
            </div>
          </Route>
          <Route exact path="/">
            <div>
              <HeaderBar />
              <WelcomePage />
            </div>
          </Route>
          <Route path="/about">
            <div>
              <HeaderBar />
              <AboutUs />
            </div>
          </Route>
        </Switch>
    </Router>
  );
}
