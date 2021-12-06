import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';

const DashboardRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);

  const str = window.location.pathname;
  const first = str.split('/')[2];
  let deptId = first;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userContext.isAuthenticated) {
          if (userContext.user?.roleId < 4) {
            console.log("[DashboardRoute]: Admin/Head, rendering dashboard.");
            return <Component {...props}></Component>;
          } else if (userContext.user?.departmentId == deptId) {
            console.log("[DashboardRoute]: Regular user logged in, rendering his own dashboard.");
            return <Component {...props}></Component>;
          } else {
            console.log("[DashboardRoute]: Authenticated user ILLEGAL ACCESS, redirecting to /");
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
          }
        }
        console.log("[DashboardRoute]: Not authenticated, returning to login!");
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  );
};

export default DashboardRoute;
