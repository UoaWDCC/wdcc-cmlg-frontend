import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SearchPage from "./components/SearchPage";
import WelcomePage from "./components/WelcomePage";

export default function App() {
  return (
    <Router className="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/translations">
            <SearchPage />
          </Route>
          <Route path="/">
            <WelcomePage />
          </Route>
        </Switch>
    </Router>
  );
}
