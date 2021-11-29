import './CaseStudies.css';
import '../../App.css';
import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import { Link } from 'react-router-dom';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';

const CaseStudy = () => {
  const [selectedCaseStudyType, setSelectedCaseStudyType] = useState('0');
  const [caseStudyType, setCaseStudyType] = useState({
    types: []
  });
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
  const [caseStudyState, setCaseStudyState] = useState({
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
      getAllCaseStudiesImages(response.data);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }

  async function getAllCaseStudiesImages(retrievedCaseStudies: any) {
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
    setCaseStudyState({
      caseStudies: retrievedCaseStudies
    });
  }

  useEffect(() => {
    getTypeData();
  }, [setCaseStudyType]);

  async function getTypeData() {
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
  }

  async function getCaseStudiesByType(caseStudyTypeId: any) {
    const url = `/case-studies/${caseStudyTypeId}`;
    try {
      const response = await httpService.get(url);
      const data = response.data;
      setCaseStudyState({
        caseStudies: data
      });
    } catch (error: any) {
      console.log('Error Unable to fetch from ' + url);
      toast.error('There are no case studies of this type.');
      setCaseStudyState({
        caseStudies: []
      });
    }
  }

  const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCaseStudyType(value);
    value !== '0' ? getCaseStudiesByType(value) : getCaseStudies();
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
                          <img src={caseStudyImageState.caseStudiesImages[caseStudy.id - 1]} alt="" width="auto" height="150px"></img>
                        </td>
                        <td className="case-study-block-text">
                          <h2>{caseStudy.title}</h2>
                          <h5>{caseStudy.createdAt}</h5>
                          <p>{caseStudy.response}</p>
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
