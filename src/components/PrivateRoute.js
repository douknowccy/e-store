import React from "react";
import { Route, Redirect } from "react-router-dom";
import useGlobalUserContext from "../context/user";
export default function PrivateRoute({ children, ...rest }) {
  const { user } = useGlobalUserContext();
  return (
    <Route
      {...rest}
      render={() => {
        return user.token ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
}
