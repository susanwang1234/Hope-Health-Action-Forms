import './CaseStudy.css';
import Navbar from '../Navbar/Navbar';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

const CaseStudy = () => {
  const userContext = useContext(UserContext);

  console.log('Username (Case Study) is ', userContext.user?.role);
  console.log('Department (Case Study) is ', userContext.user?.department);
  return (
    <main>
      <Navbar />
      <div className="background">Case Study</div>
    </main>
  );
};

export default CaseStudy;
