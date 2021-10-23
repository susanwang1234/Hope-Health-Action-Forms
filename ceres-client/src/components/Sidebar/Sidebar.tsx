/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/
import logo from '../../images/navlogo.png';
import { Link, useLocation } from 'react-router-dom'
import React from 'react';
import { Nav } from 'react-bootstrap';
import { IconContext} from 'react-icons';
import { AiOutlineHome } from 'react-icons/ai';
import { setSyntheticLeadingComments } from 'typescript';
import '../../App.css';


const Sidebar = (show:any) => {

  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <img src={logo} alt='Logo' className='logo' />
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
      </ul>
    </div>
  );
  
};

export default Sidebar;
