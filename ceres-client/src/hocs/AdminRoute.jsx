import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if ((userContext.isAuthenticated) && (userContext.user?.roleId != 4)) {
          return <Component {...props}></Component>;
        }
        return <Redirect to={{ pathname: '/dashboard/' + userContext.user?.departmentId, state: { from: props.location } }} />;
      }}
    />
  );
};

export default AdminRoute;
