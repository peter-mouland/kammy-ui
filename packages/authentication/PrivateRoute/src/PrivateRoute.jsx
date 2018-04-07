import React from 'react';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';
import Route from 'react-router-dom/Route';

const PrivateRoute = ({ component: Component, ...props }, { auth }) => {
  const redirect = !auth.validateToken();
  const pathname = auth.user().mustChangePassword
    ? '/change-password/'
    : '/login';
  return (
    <Route
      {...props} render={(matchProps) => (
        redirect
          ? <Redirect to={{ pathname, state: { from: matchProps.location } }}/>
          : <Component {...matchProps}/>
      )}/>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

PrivateRoute.contextTypes = {
  auth: PropTypes.object.isRequired,
};

export default PrivateRoute;
