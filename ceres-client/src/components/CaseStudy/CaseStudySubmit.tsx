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
            <h2>{Story.questions}</h2>
          </div>
        })}
      </div>
    </main>
  );
};

export default CaseStudy;