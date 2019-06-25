import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/Pages/Search";
import Saved from "./components/Pages/Saved";
import Inputdata from "./components/Pages/Inputdata";
import Nav from "./components/Nav";
function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route exact path="/inputdata" component={Inputdata} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
