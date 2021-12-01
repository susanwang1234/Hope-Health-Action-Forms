import ToDoData from './ToDo.json';
import './Departments.css';
import '../../App.css';
import { useHistory, Redirect } from 'react-router-dom';
import logo from '../../images/navlogo.png';
import { UserContext } from '../../UserContext';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import AuthService from '../../services/authService';
import httpService from '../../services/httpService';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
//source for checkmark icon:https://css.gg/check-o
//source for alert icon: https://css.gg/danger

function Departments() {
  let history = useHistory();
  const userContext = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);

  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
    return <Redirect to="/" />;
  };

  const onClick = (departmentID: number, route: string) => {
    history.push(route);
  };

  const [departmentState, setDepartmentState] = useState({
    departments: []
  });

  useEffect(() => {
    getDepartments();

    async function getDepartments() {
      const url = '/department';
      try {
        const response = await httpService.get(url);
        const { data } = response;
        setDepartmentState({
          departments: data
        });
      } catch (error: any) {
        console.log('Error: Unable to fetch from ' + url);
      }
    }
  }, [setDepartmentState]);

  function iconChecker(isComplete: boolean) {
    if (isComplete) {
      return (
        <div className="checkmark-icon">
          <div className="checkmark"></div>
        </div>
      );
    }
    return (
      <div className="alert-icon">
        <div className="alert"></div>
      </div>
    );
  }

  //Purpose of slice is so that "all departments" does not get generate into a card
  return (
    <div>
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button type="submit" onClick={onClickLogOutHandler} className="grey-button top-2% right-2">
          Log Out
        </button>
      </header>
      <div className="flex h-full">
        <AdminSidebar show={showNav} />
      </div>
      <div className="department-background">
        <div className="cards">
          {departmentState.departments.slice(1).map((department: any, index: any) => {
            return (
              <div className="individual-card">
                <h2 className="inside-card">
                  <b>{department.name}</b>
                </h2>
                <p className="inside-text">{iconChecker(ToDoData[index + 1].caseStudy)}Case Study</p>
                <p className="inside-text">{iconChecker(ToDoData[index + 1].mspp)}MSPP Report</p>
                <button type="submit" onClick={() => onClick(department.id, '/dashboard')} className="view-department-button">
                  View Department
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Departments;
