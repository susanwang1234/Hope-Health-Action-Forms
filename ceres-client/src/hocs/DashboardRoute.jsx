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
            return <Component {...props}></Component>;
          } else if (userContext.user?.departmentId == deptId) {
            return <Component {...props}></Component>;
          } else {
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
          }
        }
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  );
};

export default DashboardRoute;
