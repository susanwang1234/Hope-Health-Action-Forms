import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import './DataPage.css';
import ReportElement from './ReportElement';
import ReportData from './ReportData';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import { departmentParam } from '../../types/departmentParamType';

const DataPage = () => {
  const { deptID } = useParams<departmentParam>();
  document.body.style.backgroundColor = '#f5f5f5';

  const [reports, setReports] = useState([]);
  const [indexOfSelectedReport, setindexOfSelectedReport] = useState<any>(null);
  const [showNav, setShowNav] = useState(false);
  const [displayingData, setDisplayingData] = useState(null);
  const userContext = useContext(UserContext);

  function handleClick(index: any): void {
    setDisplayingData(reports[index]);
  }

  useEffect(() => {
    getFormByDeptId();

    async function getFormByDeptId() {
      const url = `/form/${deptID}`;
      try {
        const response = await httpService.get(url);
        const data = response.data;
        console.log('Fetched Report:', data);
        setReports(data);
      } catch (error: any) {
        console.log('Error: Unable to fetch from ' + url);
      }
    }
  }, []);

  const onClickLogOutHandler = async () => {
    await userContext.logout();
    return <Redirect to="/" />;
  };

  return (
    <React.Fragment>
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button type="submit" onClick={onClickLogOutHandler} className="grey-button logout-button top-2% right-2">
           Log Out
        </button>
      </header>
      <div className="list-view-report flex justify-center">
        <Sidebar show={showNav} departmentID={deptID} />
        <div className=" data-list font-bold text-center p-4 m-6 row-span-3 relative rounded min-w-16">
          <h4 className="text-center pb-3">Submitted Reports</h4>
          <ul className="list-of-reports">
            {reports.map((report: any, index: number) => (
              <ReportElement data={report} onClick={() => handleClick(index)} />
            ))}
          </ul>
        </div>
        {displayingData === null ? <p className="select-text m-60 font-bold text-xl">Select a report from the list</p> : <ReportData data={displayingData} />}
      </div>
    </React.Fragment>
  );
};

export default DataPage;
