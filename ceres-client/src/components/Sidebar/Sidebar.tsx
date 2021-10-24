/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/

import { Link, useLocation } from 'react-router-dom'
import React from 'react';
import { Nav } from 'react-bootstrap';
import { IconContext} from 'react-icons';
import { AiOutlineHome } from 'react-icons/ai';
import { setSyntheticLeadingComments } from 'typescript';
import '../../App.css';
import {HiHome, HiStar} from 'react-icons/hi'
import {BsFillPersonFill, BsPencilSquare} from 'react-icons/bs'
import {IoIosJournal} from 'react-icons/io'


const Sidebar = ({show}:any) => {

  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      
      <ul>
        <li>
          <Link to="/dashboard" className='sideLink'><HiHome/>Home</Link>
        </li>
        <li>
          <Link to="/dashboard" className='sideLink'><BsPencilSquare/>Reports</Link>
        </li>
        <li>
          <Link to="/" className='sideLink'><IoIosJournal/>Case Study</Link>
        </li>
        <li>
          <Link to="/" className='sideLink'><HiStar/>Leaderboard</Link>
        </li>
        <li>
          <Link to="/" className='sideLink'><BsFillPersonFill/>Employee of the Month</Link>
        </li>
      </ul>
    </div>
  );
  
};

export default Sidebar;
