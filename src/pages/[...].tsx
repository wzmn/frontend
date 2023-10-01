import React from "react";
import { Router, Location } from "@reach/router";
// import Layout from "../components/Layout"
// import Profile from "../components/Profile"
import Layout from "../components/layout";
import Login from "../components/pages/login";
import Default from "../components/pages/default";
import Details from "../components/pages/details";

const App = () => {
  return (
    <Location>
      {({ location }) => (
        <Router location={location}>
          {/* <Profile path="/profile" /> */}
          <Details path="/details" />
          <Login path="/login" />
          <Default path="/" />
        </Router>
      )}
    </Location>
  );
};

export default App;
