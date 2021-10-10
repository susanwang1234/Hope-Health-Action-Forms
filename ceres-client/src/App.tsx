import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import RehabForm from './components/RehabForm/RehabForm';
import DataPage from './components/DataPage/DataPage';
import Dashboard from './components/Dashboard/Dashboard';
import CaseStudy from './components/CaseStudy/CaseStudy';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/submit-report" component={RehabForm}></Route>
        <Route path="/data-page" component={DataPage}></Route>
        <Route path="/case-study" component={CaseStudy}></Route>
      </Switch>
    </Router>
  );
}

export default App;
