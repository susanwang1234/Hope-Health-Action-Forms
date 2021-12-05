import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';

const DashboardRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);

  const str = window.location.pathname;
  const first = str.split('/')[2];
  let deptId = first;
  console.log("Requested Department ID: " + deptId);

  return (
    <Route
      {...rest}
      render={(props) => {
        if ((userContext.isAuthenticated) && ((userContext.user?.departmentId == deptId) || (userContext.user?.roleId == 1))) {
          return <Component {...props}></Component>;
        }
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  );
};

export default DashboardRoute;
