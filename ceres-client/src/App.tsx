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
import Forms from './components/Forms/Forms';
import AdminEmployeeOfTheMonth from './components/Admin/AdminEmployeeOfTheMonth';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnprivateRoutes';
import AdminCreateUser from './components/Admin/AdminCreateUser';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <UnPrivateRoute exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        <PrivateRoute path="/submit-report" component={Forms}></PrivateRoute>
        <PrivateRoute path="/data-page" component={DataPage}></PrivateRoute>
        <PrivateRoute exact path="/case-studies" component={CaseStudies}></PrivateRoute>
        <PrivateRoute exact path={'/case-studies/view/:id'} component={CaseStudyInstance}></PrivateRoute>
        <PrivateRoute path="/case-studies/new" component={CaseStudySubmit}></PrivateRoute>
        <PrivateRoute path="/departments" component={Departments}></PrivateRoute>
        <PrivateRoute path="/new-employee-of-the-month" component={AdminEmployeeOfTheMonth}></PrivateRoute>
        <PrivateRoute path="/new-user" component={AdminCreateUser}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
