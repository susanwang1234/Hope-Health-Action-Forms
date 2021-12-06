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

          if ((userContext.user?.roleId == 1) || (userContext.user?.roleId == 2) || (userContext.user?.roleId == 3)) {
            console.log("[AdminHeadRoute]: Admin login, rendering admin page.");
            return <Component {...props}></Component>;
          } else {
            console.log("[AdminHeadRoute]: Non-admin login, redirecting to dashboard.");
            return <Redirect to={{ pathname: '/dashboard/' + userContext.user?.departmentId, state: { from: props.location } }} />;
          }

        }
        console.log("[AdminHeadRoute]: NOT AUTHENTICATED, returning to login page");
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  );
};

export default AdminRoute;
