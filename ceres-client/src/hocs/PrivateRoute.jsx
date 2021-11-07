import React, { Component, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userCtx = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userCtx.isAuthenticated) {
          return <Component {...props}></Component>;
        }
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  );
};

export default PrivateRoute;
