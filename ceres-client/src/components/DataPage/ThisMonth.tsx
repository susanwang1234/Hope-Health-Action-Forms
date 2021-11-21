import React, { useEffect, useState } from 'react';
import '../../App.css';
import './DataPage.css';
import ReportData from './ReportData';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import Sidebar from '../Sidebar/Sidebar';


const ThisMonth = () => {
    const [thisMonthID, setThisMonthId] = useState<number>(0);
    const [displayingData, setDisplayingData] = useState<any>(null);
    const [showNav, setShowNav] = useState(false);
    const [reports, setReports] = useState([]);

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
    useEffect(() =>{
        getThisMonthId();
        setDisplayingData(reports[thisMonthID])
    }, [reports])

    const getThisMonthId = () => {
        setThisMonthId(0);
    }

    return(
        <div>
            <header className="nav-header">
                <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
                <img src={logo} alt="Logo" className="logo" />
            </header>
            <div className="flex justify-center">
            <Sidebar show={showNav} />
            {(displayingData == null) ? <p className="m-60 font-bold text-xl">There is no form currently for this month</p> : <ReportData data={displayingData} />}
            </div>
        </div>
    )
}
export default ThisMonth