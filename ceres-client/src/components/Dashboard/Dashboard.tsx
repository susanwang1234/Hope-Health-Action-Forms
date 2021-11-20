import '../../App.css';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import profilePic from './../../images/original_artwork.jpg';
import leaderboard from './../../images/leaderboard.jpg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoIosAlert } from 'react-icons/io';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoIosInformationCircle } from 'react-icons/io';
import httpService from '../../services/httpService';

/* Citations: 
    https://github.com/mustafaerden/react-admin-dashboard
    https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/
*/

const Dashboard = () => {
  let history = useHistory();
  const onClick = () => {
    history.push('/case-studies/new');
  };
  const userContext = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);
  const [date, setDate]: any = useState(new Date());
  const initialEmployeeOfTheMonth = {
    id: 0,
    imageId: 1,
    name: '',
    department: '',
    departmentId: 0,
    description: ''
  };
  const [employeeOfTheMonth, setEmployeeOfTheMonthState] = useState(initialEmployeeOfTheMonth);
  const [employeeOfTheMonthImage, setEmployeeOfTheMonthImageState] = useState(profilePic);
  const instructions = (event: any) => {
    alert(
      'Here is how you get points:\n\n Each department will receive a point for completeing and submitting their MSPP data for the month on time. \n\n Each department will receive a point everytime they submit a new case study. \n\n The Employee of the Month will receive 3 points for the department they reside in.'
    );
  };

  async function getEmployeeOfTheMonth() {
    const url = '/employee-of-the-month';
    try {
      const response = await httpService.get(url);
      const { data } = response;
      setEmployeeOfTheMonthState(data[0]);
      getEmployeeOfTheMonthImage();
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }

  async function getEmployeeOfTheMonthImage() {
    const url = `/image/${employeeOfTheMonth.imageId}`;
    try {
      const response = await httpService.get(url);
      const { data } = response;
      console.log(data);
      // setEmployeeOfTheMonthImageState(data);
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
