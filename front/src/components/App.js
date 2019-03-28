import React, { Component } from "react";
import Auth from "./auth";
import { Route, Switch, Link} from "react-router-dom";
//import { Link } from "@material-ui/core";
import Admin from './admin'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Test} />
        <Route exact path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
      </Switch>
    );
  }
}

export class Test extends Component {
  render() {
    return (
      <>
        <Link to="/auth">to Auth</Link>
      </>
    )
  }
}

export default App;
