import '../../App.css';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import profilePic from './../../images/original_artwork.jpg';
import leaderboard from './../../images/leaderboard.jpg';
import Calendar from 'react-calendar';
import { IoIosAlert } from 'react-icons/io';
import { IoIosCheckmarkCircle } from 'react-icons/io';

// Citation: https://github.com/mustafaerden/react-admin-dashboard

const Dashboard = () => {
  let history = useHistory();

  const onClick = () => {
    history.push('/case-study');
  };

  const userContext = useContext(UserContext);

  console.log('Username (Dashboard) is ', userContext.user?.role);
  console.log('Department (Dashboard) is ', userContext.user?.department);
  /*
leave for later
  var departmentIndex = userContext.user?.department;
  function iconChecker(isComplete: boolean){
  	if(isComplete){
    	return (
      	<div className="checkmark-icon">
        	<div className="checkmark"></div>
      	</div>
    	);}
    	return(
      	<div className="alert-icon">
        	<div className="alert"></div>
      	</div>
    	);
	}
    <div className="text">{iconChecker(ToDoData[departmentIndex!-1].caseStudy)}Case Study</div>
		<div className="text">{iconChecker(ToDoData[departmentIndex!-1].mspp)}MSPP Report</div>
  */
  const [showNav, setShowNav] = useState(false);
  const [value, onChange] = useState(new Date());

  return (
    <div className="App">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <Sidebar show={showNav} />
      <div className="dashboard-container">
        {/* <!-- MAIN CARDS STARTS HERE --> */}

        <div className="dashboard-cards">
          <div className="card">
            <p className="title">To Do</p>
            <div className="card-inner">
              <div className="align-left">
                <div className="due-content">
                  <IoIosCheckmarkCircle className="icon"/> Case Study <br />
                  Due October 31 2021
                </div>
                <div className="due-content">
                  <IoIosAlert className="icon"/> MSPP Report <br />
                  Due October 31 2021 <br />
                </div>
              </div>
              <div className="align-right">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>

            <p className="title">Leaderboard</p>
            <div className="card-inner">
              <img src={leaderboard} alt="leaderboard"></img>
            </div>
          </div>

          <div className="card">
            <p className="title">Employee of the Month</p>
            <div className="card-inner width-40-percent">
              <img src={profilePic} alt="profile pic" className="profile-pic"></img>
              <h1 className="heading">Name: Zack Cody</h1>
              <h1 className="heading">Department: Maternity</h1>
              <p className="text-primary-p employee-paragraph">
                Zack works in the maternity department at Hope Health Action delivering children. He is so good at delivering children he delivered 300 children this month ALONE. This is why he is
                employee of the month. Go Zack!
              </p>
            </div>
          </div>
        </div>

        {/* <!-- MAIN CARDS ENDS HERE --> */}
      </div>
    </div>
  );
};

export default Dashboard;
