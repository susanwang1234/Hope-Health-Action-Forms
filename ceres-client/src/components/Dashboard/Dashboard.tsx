import '../../App.css';
import './Dashboard.css';
import { useContext, useState, useEffect } from 'react';
import logo from '../../images/navlogo.png';
import 'react-calendar/dist/Calendar.css';
import { UserContext } from '../../UserContext';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import httpService from '../../services/httpService';
import { calculateDepartmentPoints } from '../../utils/pointSystem';
import Leaderboard from './Leaderboard';
import EmployeeOfTheMonth from './EmployeeOfTheMonth';
import ToDo from './ToDo';
import Instruction from './Instruction';
import { useParams } from 'react-router-dom';
import { departmentParam } from '../../types/departmentParamType';

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);
  const { deptID } = useParams<departmentParam>();
  const [toDo, setToDoState] = useState<any>({
    toDoReminders: []
  });
  const [pointSystem, setPointSystem] = useState<any>({
    monthlyPointSystem: []
  });

  const getToDoStatus = async () => {
    const url = '/to-do';
    try {
      const response = await httpService.get(url);
      getDepartments(response.data);
      setToDoState({
        toDoReminders: response.data
      });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const getDepartments = async (departmentStatus: any[]) => {
    const url = '/department';
    try {
      const response = await httpService.get(url);
      setPointSystem({
        monthlyPointSystem: calculateDepartmentPoints(response.data.slice(1), departmentStatus)
      });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  useEffect(() => {
    getToDoStatus();
  }, [setToDoState]);

  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
    return <Redirect to="/" />;
  };

  return (
    <>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <div className="App">
            <header className="nav-header">
              <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
              <img src={logo} alt="Logo" className="logo" />
              <button type="submit" onClick={onClickLogOutHandler} className="grey-button logout-button top-2% right-2">
                Log Out
              </button>
            </header>
            <Sidebar show={showNav} departmentID={deptID} />
            <div className="dashboard-container">
              <div className="global-background">
                <div className="dashboard-cards flex lg:flex-row flex-col">
                  <div className="equal-width">
                    <div className="flex flex-col w-full">
                      <div className="card-inner width-100-percent">
                        <p className="title">To Do</p>
                        {ToDo()}
                      </div>

                      <p className="title mt-6">
                        <div className="align-right icon instructions">{Instruction()}</div>
                      </p>
                      <div className="card-inner width-100-percent">{Leaderboard(pointSystem.monthlyPointSystem)}</div>
                    </div>
                  </div>
                  <div className="equal-width lg:pl-14 mt-6 lg:mt-0">
                    <div className="flex flex-col w-full">
                      <div className="">{EmployeeOfTheMonth()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    </>
  );
};

export default Dashboard;
