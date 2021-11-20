import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import DataPage from './components/DataPage/DataPage';
import Dashboard from './components/Dashboard/Dashboard';
import CaseStudies from './components/CaseStudies/CaseStudies';
import CaseStudySubmit from './components/CaseStudy/CaseStudySubmit';
import Departments from './components/Departments/Departments';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnprivateRoutes';
import ThisMonth from './components/DataPage/ThisMonth';


function App() {
  return (
    <Router>
      <Switch>
        <UnPrivateRoute exact path="/" component={ThisMonth} />
        <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        <PrivateRoute path="/submit-report" component={ThisMonth}></PrivateRoute>
        <PrivateRoute path="/data-page" component={DataPage}></PrivateRoute>
        <PrivateRoute exact path="/case-studies" component={CaseStudies}></PrivateRoute>
        <PrivateRoute path="/case-studies/new" component={CaseStudySubmit}></PrivateRoute>
        <PrivateRoute path="/departments" component={Departments}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
