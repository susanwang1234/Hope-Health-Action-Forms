import './CaseStudies.css';
import '../../App.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import photo from './../../images/original_artwork.jpg';
import { Link, useHistory } from 'react-router-dom';
import httpService from '../../services/httpService';
import { Button, Form } from 'react-bootstrap';
import { debug } from 'console';

const CaseStudy = () => {
  const userContext = useContext(UserContext);
  const searchQuery = '';
  let history = useHistory();

  const [showNav, setShowNav] = useState(false);
  document.body.style.backgroundColor = '#f5f5f5';

  const [caseStudyState, setCaseStudyState] = useState<any>({
    isLoaded: false,
    caseStudies: [],
    caseStudiesOrig: []
  });

  function search() {
    caseStudyState.caseStudies = caseStudyState.caseStudiesOrig;

    setCaseStudyState({
      isLoaded: true,
      caseStudies: caseStudyState.caseStudies,
      caseStudiesOrig: caseStudyState.caseStudiesOrig
    });

    if ((document.getElementById('search-bar') as HTMLInputElement).value == '') {
      caseStudyState.caseStudies = caseStudyState.caseStudiesOrig.slice(0);
    }

    function containsString(caseStudy: any) {
      return caseStudy.title.toUpperCase().includes((document.getElementById('search-bar') as HTMLInputElement).value.toUpperCase());
    }

    setCaseStudyState({
      isLoaded: true,
      caseStudies: caseStudyState.caseStudies.filter(containsString),
      caseStudiesOrig: caseStudyState.caseStudiesOrig
    });
  }

  async function getCaseStudies() {
    const url = '/case-studies';
    try {
      const response = await httpService.get(url);
      const data1 = response.data;
      const data2 = response.data;
      console.log('Fetched Case Studies: ' + data1);
      setCaseStudyState({
        isLoaded: true,
        caseStudies: data1,
        caseStudiesOrig: data2
      });
      console.log('caseStudies: ' + caseStudyState.caseStudies);
      console.log('caseStudyOrig: ' + caseStudyState.caseStudiesOrig);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }

  useEffect(() => {
    getCaseStudies();
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
            <td className="column-left">
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
              <Form>
                <Form.Group className="mb-3" controlId="formSearch">
                  <Form.Control id="search-bar" type="search" placeholder="Search case studies..."></Form.Control>
                </Form.Group>
                <Button variant="primary" type="button" onClick={() => search()}>
                  Submit
                </Button>
              </Form>
              <p>Search results for "{(document.getElementById('search-bar') as HTMLInputElement).value}"</p>
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
