import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/Pages/Search";
import Saved from "./components/Pages/Saved";
import Inputdata from "./components/Pages/Inputdata";
// import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/SignUp";

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route exact path="/inputdata" component={Inputdata} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
       
        </Switch>
      </div>
    </Router>
  );
}

export default App;
