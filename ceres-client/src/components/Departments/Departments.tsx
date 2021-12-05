import './Departments.css';
import '../../App.css';
import { useHistory, Redirect } from 'react-router-dom';
import logo from '../../images/navlogo.png';
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import AuthService from '../../services/authService';
import httpService from '../../services/httpService';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { GiHamburgerMenu } from 'react-icons/gi';

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
    history.push(route + '/' + departmentID);
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

  const iconChecker = (isComplete: number) => {
    if (isComplete > 0) {
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
                <p className="inside-text">{iconChecker(toDoState.toDoReminders[index].caseStudies)}Case Study</p>
                <p className="inside-text">{iconChecker(toDoState.toDoReminders[index].dataForm)}Data Form</p>
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
