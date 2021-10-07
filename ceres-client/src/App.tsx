import './App.css';
import Department from './Department';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserLogin from './UserLogin';
import RehabForm from './RehabForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UserLogin} />
        <Route path="/Department-home-page" component={Department}></Route>
        <Route path="bv/Department-data" component={Department}></Route>
        <Route path="bv/Rehab-form" component={RehabForm}></Route>
      </Switch>
    </Router>
  );
}

export default App;
