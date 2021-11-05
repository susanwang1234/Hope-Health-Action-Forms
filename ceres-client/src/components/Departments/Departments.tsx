import ToDoData from './ToDo.json';
import './Departments.css';
import '../../App.css';
import { useHistory } from 'react-router-dom';
import logo from '../../images/navlogo.png';
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
//source for checkmark icon:https://css.gg/check-o
//source for alert icon: https://css.gg/danger

function Departments() {
  let history = useHistory();
  const userContext = useContext(UserContext);

  const onClick = (departmentID: number, route: string) => {
    userContext.setUser({ role: 1, department: departmentID });
    history.push(route);
  };

  const [departmentState, setDepartmentState] = useState({
    isLoaded: false,
    departments: []
  });

  useEffect(() => {
    getData();

    async function getData() {
      const url = 'http://localhost:8080/department';
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched Departments: ' + data);
        setDepartmentState({
          isLoaded: true,
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
    <div className="background">
      <header>
        <img src={logo} alt="Department Logo" className="department-logo"></img>
      </header>
      <button type="submit" onClick={() => onClick(1, '/')} className="logout-button">
        Log Out
      </button>
      <button type="submit" className="admin-button">
        Admin Options
      </button>
      <div className="cards">
        {departmentState.departments.slice(1).map((department: any, index: any) => {
          return (
            <div className="individual-card">
              <h2>
                <b>{department.name}</b>
              </h2>
              <p>{iconChecker(ToDoData[index + 1].caseStudy)}Case Study</p>
              <p>{iconChecker(ToDoData[index + 1].mspp)}MSPP Report</p>
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
