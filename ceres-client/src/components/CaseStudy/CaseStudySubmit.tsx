import './CaseStudy.css';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import logo from '../../images/navlogo.png';

import data_dummy from './DummyDataCS.json'

const CaseStudy = () => {
  let history = useHistory();
  const onClick = () => {};
  const userContext = useContext(UserContext);

  console.log('Username (Case Study) is ' , userContext.user?.name)
  console.log('Department (Case Study) is ' , userContext.user?.department)
  return (
    <div className= "w-full h-full flex flex-col">
      <div className="headerbar">
        <img src={logo} className="department_logo"></img>
        <button type="submit" className="logout_button">Log Out</button>
      </div>
      <div className="flex w-full flex-col h-screen justify-center items-center bg-gray-100">
        <div>
          abcd
        </div>
        <div className = "flex flex-col w-8/12 shadow-2xl h-8/12 border p-8 bg-white">
          <h1 className = "text-center">Current Case Study</h1>
          <div className = "flex flex-col">
            <h2 className = "mb-4">Type of Case Study</h2>
            <input placeholder = "Dropdown"/>
            <h1>Current Case Study</h1>

        
        {data_dummy.map((Story, index) => {
          return <div>
            <h1>{Story.name}</h1>
            <h2>{Story.questions.map((Questions, idx)=> {return <div> 
            <h1>{Questions['id']}</h1>
            <h1>{Questions['inputType']}</h1>
            <h1>{Questions.caseStudyQuestionId}</h1>
            <h1>{Questions.caseStudyTypeId}</h1>
            <h1>{Questions.label}</h1>
            <h1>{Questions['responseType']}</h1>
            </div>
            
            })}</h2>
          </div>
        })}



          </div>
        </div>    
      </div>
    </div>

  );
};

export default CaseStudy;


  {/* 
        <h1>Current Case Study</h1>

        
        {data_dummy.map((Story, index) => {
          return <div>
            <h1>{Story.name}</h1>
            <h2>{Story.questions.map((Questions, idx)=> {return <div> 
            <h1>{Questions['id (this refers to id in CSTQ table)']}</h1>
            <h1>{Questions['inputType (most likely refers to an HTML input type)']}</h1>
            <h1>{Questions.caseStudyQuestionId}</h1>
            <h1>{Questions.caseStudyTypeId}</h1>
            <h1>{Questions.label}</h1>
            <h1>{Questions['responseType (expected responseType in case the response type they want to be used doesn\'t line up with the input type)']}</h1>
            </div>
            
            })}</h2>
          </div>
        })} */}