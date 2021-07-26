import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "Routes/Home/HomePresenter";
import Search from "Routes/Search";
import TV from "Routes/TV";
import Detail from "Routes/Detail";
import Header from "Components/Header";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/tv" component={TV} />
        <Route path="/detail" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
