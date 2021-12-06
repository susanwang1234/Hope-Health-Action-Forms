import './CaseStudyInstance.css';
import '../../App.css';
import { useContext, useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import { UserContext } from '../../UserContext';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { departmentParam } from '../../types/departmentParamType';
import { createDashboardIDPath } from '../../utils/urlParamUtil';

const CaseStudy = () => {
  const userContext = useContext(UserContext);
  const { deptID } = useParams<departmentParam>();
  const [showNav, setShowNav] = useState(false);
  const [caseStudyState, setCaseStudyState] = useState({
    caseStudies: []
  });
  const [caseStudyImage, setCaseStudyImageState] = useState('');
  const str = window.location.pathname;
  const last = str.substring(str.lastIndexOf('/') + 1, str.length);
  let caseId: number = +last;

  useEffect(() => {
    getCaseStudies();
  }, [setCaseStudyState]);

  const getCaseStudies = async () => {
    const url = `/case-study/${caseId.toString()}`;
    try {
      const response = await httpService.get(url);
      setCaseStudyState({
        caseStudies: response.data
      });
      getCaseStudyImage(response.data[0].imageId);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const getCaseStudyImage = async (imageId: number) => {
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
      <Sidebar show={showNav} departmentID={deptID} />

      <div className="w-full flex justify-center">
        <div className="container">
          <td className="column-right">
            <div className="case-study-block-container">
              {caseStudyState.caseStudies.slice(0, 1).map((caseStudy: any) => {
                return (
                  <div className="global-background">
                    <table className="case-study-block justify-center">
                      <tr className="case-study-block-text-heading">
                        <h1 className="case-study-title">
                          {caseStudy.name}: {caseStudy.title}
                        </h1>
                        <h5 className="case-study-date">{caseStudy.createdAt}</h5>
                        <h2 className="case-study-desc">{caseStudy.title}</h2>
                      </tr>

                      <tr className="">
                        <td className="case-study-block-image">
                          <img className="case-study-img" src={caseStudyImage} alt="" width="auto" height="150px"></img>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="case-study-block-text">
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
                            onClick={(event) => {
                              event.preventDefault();
                              window.location.href = `${createDashboardIDPath(deptID)}/case-studies`;
                            }}
                          >
                            Return
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                );
              })}
            </div>
          </td>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
