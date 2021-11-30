import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import DataPage from './components/DataPage/DataPage';
import Dashboard from './components/Dashboard/Dashboard';
import CaseStudies from './components/CaseStudies/CaseStudies';
import CaseStudyInstance from './components/CaseStudyInstance/CaseStudyInstance';
import CaseStudySubmit from './components/CaseStudySubmit/CaseStudySubmit';
import Departments from './components/Departments/Departments';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnprivateRoutes';
import ThisMonth from './components/DataPage/ThisMonth';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <UnPrivateRoute exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        <PrivateRoute exact path="/case-studies" component={CaseStudies}></PrivateRoute>
        <PrivateRoute exact path={'/case-studies/view/:id'} component={CaseStudyInstance}></PrivateRoute>
        <PrivateRoute path="/case-studies/new" component={CaseStudySubmit}></PrivateRoute>
        <PrivateRoute path="/departments" component={Departments}></PrivateRoute>
        <PrivateRoute path="/this-month-report" component={ThisMonth}></PrivateRoute>
        <PrivateRoute path="/data-page" component={DataPage}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
