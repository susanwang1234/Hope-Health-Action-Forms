import './CaseStudies.css';
import '../../App.css';
import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import { Link } from 'react-router-dom';
import httpService from '../../services/httpService';

const CaseStudy = () => {
  const [showNav, setShowNav] = useState(false);
  document.body.style.backgroundColor = '#f5f5f5';
  const [caseStudyState, setCaseStudyState] = useState({
    isLoaded: false,
    caseStudies: []
  });

  const [caseStudyImageState, setCaseStudyImageState] = useState({
    caseStudiesImages: []
  });

  useEffect(() => {
    getCaseStudies();
  }, [setCaseStudyState]);

  async function getCaseStudies() {
    const url = '/case-studies';
    try {
      const response = await httpService.get(url);
      const storeResponseBody: any = [response.data];
      getAllCaseStudiesImages(storeResponseBody);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }

  async function getAllCaseStudiesImages(storeResponseBody: any) {
    let url;
    let caseStudiesImages: any = [];
    for (let i = 0; i < storeResponseBody[0].length; i++) {
      url = `/image/${storeResponseBody[0][i].imageId}`;
      try {
        await httpService
          .get(url, {
            responseType: 'blob'
          })
          .then((res) => {
            caseStudiesImages.push(URL.createObjectURL(res.data));
          });
      } catch (error: any) {
        console.log('Error: Unable to fetch from ' + url);
      }
    }
    setCaseStudyImageState({
      caseStudiesImages: caseStudiesImages
    });
    setCaseStudyState({
      isLoaded: true,
      caseStudies: storeResponseBody[0]
    });
  }

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
                <div className="card-inner-case-study">
                  <table className="filter-container">
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="patient-story"></input>Patient Story
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="staff-recognition"></input>
                        Staff Recognition
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="trailing-session"></input>
                        Trailing Session
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="equipment-received"></input>
                        Equipment Received
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="other"></input>
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
                {caseStudyState.caseStudies.map((caseStudy: any) => {
                  return (
                    <table className="case-study-block">
                      <tr>
                        <td className="case-study-block-image">
                          <img src={caseStudyImageState.caseStudiesImages[caseStudy.id - 1]} alt="" width="width" height="150px"></img>
                        </td>
                        <td className="case-study-block-text">
                          <h2>{caseStudy.title}</h2>
                          <h5>{caseStudy.createdAt}</h5>
                          <p>{caseStudy.response}</p>
                        </td>
                        <td className="case-study-block-button">
                          <Link to={`/case-studies/${caseStudy.id}`}>
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
