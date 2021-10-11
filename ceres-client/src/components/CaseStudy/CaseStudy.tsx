import './CaseStudy.css';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';

const CaseStudy = () => {
  let history = useHistory();
  const onClick = () => {};
  const userContext = useContext(UserContext);

  console.log('Username (Case Study) is ' , userContext.user?.name)
  console.log('Department (Case Study) is ' , userContext.user?.department)
  return (
    <main>
      <Navbar />
      <div className="background">Case Study</div>
    </main>
  );
};

export default CaseStudy;
