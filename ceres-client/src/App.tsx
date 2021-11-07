import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import DataPage from './components/DataPage/DataPage';
import Dashboard from './components/Dashboard/Dashboard';
import CaseStudy from './components/CaseStudy/CaseStudy';
import Departments from './components/Departments/Departments';
import Forms from './components/Forms/Forms';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnprivateRoutes';

function App() {
  return (
    <Router>
      <Switch>
        <UnPrivateRoute exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        <PrivateRoute path="/submit-report" component={Forms}></PrivateRoute>
        <PrivateRoute path="/data-page" component={DataPage}></PrivateRoute>
        <PrivateRoute path="/case-study" component={CaseStudy}></PrivateRoute>
        <PrivateRoute path="/departments" component={Departments}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
