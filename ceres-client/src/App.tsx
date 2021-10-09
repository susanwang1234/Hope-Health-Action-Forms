import './App.css';
import Department from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import RehabForm from './RehabForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Department}></Route>
        <Route path="/data" component={Department}></Route>
        <Route path="/submit-report" component={RehabForm}></Route>
      </Switch>
    </Router>
  );
}

export default App;
