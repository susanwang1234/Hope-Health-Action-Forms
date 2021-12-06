import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';

const UnPrivateRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userContext.isAuthenticated) {
          console.log("[UnprivateRoute]: Not authenticated, returning to login!");
          return <Component {...props}></Component>;
        }
        console.log("[UnprivateRoute]: Authenticated, redirecting to:" + `${userContext.user?.roleName !== 'user' ? '/departments' : '/dashboard/' + userContext.user?.departmentId}`)
        return <Redirect to={{ pathname: `${userContext.user?.roleName !== 'user' ? '/departments' : '/dashboard/' + userContext.user?.departmentId}`, state: { from: props.location } }} />;
      }}
    />
  );
};

export default UnPrivateRoute;
