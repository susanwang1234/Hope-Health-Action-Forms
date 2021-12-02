import './CaseStudies.css';
import '../../App.css';
import {useContext, useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import { Link } from 'react-router-dom';
import httpService from '../../services/httpService';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';


const CaseStudy = () => {
  const userContext = useContext(UserContext);
  let queryStr = '';
  document.body.style.backgroundColor = '#f5f5f5';
  const [selectedCaseStudyType, setSelectedCaseStudyType] = useState('0');
  const [caseStudyType, setCaseStudyType] = useState({
    types: []
  });
  const [showNav, setShowNav] = useState(false);
  const [caseStudyState, setCaseStudyState] = useState<any>({
    caseStudies: [],
    caseStudiesOrig: []
  });
  const [caseStudyImageState, setCaseStudyImageState] = useState({
    caseStudiesImages: []
  });

  const search = () => {
    caseStudyState.caseStudies = caseStudyState.caseStudiesOrig;
    queryStr = (document.getElementById('search-bar') as HTMLInputElement).value;
    if (queryStr === '') {
      document.getElementById('results-msg')!.innerHTML = '';
    } else {
      document.getElementById('results-msg')!.innerHTML = 'Search results for ' + queryStr;
    }

    setCaseStudyState({
      caseStudies: caseStudyState.caseStudies,
      caseStudiesOrig: caseStudyState.caseStudiesOrig
    });

    if ((document.getElementById('search-bar') as HTMLInputElement).value == '') {
      caseStudyState.caseStudies = caseStudyState.caseStudiesOrig.slice(0);
    }

    const containsString = (caseStudy: any) => {
      return caseStudy.title.toUpperCase().includes((document.getElementById('search-bar') as HTMLInputElement).value.toUpperCase());
    };

    setCaseStudyState({
      caseStudies: caseStudyState.caseStudies.filter(containsString),
      caseStudiesOrig: caseStudyState.caseStudiesOrig
    });
  };

  const getCaseStudies = async () => {
    const url = '/case-studies';
    try {
      const response = await httpService.get(url);
      setCaseStudyState({
        caseStudies: response.data,
        caseStudiesOrig: response.data
      });
      getAllCaseStudiesImages(response.data);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const getAllCaseStudiesImages = async (retrievedCaseStudies: any) => {
    let url;
    let caseStudiesImages: any = [];
    for (let i = 0; i < retrievedCaseStudies.length; i++) {
      url = `/image/${retrievedCaseStudies[i].imageId}`;
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
  };

  useEffect(() => {
    getCaseStudies();
  }, [setCaseStudyState]);

  useEffect(() => {
    getTypeData();
  }, [setCaseStudyType]);

  const getTypeData = async () => {
    const url = '/case-study-types';
    try {
      const response = await httpService.get(url);
      const data = response.data;
      setCaseStudyType({
        types: data
      });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const getCaseStudiesByType = async (caseStudyTypeId: any) => {
    const url = `/case-studies/${caseStudyTypeId}`;
    try {
      const response = await httpService.get(url);
      setCaseStudyState({
        caseStudies: response.data,
        caseStudiesOrig: response.data
      });
    } catch (error: any) {
      console.log('Error Unable to fetch from ' + url);
      toast.error('There are no case studies of this type.');
      setCaseStudyState({
        caseStudies: [],
        caseStudiesOrig: []
      });
    }
  };

  const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    toast.dismiss();
    (document.getElementById('search-bar') as HTMLInputElement).value = '';
    document.getElementById('results-msg')!.innerHTML = '';
    const value = event.target.value;
    setSelectedCaseStudyType(value);
    value !== '0' ? getCaseStudiesByType(value) : getCaseStudies();
  };

  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
    return <Redirect to="/" />;
  };

  return (
    <div className="App">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button type="submit" onClick={onClickLogOutHandler} className="grey-button logout-button top-2% right-2">
          Log Out
        </button>
      </header>
      <Sidebar show={showNav} />

      <div className="container">
        <table>
          <tr>
            <td className = "radio-column">
              <div className="card">
                <div className="card-inner-case-study">
                  <table className="filter-container">
                    <tr className = "radio-button-value">
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="0" checked={selectedCaseStudyType === '0'} onChange={radioButtonHandler}></input>All Case Studies
                      </td>
                    </tr>
                    {caseStudyType.types.map((Types: any) => {
                      return (
                        <tr className = "radio-button-value">
                          <td>
                            <input className="radio-button" name="filter" type="radio" value={Types.id} onChange={radioButtonHandler}></input>
                            {Types.name}
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
              <Link to="/case-studies/new">
                <div className = "button-div">
                  <button className="button-new-case">+ Add Case Study</button>
                </div>
              </Link>
            </td>
            <td className="column-right radio-column">
              <Form>
                <div className = "search-submit flex">
                  <div className = "search-bar">
                    <Form.Group className="mb-3" controlId="formSearch">
                      <Form.Control id="search-bar" type="search" placeholder="Search case studies..." ></Form.Control>
                    </Form.Group>
                  </div>
                  <div className = "pl-4">
                    <Button className = "submit-button" variant="primary" type="button" onClick={() => search()}>
                      Submit
                    </Button>
                  </div>
                </div>  
              </Form>
              <p id="results-msg"></p>
              <div className="case-study-block-container">
                {caseStudyState.caseStudies.map((caseStudy: any) => {
                  return (
                    <table className="case-study-block">
                      <tr>
                        <td className="case-study-block-image">
                          <img src={caseStudyImageState.caseStudiesImages[caseStudy.id - 1]} alt="" width="auto" height="150px"></img>
                        </td>
                        <td className="case-study-block-text">
                          <h2 className = "case-study-title-heading">{caseStudy.title}</h2>
                          <h5 className = "case-study-created-at">{caseStudy.createdAt}</h5>
                          <p className = "case-study-response">{caseStudy.response}</p>
                        </td>
                        <td className="case-study-block-button">
                          <Link to={`/case-studies/view/${caseStudy.id}`}>
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
