import './CaseStudyInstance.css';
import '../../App.css';
import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import photo from './../../images/CBR_training_March 21.png';
import httpService from '../../services/httpService';

const CaseStudy = () => {
  const [showNav, setShowNav] = useState(false);
  const [caseStudyImage, setCaseStudyImageState] = useState(photo);
  document.body.style.backgroundColor = '#f5f5f5';

  const [caseStudyState, setCaseStudyState] = useState({
    isLoaded: false,
    caseStudies: []
  });

  // Get case study ID from URL pathname
  var str = window.location.pathname;
  var last = str.substring(str.lastIndexOf('/') + 1, str.length);
  var caseId: number = +last;

  useEffect(() => {
    getCaseStudies();
  }, [setCaseStudyState]);

  async function getCaseStudies() {
    const url = `/case-study/${caseId.toString()}`;
    try {
      const response = await httpService.get(url);
      const storeResponseBody: any = [response.data];
      setCaseStudyState({
        isLoaded: true,
        caseStudies: response.data
      });
      getCaseStudyImage(storeResponseBody[0][0].imageId);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }

  async function getCaseStudyImage(imageId: number) {
    const url = `/image/${imageId}`;
    try {
      await httpService
        .get(url, {
          responseType: 'blob'
        })
        .then((res) => {
          setCaseStudyImageState(URL.createObjectURL(res.data));
        });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }

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
            {caseStudyState.caseStudies.slice(caseId - 1, caseId).map((caseStudy: any) => {
              return (
                <table className="case-study-block">
                  <tr>
                    <td className="case-study-block-image">
                      <img className="case-study-img" src={caseStudyImage} alt="" width="auto" height="150px"></img>
                    </td>
                    <td className="case-study-block-text">
                      <h1 className="case-study-title">
                        {caseStudy.name}: {caseStudy.title}
                      </h1>
                      <h5 className="case-study-date">{caseStudy.createdAt}</h5>
                      <h2 className="case-study-desc">{caseStudy.title}</h2>
                      {caseStudyState.caseStudies.map((caseStudy: any) => {
                        return (
                          <div>
                            <p className="question">{caseStudy.label}</p>
                            <small className="response">{caseStudy.response}</small>
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        className="view-cancel-form-button"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = '/case-studies';
                        }}
                      >
                        Return
                      </button>
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
