import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import display from './../../images/original_artwork.jpg';
import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
// Citation: https://github.com/mustafaerden/react-admin-dashboard

const Dashboard = () => {
  let history = useHistory();

  const onClick = () => {
    history.push('/case-study');
  };

  const userContext = useContext(UserContext);

  console.log('Username (Dashboard) is ' , userContext.user?.name)
  console.log('Department (Dashboard) is ' , userContext.user?.department)

  return (
    <main>
      <Navbar />
      <div className="dashboard__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="dashboard__title">
          <div className="dashboard__greeting">
            <h1>Hope Health Action</h1>
            <p>Dashboard</p>
          </div>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <div className="dashboard__cards">
          <div className="card">
            <i className="fa fa-user-o fa-2x text-lightblue" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="font-bold text-title">Case Study</p>
              <img src={display} alt="Display" className="filler_image"></img>
              <p className="text-primary-p">Cool case information here or maybe a short summary.</p>
              <button type="submit" onClick={onClick} className="view_button">
                Current Case Studies
              </button>
              <button type="submit" onClick={onClick} className="add_button">
                + Add Case Study
              </button>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="font-bold text-title">Department Info</p>
              <p className="text-primary-p">Information about your department will appear here.</p>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-video-camera fa-2x text-yellow" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="font-bold text-title">Employee of the Month</p>
              <img src={display} alt="Display" className="filler_image"></img>
              <p className="text-primary-p">Information about employee of the month.</p>
              <button type="submit" className="view_button">
                Current Employee
              </button>
              <button type="submit" className="add_button">
                + Add Employee
              </button>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-thumbs-up fa-2x text-green" aria-hidden="true"></i>
            <div className="card_inner">
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
