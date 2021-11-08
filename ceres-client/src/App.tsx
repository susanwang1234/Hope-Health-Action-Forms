import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import DataPage from './components/DataPage/DataPage';
import Dashboard from './components/Dashboard/Dashboard';
import CaseStudy from './components/CaseStudy/CaseStudy';
import CaseStudies from './components/CaseStudies/CaseStudies';
import Departments from './components/Departments/Departments';
import { UserContextProvider } from './UserContext';
import Forms from './components/Forms/Forms';

function App() {
  return (
    <Router>
      <Switch>
        <UserContextProvider>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/submit-report" component={Forms}></Route>
          <Route path="/data-page" component={DataPage}></Route>
          <Route path="/case-study" component={CaseStudy}></Route>
          <Route path="/case-studies" component={CaseStudies}></Route>
          <Route path="/departments" component={Departments}></Route>
        </UserContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
