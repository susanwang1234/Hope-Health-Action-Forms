import '../../App.css';
import './Dashboard.css'
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import React, { useContext, useState} from 'react';
import { UserContext } from '../../UserContext';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi'
import logo from '../../images/navlogo.png';
import display from './../../images/original_artwork.jpg';
// Citation: https://github.com/mustafaerden/react-admin-dashboard

const Dashboard = () => {

  let history = useHistory();

  const onClick = () => {
    history.push('/case-study');
  };

  const userContext = useContext(UserContext);
  const [ showNav, setShowNav ] = useState(false)

  return (
    
    <div className='App'>
      
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt='Logo' className='logo'/>
      </header>
      <Sidebar show={showNav} />
     <div className="dashboard-container" >
        
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
              <p className="text-primary-p">Information about your department will appear here.</p>
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

      
    </div>
  );
};

export default Dashboard;
