import './Dashboard.css';
import '../../App.css';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import display from './../../images/original_artwork.jpg';
import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import ToDoData from '../Departments/ToDo.json';
// Citation: https://github.com/mustafaerden/react-admin-dashboard

const Dashboard = () => {
  let history = useHistory();

  const onClick = () => {
    history.push('/case-study');
  };

  const userContext = useContext(UserContext);

  console.log('Username (Dashboard) is ' , userContext.user?.role)
  console.log('Department (Dashboard) is ' , userContext.user?.department)
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

  return (
    <main>
      <Navbar />
      <div className="dashboard-container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="dashboard-title">
          <div className="dashboard-greeting">
            <h1>Hope Health Action</h1>
            <p>Dashboard</p>
          </div>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <div className="dashboard-cards">
          <div className="card">
            <i className="fa fa-user-o fa-2x text-lightblue" aria-hidden="true"></i>
            <div className="card-inner">
              <p className="font-bold text-title">Case Study</p>
              <img src={display} alt="Display" className="filler-image"></img>
              <p className="text-primary-p">Cool case information here or maybe a short summary.</p>
              <button type="submit" onClick={onClick} className="view-button">
                Current Case Studies
              </button>
              <button type="submit" onClick={onClick} className="add-button">
                + Add Case Study
              </button>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
            <div className="card-inner">
              <p className="font-bold text-title">Department Info</p>
              <div className="text">{iconChecker(ToDoData[departmentIndex!-1].caseStudy)}Case Study</div>
							<div className="text">{iconChecker(ToDoData[departmentIndex!-1].mspp)}MSPP Report</div>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-video-camera fa-2x text-yellow" aria-hidden="true"></i>
            <div className="card-inner">
              <p className="font-bold text-title">Employee of the Month</p>
              <img src={display} alt="Display" className="filler-image"></img>
              <p className="text-primary-p">Information about employee of the month.</p>
              <button type="submit" className="view-button">
                Current Employee
              </button>
              <button type="submit" className="add-button">
                + Add Employee
              </button>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-thumbs-up fa-2x text-green" aria-hidden="true"></i>
            <div className="card-inner">
              <p className="font-bold text-title">To Do</p>
              <p className="text-primary-p">Dynamic list goes here.</p>
            </div>
          </div>
        </div>
        {/* <!-- MAIN CARDS ENDS HERE --> */}
      </div>
    </main>
  );
};

export default Dashboard;
