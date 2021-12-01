import '../../App.css';
import './Dashboard.css';
import initialEmployeeOfTheMonth from './initialEmployeeOfTheMonth.json';
import { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import profilePic from './../../images/gray_person.jpg';
import leaderboard from './../../images/leaderboard.jpg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoIosAlert } from 'react-icons/io';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoIosInformationCircle } from 'react-icons/io';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import { UserContext } from '../../UserContext';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';


/* Citations: 
    https://github.com/mustafaerden/react-admin-dashboard
    https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/
*/

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);
  const [date, setDate]: any = useState(new Date());
  const [employeeOfTheMonth, setEmployeeOfTheMonthState] = useState(initialEmployeeOfTheMonth);
  const [employeeOfTheMonthImage, setEmployeeOfTheMonthImageState] = useState(profilePic);
  const instructions = (event: any) => {
    toast.info(
      'Here is how you get points:',
      {position: "top-center",
       autoClose: 3000}
    );
    toast.info(
      'Each department will receive a point for completeing and submitting their MSPP data for the month on time.',
      {position: "top-center",
       autoClose: 6000}
    );
    toast.info(
      'Each department will receive a point everytime they submit a new case study.',
      {position: "top-center",
       autoClose: 9000}
    );
    toast.info(
      'The Employee of the Month will receive 3 points for the department they reside in.',
      {position: "top-center",
       autoClose: 12000}
    );
  };

  async function getEmployeeOfTheMonth() {
    const url = '/employee-of-the-month';
    try {
      const response = await httpService.get(url);
      const { data } = response;
      const retrievedEmployeeOfTheMonth = data[0];
      setEmployeeOfTheMonthState(retrievedEmployeeOfTheMonth);
      await getEmployeeOfTheMonthImage(retrievedEmployeeOfTheMonth.imageId);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }

  async function getEmployeeOfTheMonthImage(imageId: number) {
    const url = `/image/${imageId}`;
    try {
      await httpService
        .get(url, {
          responseType: 'blob'
        })
        .then((res) => {
          setEmployeeOfTheMonthImageState(URL.createObjectURL(res.data));
        });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }

  useEffect(() => {
    getEmployeeOfTheMonth();
  }, [setEmployeeOfTheMonthState]);

  function generateCalendar() {
    return (
      <div className="app">
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} selectRange={true} className="responsive-calendar flex-shrink" />
        </div>
      </div>
    );
  }

  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
    return <Redirect to="/" />;
  };

  return (
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
                <div className="card-inner width-100-percent">
                  <div className="align-left">
                    <div className="due-content">
                      <IoIosCheckmarkCircle className="icon" /> Case Study <br />
                      Due October 31 2021
                    </div>
                    <div className="due-content">
                      <IoIosAlert className="icon" /> MSPP Report <br />
                      Due October 31 2021 <br />
                    </div>
                  </div>
                  <div className="align-right flex">{generateCalendar()}</div>
                </div>

                <p className="title">Leaderboard</p>
                <div className="card-inner width-100-percent">
                  <IoIosInformationCircle className="align-right icon" onClick={(e) => instructions(e)} />
                  <img className="responsive-leaderboard center-content" src={leaderboard} alt="leaderboard"></img>
                </div>
              </div>

              <div className="card-outer fill-space-right">
                <p className="title">Employee of the Month</p>
                <div className="card-inner height-100-percent">
                  <img src={employeeOfTheMonthImage} alt="profile pic" className="profile-pic"></img>
                  <h1 className="heading-1">Name: {employeeOfTheMonth.name}</h1>
                  <h1 className="heading-1">Department: {employeeOfTheMonth.department}</h1>
                  <p className="text-primary-p employee-paragraph">{employeeOfTheMonth.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Dashboard;
