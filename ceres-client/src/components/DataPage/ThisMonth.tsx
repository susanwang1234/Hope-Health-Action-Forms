import React, { useEffect, useState } from 'react';
import '../../App.css';
import './DataPage.css';
import ReportData from './ReportData';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';


const ThisMonth = () => {
    const [thisMonthID, setThisMonthId] = useState<number>(0);
    const [displayingData, setDisplayingData] = useState();
    const [showNav, setShowNav] = useState(false);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        getFormByDeptId();
        getThisMonthId();
        setDisplayingData(reports[thisMonthID])
    }, []);

    const getFormByDeptId = async ()  =>{
        const url = `/form/${2}`;
        try {
          const response = await httpService.get(url);
          const data = response.data;
          console.log('Fetched Report:', data);
          setReports(data);
          setDisplayingData(reports[thisMonthID])
          console.log(reports);
          console.log(displayingData)
        } catch (error: any) {
          console.log('Error: Unable to fetch from ' + url);
        }
      }

    const getThisMonthId = () => {
        setThisMonthId(0);
    }

    console.log()

    return(
        <div>
            <header className="nav-header">
                <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
                <img src={logo} alt="Logo" className="logo" />
            </header>
            {displayingData === null ? <p className="m-60 font-bold text-xl">There is no form for currently for this month</p> : <ReportData data={displayingData} />}
        </div>
    )
}
export default ThisMonth