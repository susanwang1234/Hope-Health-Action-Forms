import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userContext.isAuthenticated) {

          if ((userContext.user?.roleId == 1) || (userContext.user?.roleId == 2)) {
            console.log("[AdminRoute]: Admin login, rendering admin page.");
            return <Component {...props}></Component>;
          } else {
            console.log("[AdminRoute]: Non-admin login, redirecting to dashboard.");
            return <Redirect to={{ pathname: '/dashboard/' + userContext.user?.departmentId, state: { from: props.location } }} />;
          }

        }
        console.log("[AdminRoute]: NOT AUTHENTICATED, returning to login page");
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  );
};

export default AdminRoute;
