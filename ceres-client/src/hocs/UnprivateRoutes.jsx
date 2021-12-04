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
          return <Component {...props}></Component>;
        }
        return <Redirect to={{ pathname: `${userContext.user.roleName !== 'user' ? '/departments' : '/dashboard/' + userContext.user.roleId}`, state: { from: props.location } }} />;
      }}
    />
  );
};

export default UnPrivateRoute;
