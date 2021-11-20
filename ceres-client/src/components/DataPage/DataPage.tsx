import React, { useEffect, useState } from 'react';
import '../../App.css';
import './DataPage.css';
import ReportElement from './ReportElement';
import ReportData from './ReportData';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';

const DataPage = () => {
  document.body.style.backgroundColor = '#f5f5f5';
  const [reports, setReports] = useState([]);
  const [indexOfSelectedReport, setindexOfSelectedReport] = useState<any>(null);
  const [showNav, setShowNav] = useState(false);
  const [displayingData, setDisplayingData] = useState(null);

  function handleClick(index: any): void {
    setDisplayingData(reports[index]);
  }

  useEffect(() => {
    getFormByDeptId();

    async function getFormByDeptId() {
      const url = `/form/${2}`;
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

  return (
    <React.Fragment>
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="flex justify-center">
        <Sidebar show={showNav} />
        <div className=" data-list font-bold text-center p-4 m-6 row-span-3 relative rounded min-w-16">
          <h4 className="text-center">Submitted Reports</h4>
          <ul className="list-of-reports">
            {reports.map((report: any, index: number) => (
              <ReportElement data={report} onClick={() => handleClick(index)} />
            ))}
          </ul>
        </div>
        {displayingData === null ? <p className="m-60 font-bold text-xl">Select a report from the list</p> : <ReportData data={displayingData} />}
      </div>
    </React.Fragment>
  );
};

export default DataPage;
