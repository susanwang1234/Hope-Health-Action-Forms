import '../../App.css';
import './Dashboard.css';
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import 'react-calendar/dist/Calendar.css';
import { IoIosInformationCircle } from 'react-icons/io';
import Leaderboard from './Leaderboard';
import EmployeeOfTheMonth from './EmployeeOfTheMonth';
import ToDo from './ToDo';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { render } from '@testing-library/react';

/* Citations: 
    https://github.com/mustafaerden/react-admin-dashboard
    https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/
*/

const Dashboard = () => {
  const [showNav, setShowNav] = useState(false);
  const [show, setShow] = useState(true);

  /*
  const instructions = (event: any) => {
    alert(
      'Here is how you get points:\n\n Each department will receive a point for completing and submitting their MSPP data for the month on time. \n\n Each department will receive a point everytime they submit a new case study. \n\n The Employee of the Month will receive 3 points for the department they reside in.'
    );
  };
  */

  function AlertDismissible() {
    return (
      <>
        <Alert show={show} variant="success">
          <Alert.Heading>How do I get points?</Alert.Heading>
          <p>
          'Here is how you get points:\n\n Each department will receive a point for completing and submitting their MSPP data for the month on time. 
          \n\n Each department will receive a point everytime they submit a new case study. 
          \n\n The Employee of the Month will receive 3 points for the department they reside in.'
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close me y'all!
            </Button>
          </div>
        </Alert>
  
        {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
      </>
    );
  }

  const instructions = (event: any) => {
    render(<AlertDismissible/>);
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
          </header>
          <Sidebar show={showNav} />
          <div className="dashboard-container">
            <div className="dashboard-cards">
              <div className="card-outer fill-space-left">
                <p className="title">To Do</p>
                <div className="card-inner width-100-percent">{ToDo()}</div>

                <p className="title">
                  Leaderboard
                  <IoIosInformationCircle className="align-right icon instructions" onClick={(instructionButtonEvent) => instructions(instructionButtonEvent)} />
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
  );
};

export default Dashboard;
