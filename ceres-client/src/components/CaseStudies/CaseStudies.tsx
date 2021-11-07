import './CaseStudies.css';
import '../../App.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import photo from './../../images/original_artwork.jpg';

const CaseStudy = () => {
  const userContext = useContext(UserContext);

  const [showNav, setShowNav] = useState(false);
  document.body.style.backgroundColor = '#f5f5f5';

  const [caseStudyState, setCaseStudyState] = useState({
    isLoaded: false,
    caseStudies: []
  });

  useEffect(() => {
    getData();

    async function getData() {
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
        <table>
          <tr>
            <td>
              <div className="card">
                <div className="card-inner">
                  <table>
                    <tr>
                      <td>
                        <input className="radio-button" type="radio" value="patient-story"></input>Patient Story
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" type="radio" value="staff-recognition"></input>
                        Staff Recognition
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" type="radio" value="trailing-session"></input>
                        Trailing Session
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" type="radio" value="equipment-received"></input>
                        Equipment Received
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" type="radio" value="other"></input>
                        Other
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <button className="button">+ Add Case Study</button>
            </td>
            <td className="column-right">
              <input className="input" type="text" placeholder="Search Case Studies..."></input>

              <div className="case-study-block-container">
                {/* Dynamically insert case study blocks here */}
                {caseStudyState.caseStudies.map((caseStudies: any, index: any) => {
                  return (
                    <table className="case-study-block">
                      <tr>
                        <td className="case-study-block-image">
                          <img src={photo} width="150px" height="150px"></img>
                        </td>
                        <td className="case-study-block-text">
                          <h2>{caseStudies.title}</h2>
                          <h5>{caseStudies.createdAt}</h5>
                          <p>{caseStudies.response}</p>
                        </td>
                        <td className="case-study-block-button">
                          <button className="button">View</button>
                        </td>
                      </tr>
                    </table>
                  );
                })}
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default CaseStudy;
