import { useContext, useEffect, useState } from 'react';
import '../../App.css';
import './DataPage.css';
import ReportData from './ReportData';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import Sidebar from '../Sidebar/Sidebar';
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import { departmentParam } from '../../types/departmentParamType';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';

const ThisMonth = () => {
  const { deptID } = useParams<departmentParam>();
  const [displayingData, setDisplayingData] = useState<any>(null);
  const [showNav, setShowNav] = useState(false);
  const userContext = useContext(UserContext);

  useEffect(() => {
    getFormByDeptId();
    async function getFormByDeptId() {
      const url = `/form/latest/${deptID}`;
      try {
        const response = await httpService.get(url);
        console.log(response);
        const data = response.data;
        console.log('Fetched Report:', data);
        setDisplayingData(data);
      } catch (error: any) {
        console.log('Error: Unable to fetch from ' + url);
      }
    }
  }, []);

  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
    return <Redirect to="/" />;
  };

  return (
    <div>
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button type="submit" onClick={onClickLogOutHandler} className="grey-button logout-button top-2% right-2">
          Log Out
        </button>
      </header>
      <div className="flex justify-center">
        <Sidebar show={showNav} departmentID={deptID} />
        <div className="global-background">{displayingData == null ? <p className="m-60 font-bold text-xl">There is no form currently for this month</p> : <ReportData data={displayingData} />}</div>
      </div>
    </div>
  );
};
export default ThisMonth;
