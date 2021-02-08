import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Celebs from "../../containers/Celebs";
import Crafts from "../../containers/Crafts";
import Home from "../../containers/Home";
import Login from "../../containers/Login";
import { useUser } from "../../hooks/useUser";

const Routes: React.FC = ({
  children
}) => {
  const user = useUser()
  const PrivateRoute:React.FC | null = ({
    children
  }) => {
    if (!!user.uid) return <>
      {children}
    </>
    return null
  }
  return (
    <Router>
      {children}
      <Switch>
        <Route path="/login" component={Login}/>
        <PrivateRoute>
          <Route exact path="/" component={Home}/>
          <Route exact path="/dash" component={Home}/>
          <Route path="/celebs" component={Celebs}/>
          <Route path="/crafts" component={Crafts}/>
        </PrivateRoute>
        <Redirect to='/login' />
      </Switch>
    </Router>
  );
}

export default Routes