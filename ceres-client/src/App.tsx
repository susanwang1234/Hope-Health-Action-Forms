import React from "react";
import './App.css';
import { useForm } from 'react-hook-form';
import Logo from './images/Logo.png';
import display from './images/CBR_training_March 21.png';
import Department from "./Department";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
import NavBar from './components/NavBar'
import UserLogin from "./UserLogin";

function App() {
  return(
      <Router>
        <Switch>  
            <Route exact path='/' component={UserLogin}/>
            <NavBar />
            <Route path='/Department-home-page' component={Department}/>
        </Switch>
      </Router>
    )
}

export default App;
