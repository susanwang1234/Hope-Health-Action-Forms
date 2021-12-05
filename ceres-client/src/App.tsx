import './App.css';
import { BrowserRouter as Router, Redirect, Switch, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import DataPage from './components/DataPage/DataPage';
import Dashboard from './components/Dashboard/Dashboard';
import CaseStudies from './components/CaseStudies/CaseStudies';
import CaseStudyInstance from './components/CaseStudyInstance/CaseStudyInstance';
import CaseStudySubmit from './components/CaseStudySubmit/CaseStudySubmit';
import Departments from './components/Departments/Departments';
import AdminEmployeeOfTheMonth from './components/Admin/AdminEmployeeOfTheMonth';
import UnPrivateRoute from './hocs/UnprivateRoutes';
import AdminCreateUser from './components/Admin/AdminCreateUser';
import AdminEditUser from './components/Admin/AdminEditUser';
import ThisMonth from './components/DataPage/ThisMonth';
import AdminRoute from './hocs/AdminRoute';
import DashboardRoute from './hocs/DashboardRoute';

function App() {

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <UnPrivateRoute exact path="/" component={Login} />
        <DashboardRoute exact path="/dashboard/:deptID" component={Dashboard}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/submit-report" component={ThisMonth}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/data-page" component={DataPage}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/case-studies" component={CaseStudies}></DashboardRoute>
        <DashboardRoute exact path={'/dashboard/:deptID/case-studies/view/:id'} component={CaseStudyInstance}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/case-studies/new" component={CaseStudySubmit}></DashboardRoute>
        <AdminRoute path="/departments" component={Departments}></AdminRoute>
        <AdminRoute path="/new-employee-of-the-month" component={AdminEmployeeOfTheMonth}></AdminRoute>
        <AdminRoute path="/new-user" component={AdminCreateUser}></AdminRoute>
        <AdminRoute path="/edit-user" component={AdminEditUser}></AdminRoute>
      </Switch>
    </Router>
  );
}

export default App;
