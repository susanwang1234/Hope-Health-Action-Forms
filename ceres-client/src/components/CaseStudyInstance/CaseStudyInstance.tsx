import './CaseStudyInstance.css';
import '../../App.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import photo from './../../images/original_artwork.jpg';
import { Link } from 'react-router-dom';

const CaseStudy = () => {
  const userContext = useContext(UserContext);

  const [showNav, setShowNav] = useState(false);
  document.body.style.backgroundColor = '#f5f5f5';

  const [caseStudyState, setCaseStudyState] = useState({
    isLoaded: false,
    caseStudies: []
  });

  // Get case study ID from URL pathname
  var str = window.location.pathname;
  var last = str.substring(str.lastIndexOf("/") + 1, str.length);
  var caseId: number = +last;

  useEffect(() => {
    getCaseStudies();

    async function getCaseStudies() {
      const url = 'http://localhost:8080/case-studies';
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched Case Studies: ' + data);
        setCaseStudyState({
          isLoaded: true,
          caseStudies: data
        });
      } catch (error: any) {
        console.log('Error: Unable to fetch from ' + url);
      }
    }
  }, [setCaseStudyState]);

  return (
    <div className="App">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <Sidebar show={showNav} />
      <div className="container">
        <td className="column-right">

          <div className="case-study-block-container">
            {/* Dynamically insert case study information here */}
            {caseStudyState.caseStudies.slice(caseId-1, caseId).map((caseStudy: any) => {
              return (
                <table className="case-study-block">
                  <tr>
                    <td className="case-study-block-image">
                      <img src={photo} alt="" width="150px" height="150px"></img>
                    </td>
                    <td className="case-study-block-text">
                      <h2>{caseStudy.title}</h2>
                      <h5>{caseStudy.createdAt}</h5>
                      <p>{caseStudy.response}</p>
                    </td>
                  </tr>
                </table>
              );
            })}
          </div>
        </td>
      </div>
    </div>
  );
};

export default CaseStudy;
