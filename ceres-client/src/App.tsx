import React from 'react';
import './App.css';
<<<<<<< HEAD
import UserLogin from "./UserLogin";



function App() {


  return (
    <div className="App">
      <UserLogin/>

    </div>
   
=======
import { useForm } from 'react-hook-form';
import Logo from './images/Logo.png';
import display from './images/CBR_training_March 21.png';
import Department from './Department';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import UserLogin from './UserLogin';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UserLogin} />
        <Route path="/Department-home-page" component={Department} />
        <Route path="bv/Department-data" component={Department}></Route>
      </Switch>
    </Router>
>>>>>>> master
  );
}

export default App;

