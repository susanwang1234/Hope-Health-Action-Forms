import '../../App.css';
import './Dashboard.css';
import { useContext, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import 'react-calendar/dist/Calendar.css';
import { UserContext } from '../../UserContext';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import EmployeeOfTheMonth from './EmployeeOfTheMonth';
import ToDo from './ToDo';
import Instruction from './Instruction';


/* Citations: 
    https://github.com/mustafaerden/react-admin-dashboard
*/

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);
  const [date, setDate]: any = useState(new Date());

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
          <Sidebar show={showNav} />
          <div className="dashboard-container">
            <div className="dashboard-cards">
              <div className="card-outer fill-space-left">
                <p className="title">To Do</p>
                <div className="card-inner width-100-percent">{ToDo()}</div>

                <p className="title">
                  Leaderboard
                  <div className="align-right icon instructions">{Instruction()}</div>
                </p>
                <div className="card-inner width-100-percent">{Leaderboard()}</div>
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
