/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/
import './Navbar.css';
import logo from '../../images/navlogo.png';
import { useLocation } from 'react-router-dom'

const Navbar = () => {

  let pagePath = window.location.pathname;
  console.log(pagePath);

  let homeClass = "";
  let dataClass = "";
  let submitClass = "";

  if (pagePath == "/dashboard") {
    homeClass = "active_link";
  } else if (pagePath == "/data-page") {
    dataClass = "active_link";
  } else if (pagePath == "/submit-report") {
    submitClass = "active_link";
  }

  return (

    <nav className="navbar">
      <div className="nav_icon">
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <div className="navlogo">
          <img src={logo} alt="HHA Logo" width="200px" />
        </div>
        <a className={homeClass} href="/dashboard">Home</a>
        <a className = {dataClass} href="/data-page">View Data</a>
        <a className = {submitClass} href="/submit-report">Submit Data</a>
      </div>
      <div className="navbar__right">
        <a href="/">
          <i className="fa fa-search" aria-hidden="true">
            Logout
          </i>
        </a>
      </div>
    </nav>
  );
  
};

export default Navbar;
