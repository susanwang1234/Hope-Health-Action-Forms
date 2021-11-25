import './Departments.css';
import '../../App.css';
import { useHistory, Redirect } from 'react-router-dom';
import logo from '../../images/navlogo.png';
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import AuthService from '../../services/authService';
import httpService from '../../services/httpService';
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

  const [toDoState, setToDoState] = useState<any>({
    toDoReminders: []
  });

  const [departmentState, setDepartmentState] = useState({
    departments: []
  });

  useEffect(() => {
    getDepartments();
  }, [setDepartmentState]);

  const getToDoStatus = async (retrievedDepartments: any) => {
    const url = '/to-do';
    try {
      const response = await httpService.get(url);
      setToDoState({
        toDoReminders: response.data
      });
      setDepartmentState({
        departments: retrievedDepartments
      });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const getDepartments = async () => {
    const url = '/department';
    try {
      const response = await httpService.get(url);
      const { data } = response;
      getToDoStatus(data);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const iconChecker = (isComplete: boolean) => {
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
  };

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
              <p className="inside-text">{iconChecker(toDoState.toDoReminders[department.id - 2].caseStudies)}Case Study</p>
              <p className="inside-text">{iconChecker(toDoState.toDoReminders[department.id - 2].dataForm)}Data Form</p>
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
