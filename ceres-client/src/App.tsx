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
import StatisticsDashboard from './components/Statistics/Statistics';
import AdminEmployeeOfTheMonth from './components/Admin/AdminEmployeeOfTheMonth';
import UnPrivateRoute from './hocs/UnprivateRoutes';
import AdminCreateUser from './components/Admin/AdminCreateUser';
import AdminEditUser from './components/Admin/AdminEditUser';
import ThisMonth from './components/DataPage/ThisMonth';
<<<<<<< HEAD
import AdminRoute from './hocs/AdminRoute';
import DashboardRoute from './hocs/DashboardRoute';
import AdminHeadRoute from './hocs/AdminHeadRoute';
=======
import MessageBoard from './components/MeesageBoard/MessageBoard';
>>>>>>> master
import AdminEmailForPasswordReset from './components/Admin/AdminEmailForPasswordReset';

function App() {

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <UnPrivateRoute exact path="/" component={Login} />
<<<<<<< HEAD
        <DashboardRoute exact path="/dashboard/:deptID" component={Dashboard}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/submit-report" component={ThisMonth}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/case-studies" component={CaseStudies}></DashboardRoute>
        <DashboardRoute exact path={'/dashboard/:deptID/case-studies/view/:id'} component={CaseStudyInstance}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/case-studies/new" component={CaseStudySubmit}></DashboardRoute>
        <DashboardRoute path="/dashboard/:deptID/statistics/" component={StatisticsDashboard}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/data-form/current" component={ThisMonth}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/data-form" component={DataPage}></DashboardRoute>
        <DashboardRoute path="/dashboard/:deptID/data-form/statistics/" component={StatisticsDashboard}></DashboardRoute>
        <AdminHeadRoute path="/departments" component={Departments}></AdminHeadRoute>
        <AdminRoute path="/new-employee-of-the-month" component={AdminEmployeeOfTheMonth}></AdminRoute>
        <AdminRoute path="/new-user" component={AdminCreateUser}></AdminRoute>
        <AdminRoute path="/edit-user" component={AdminEditUser}></AdminRoute>
        <AdminRoute path="/edit-emails" component={AdminEmailForPasswordReset}></AdminRoute>

=======
        <PrivateRoute exact path="/dashboard/:deptID" component={Dashboard}></PrivateRoute>
        <PrivateRoute exact path="/dashboard/:deptID/data-form/current" component={ThisMonth}></PrivateRoute>
        <PrivateRoute exact path="/dashboard/:deptID/data-form" component={DataPage}></PrivateRoute>
        <PrivateRoute exact path="/dashboard/:deptID/case-studies" component={CaseStudies}></PrivateRoute>
        <PrivateRoute exact path={'/dashboard/:deptID/case-studies/view/:id'} component={CaseStudyInstance}></PrivateRoute>
        <PrivateRoute exact path="/dashboard/:deptID/case-studies/new" component={CaseStudySubmit}></PrivateRoute>
        <PrivateRoute exact path="/dashboard/:deptID/messages/" component={MessageBoard}></PrivateRoute>
        <PrivateRoute path="/departments" component={Departments}></PrivateRoute>
        <PrivateRoute path="/dashboard/:deptID/data-form/statistics/" component={StatisticsDashboard}></PrivateRoute>
        <PrivateRoute path="/new-employee-of-the-month" component={AdminEmployeeOfTheMonth}></PrivateRoute>
        <PrivateRoute path="/edit-emails" component={AdminEmailForPasswordReset}></PrivateRoute>
        <PrivateRoute path="/new-user" component={AdminCreateUser}></PrivateRoute>
        <PrivateRoute path="/edit-user" component={AdminEditUser}></PrivateRoute>
>>>>>>> master
      </Switch>
    </Router>
  );
}

export default App;
