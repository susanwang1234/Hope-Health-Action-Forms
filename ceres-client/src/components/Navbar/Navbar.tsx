/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/
import './Navbar.css';
import logo from '../../images/navlogo.png';
import { useLocation } from 'react-router-dom'




const Navbar = () => {

  let pagePath = window.location.pathname;
  console.log(pagePath);

  if (pagePath == "/dashboard") {
    return (
      <nav className="navbar">
        <div className="nav_icon">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className="navbar__left">
          <div className="navlogo">
            <img src={logo} alt="HHA Logo" width="200px" />
          </div>
          <a className="active_link" href="/dashboard">
            Home
          </a>
          <a href="/data-page">View Data</a>
          <a href="/submit-report">Submit Data</a>
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
  } else if (pagePath == "/data-page") {
    return (

      <nav className="navbar">
        <div className="nav_icon">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className="navbar__left">
          <div className="navlogo">
            <img src={logo} alt="HHA Logo" width="200px" />
          </div>
          <a href="/dashboard">
            Home
          </a>
          <a className="active_link" href="/data-page">View Data</a>
          <a href="/submit-report">Submit Data</a>
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
  } else if (pagePath == "/submit-report") {
    return (

      <nav className="navbar">
        <div className="nav_icon">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className="navbar__left">
          <div className="navlogo">
            <img src={logo} alt="HHA Logo" width="200px" />
          </div>
          <a href="/dashboard">
            Home
          </a>
          <a href="/data-page">View Data</a>
          <a className="active_link" href="/submit-report">Submit Data</a>
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
  } else {
    return(<div/>);
  }
  
};

export default Navbar;
