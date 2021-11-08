import ToDoData from './ToDo.json';
import './Departments.css';
import '../../App.css';
import { useHistory, Redirect } from 'react-router-dom';
import logo from '../../images/navlogo.png';
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import AuthService from '../../services/authService';
//source for checkmark icon:https://css.gg/check-o
//source for alert icon: https://css.gg/danger

function Departments() {
  let history = useHistory();
  const userContext = useContext(UserContext);

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
    getData();

    async function getData() {
      const baseApiUrl = process.env.REACT_APP_DEPLOYMENT_API_URL || 'http://localhost:8080';
      const url = `${baseApiUrl}/department`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched Departments: ' + data);
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

  if(userContext.user?.username != null){
    
    console.log('(Departments Page)  Username is ' , userContext.user?.username)
    console.log('(Departments Page) ID is ' , userContext.user?.id)
    console.log('(Departments Page) Department Id is ' , userContext.user?.departmentId)
    console.log('(Departments Page) Role ID is ' , userContext.user?.roleId)
  }

  //Purpose of slice is so that "all departments" does not get generate into a card
  return (
    <div className="department-background">
      <header className="department-header">
        <img src={logo} alt="Department Logo" className="department-logo"></img>
      </header>
      <button type="submit" onClick={onClickLogOutHandler} className="logout-button">
        Log Out
      </button>
      <button type="submit" className="admin-button">
        Admin Options
      </button>
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
  );
}
export default Departments;
