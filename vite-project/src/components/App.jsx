import React from "react";
//import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import Layout from "./Layout/Layout";

// pages
import Error from "../pages/error/Error";
import Login from "../pages/login/Login";

// context
import { useUserState } from "../context/UserContext";

//import AuthVerify from "../auth-verify";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  // function {AuthVerify()}
  // AuthVerify
  //console.log(teste)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" render={() => <Navigate to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Navigate to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Routes>
    </BrowserRouter>
    
    
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Navigate
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Navigate
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
