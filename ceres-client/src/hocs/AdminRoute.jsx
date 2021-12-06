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
            console.log("AdminRoute [AUTHENTICATED]!")
            return <Component {...props}></Component>;
          } else {
            return <Redirect to={{ pathname: '/dashboard/' + userContext.user?.departmentId, state: { from: props.location } }} />;
          }

        }
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  );
};

export default AdminRoute;
