import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  isAuth: isAuth,
  component: Component,
  id: id,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth === true) {
          return <Component id={id} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
