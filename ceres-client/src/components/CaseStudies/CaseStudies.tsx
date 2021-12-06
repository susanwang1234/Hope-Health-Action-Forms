import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import './CaseStudies.css';
import { useState, useEffect, useContext } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import { Link, Redirect, useParams } from 'react-router-dom';
import httpService from '../../services/httpService';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { departmentParam } from '../../types/departmentParamType';
import { createDashboardIDPath } from '../../utils/urlParamUtil';
import { UserContext } from '../../UserContext';

const CaseStudy = (props: any) => {
  const { deptID } = useParams<departmentParam>();
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

  const onClickLogOutHandler = async () => {
    await userContext.logout();
    return <Redirect to="/" />;
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
      toast.error(error.response.data.error);
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

  return (
    <div className="App">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button type="submit" onClick={onClickLogOutHandler} className="grey-button top-2% right-2">
          Log Out
        </button>
      </header>
      <Sidebar show={showNav} departmentID={deptID} />
      <div className="container">
        <table>
          <tr>
            <td>
              <div className="card">
                <div className="card-inner-case-study">
                  <table className="filter-container">
                    <tr>
                      <td>
                        <input className="radio-button" name="filter" type="radio" value="0" checked={selectedCaseStudyType === '0'} onChange={radioButtonHandler}></input>All Case Studies
                      </td>
                    </tr>
                    {caseStudyType.types.map((Types: any) => {
                      return (
                        <tr>
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
              <Link to={`${createDashboardIDPath(deptID)}/case-studies/new`}>
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
                          <h2 className="case-study-title">{caseStudy.title}</h2>
                          <h5 className="case-study-date">{caseStudy.createdAt}</h5>
                          <p>{caseStudy.response}</p>
                        </td>
                        <td className="case-study-block-button">
                          <Link to={`${createDashboardIDPath(deptID)}/case-studies/view/${caseStudy.id}`}>
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
