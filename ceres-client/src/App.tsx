import './App.css';
import Department from './components/dashboard/dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login/login';
import RehabForm from './RehabForm';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Department-home-page" component={Department}></Route>
        <Route path="bv/Department-data" component={Department}></Route>
        <Route path="bv/Rehab-form" component={RehabForm}></Route>
      </Switch>
    </Router>
  );
}

export default App;
