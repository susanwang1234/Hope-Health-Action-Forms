import './CaseStudy.css';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';

const CaseStudy = () => {
  let history = useHistory();
  const onClick = () => {};
  return (
    <main>
      <Navbar />
      <div className="background">Case Study</div>
    </main>
  );
};

export default CaseStudy;
