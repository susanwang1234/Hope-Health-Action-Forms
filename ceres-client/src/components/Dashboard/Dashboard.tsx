import '../../App.css';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import React, { useContext, useState} from 'react';
import { UserContext } from '../../UserContext';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi'
// Citation: https://github.com/mustafaerden/react-admin-dashboard

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const [ showNav, setShowNav ] = useState(false)

  return (
    <div className='App'>
      <header>
        <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
      </header>

      <Sidebar show={showNav} />
      
    </div>
  );
};

export default Dashboard;
