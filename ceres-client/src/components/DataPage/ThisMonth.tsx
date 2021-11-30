import { useContext, useEffect, useState } from 'react';
import '../../App.css';
import './DataPage.css';
import ReportData from './ReportData';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import Sidebar from '../Sidebar/Sidebar';
import { UserContext } from '../../UserContext';

const ThisMonth = () => {
    // const [thisMonthID, setThisMonthId] = useState<number>(0);
    const [displayingData, setDisplayingData] = useState<any>(null);
    const [showNav, setShowNav] = useState(false);
    // const [thisMonthReport, setThisMonthReport] = useState([]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        getFormByDeptId();
        async function getFormByDeptId() {
            const url = `/form/latest/${userContext.user?.departmentId}`;
            try {
              const response = await httpService.get(url);
              console.log(response)
              const data = response.data;
              console.log('Fetched Report:', data);
              setDisplayingData(data);
            } catch (error: any) {
              console.log('Error: Unable to fetch from ' + url);
            }
          }
    }, []);
    
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