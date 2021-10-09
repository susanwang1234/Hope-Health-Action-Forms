/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/
import "./navbar.css";
import logo from "../../images/navlogo.png"

const Navbar = () => {
  return (
    
    <nav className="navbar">

      <div className="nav_icon">
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <div className="navlogo">
          <img src={logo} width="200px"/>
        </div>
        <a className='active_link' href="/dashboard">Home</a>
        <a href="/data">View Data</a>
        <a href="/submit-report">Submit Data</a>
      </div>
      <div className="navbar__right">
        <a href="/">
          <i className="fa fa-search" aria-hidden="true">Logout</i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;