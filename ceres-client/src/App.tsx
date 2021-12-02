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
import StatisticsDashboard from './components/Statistics/Statistics';
import AdminEmployeeOfTheMonth from './components/Admin/AdminEmployeeOfTheMonth';
import NewAnnouncement from './components/Admin/NewAnnouncement';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnprivateRoutes';
import ThisMonth from './components/DataPage/ThisMonth';


function App() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <UnPrivateRoute exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard/:deptID" component={Dashboard}></PrivateRoute>
        <PrivateRoute exact path="/dashboard/:deptID/submit-report" component={ThisMonth}></PrivateRoute>
        <PrivateRoute exact path="/dashboard/:deptID/data-page" component={DataPage}></PrivateRoute>
        <PrivateRoute exact path="/dashboard/:deptID/case-studies" component={CaseStudies}></PrivateRoute>
        <PrivateRoute exact path={'/dashboard/:deptID/case-studies/view/:id'} component={CaseStudyInstance}></PrivateRoute>
        <PrivateRoute exact path="/dashboard/:deptID/case-studies/new" component={CaseStudySubmit}></PrivateRoute>
        <PrivateRoute path="/departments" component={Departments}></PrivateRoute>
        <PrivateRoute path="/dashboard/:deptID/statistics/" component={StatisticsDashboard}></PrivateRoute>
        <PrivateRoute path="/new-employee-of-the-month" component={AdminEmployeeOfTheMonth}></PrivateRoute>
        <PrivateRoute path="/new-employee-of-the-month" component={AdminEmployeeOfTheMonth}></PrivateRoute>
        <PrivateRoute path="/new-announcement" component={NewAnnouncement}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
