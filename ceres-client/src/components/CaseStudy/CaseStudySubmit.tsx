import './CaseStudy.css';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';

import data_dummy from './DummyDataCS.json'

const CaseStudy = () => {
  let history = useHistory();
  const onClick = () => {};
  const userContext = useContext(UserContext);

  console.log('Username (Case Study) is ' , userContext.user?.name)
  console.log('Department (Case Study) is ' , userContext.user?.department)
  return (
    <main>
      <Navbar />
      <div className="flex">
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
        })}
      </div>
    </main>
  );
};

export default CaseStudy;