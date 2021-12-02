import '../../App.css';
import './Dashboard.css';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import { calculateDepartmentPoints } from './util/pointSystem';
import Leaderboard from './Leaderboard';
import EmployeeOfTheMonth from './EmployeeOfTheMonth';
import ToDo from './ToDo';
import Instruction from './Instruction';

const Dashboard = () => {
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
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
            </header>
            <Sidebar show={showNav} />
            <div className="dashboard-container">
              <div className="dashboard-cards">
                <div className="card-outer fill-space-left">
                  <p className="title">To Do</p>
                  <div className="card-inner width-100-percent">{ToDo(toDo.toDoReminders)}</div>
                  <p className="title">
                    Leaderboard
                    <div className="align-right icon instructions">{Instruction()}</div>
                  </p>
                  <div className="card-inner width-100-percent">{Leaderboard(pointSystem.monthlyPointSystem)}</div>
                </div>
                <div className="card-outer fill-space-right">
                  <p className="title">Employee of the Month</p>
                  <div className="card-inner height-100-percent">{EmployeeOfTheMonth()}</div>
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
