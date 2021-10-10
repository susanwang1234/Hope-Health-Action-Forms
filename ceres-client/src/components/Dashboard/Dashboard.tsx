import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';
// Citation: https://github.com/mustafaerden/react-admin-dashboard

const Dashboard = () => {
  
  let history = useHistory();

  const onClick = () => {
    history.push('/case-study');
  }

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
              <p className="text-primary-p">Cool case information here.</p>
              <button type="submit" onClick={onClick} className="view_button">Current Case Studies</button>
              <button type="submit" onClick={onClick} className="add_button">+ Add Case Study</button>
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
              <p className="text-primary-p">Best employee name and photo here.</p>
              <button type="submit" className="view_button">Current Employee of the Month</button>
              <button type="submit" className="add_button">+ Add Employee of the Month</button>
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
