import '../../App.css';
import './DataPage.css';
import React, { useContext, useEffect, useState } from 'react';
import FormElement from './FormElement';
import FormData from './FormData';
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
  document.body.style.backgroundColor = '#f5f5f5';
  const userContext = useContext(UserContext);
  const { deptID } = useParams<departmentParam>();
  const [forms, setForms] = useState([]);
  const [showNav, setShowNav] = useState(false);
  const [displayingData, setDisplayingData] = useState(null);

  const handleClick = (index: any): void => {
    setDisplayingData(forms[index]);
  };

  const getFormByDeptId = async () => {
    const url = `/form/${deptID}`;
    try {
      const response = await httpService.get(url);
      const data = response.data;
      setForms(data);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  useEffect(() => {
    getFormByDeptId();
  }, [setForms]);

  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
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
      <div className="flex justify-center hide-overflow">
        <Sidebar show={showNav} departmentID={deptID} />
        <div className=" data-list font-bold text-center p-4 m-6 row-span-3 relative rounded min-w-16">
          <h4 className="text-center">All Forms</h4>
          <ul className="list-of-forms">
            {forms.map((form: any, index: number) => (
              <FormElement data={form} onClick={() => handleClick(index)} />
            ))}
          </ul>
        </div>
        {displayingData === null ? <p className="m-60 font-bold text-xl">Select a form from the list</p> : <FormData data={displayingData} />}
      </div>
    </React.Fragment>
  );
};

export default DataPage;
