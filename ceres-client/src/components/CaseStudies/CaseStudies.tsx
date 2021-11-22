import './CaseStudies.css';
import '../../App.css';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import photo from './../../images/original_artwork.jpg';
import { Link } from 'react-router-dom';
import httpService from '../../services/httpService';

const CaseStudy = () => {
  const userContext = useContext(UserContext);

  const [selectedCaseStudyType, setSelectedCaseStudyType] = useState('');
  const [showNav, setShowNav] = useState(false);
  document.body.style.backgroundColor = '#f5f5f5';

  const [caseStudyState, setCaseStudyState] = useState({
    isLoaded: false,
    caseStudies: []
  });

  useEffect(() => {
    getCaseStudies();

    async function getCaseStudies() {
      const url = '/case-studies';
      try {
        const response = await httpService.get(url);
        const data = response.data;
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

  async function getCaseStudiesByType(caseStudyTypeId: any) {
    const url = `/case-studies/${caseStudyTypeId}`;
    try {
      const response = await httpService.get(url);
      const data = response.data;
      console.log('Fetched Case Studies by type: ' + data);
      setCaseStudyState({
        isLoaded: true,
        caseStudies: data
      });
    } catch (error: any) {
      console.log('Error Unable to fetch from ' + url);
    }
  }

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCaseStudyType(event.target.value);
    console.log(selectedCaseStudyType);
    if (selectedCaseStudyType != '0') {
      getCaseStudiesByType(selectedCaseStudyType);
    }
  };

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
            <td className="column-left">
              <div className="card">
                <div className="card-inner-case-study">
                  <table className="filter-container">
                    <h1>{selectedCaseStudyType}</h1>
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="0" onChange={radioHandler}></input>All Case Studies
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="1" onChange={radioHandler}></input>Patient Story
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="2" onChange={radioHandler}></input>
                        Staff Recognition
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="3" onChange={radioHandler}></input>
                        Training Session
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="4" onChange={radioHandler}></input>
                        Equipment Received
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="5" onChange={radioHandler}></input>
                        Other
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <Link to="/case-studies/new">
                <button className="button-new-case">+ Add Case Study</button>
              </Link>
            </td>
            <td className="column-right">
              <input className="input" type="text" placeholder="Search Case Studies..."></input>

              <div className="case-study-block-container">
                {/* Dynamically insert case study blocks here */}
                {caseStudyState.caseStudies.map((caseStudies: any) => {
                  return (
                    <table className="case-study-block">
                      <tr>
                        <td className="case-study-block-image">
                          <img src={photo} alt="" width="150px" height="150px"></img>
                        </td>
                        <td className="case-study-block-text">
                          <h2>{caseStudies.title}</h2>
                          <h5>{caseStudies.createdAt}</h5>
                          <p>{caseStudies.response}</p>
                        </td>
                        <td className="case-study-block-button">
                          <Link to={`/case-studies/${caseStudies.id}`}>
                            <button className="button">View</button>
                          </Link>
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
