import React from "react";

import SearchPage from "./components/SearchPage";
import WelcomePage from "./components/WelcomePage";

export default function App() {
  return (
      <div className="App">
          <WelcomePage />
          <SearchPage />
      </div>
  );
}
