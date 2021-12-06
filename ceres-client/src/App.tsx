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
import AdminRoute from './hocs/AdminRoute';
import DashboardRoute from './hocs/DashboardRoute';
import AdminHeadRoute from './hocs/AdminHeadRoute';
import MessageBoard from './components/MeesageBoard/MessageBoard';
import NewAnnouncement from './components/Admin/NewAnnouncement';
import AdminEmailForPasswordReset from './components/Admin/AdminEmailForPasswordReset';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <UnPrivateRoute exact path="/" component={Login} />
        <DashboardRoute exact path="/dashboard/:deptID" component={Dashboard}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/submit-report" component={ThisMonth}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/case-studies" component={CaseStudies}></DashboardRoute>
        <DashboardRoute exact path={'/dashboard/:deptID/case-studies/view/:id'} component={CaseStudyInstance}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/case-studies/new" component={CaseStudySubmit}></DashboardRoute>
        <DashboardRoute path="/dashboard/:deptID/statistics/" component={StatisticsDashboard}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/data-form/current" component={ThisMonth}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/data-form" component={DataPage}></DashboardRoute>
        <DashboardRoute exact path="/dashboard/:deptID/messages/" component={MessageBoard}></DashboardRoute>
        <DashboardRoute path="/dashboard/:deptID/data-form/statistics/" component={StatisticsDashboard}></DashboardRoute>
        <AdminHeadRoute path="/new-announcement" component={NewAnnouncement}></AdminHeadRoute>
        <AdminHeadRoute path="/departments" component={Departments}></AdminHeadRoute>
        <AdminRoute path="/new-employee-of-the-month" component={AdminEmployeeOfTheMonth}></AdminRoute>
        <AdminRoute path="/new-user" component={AdminCreateUser}></AdminRoute>
        <AdminRoute path="/edit-user" component={AdminEditUser}></AdminRoute>
        <AdminRoute path="/edit-emails" component={AdminEmailForPasswordReset}></AdminRoute>
      </Switch>
    </Router>
  );
}

export default App;
