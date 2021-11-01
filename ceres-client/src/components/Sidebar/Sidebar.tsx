/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/

import { Link, useLocation } from 'react-router-dom'
import React, {useState} from 'react';
import { Button, Nav } from 'react-bootstrap';
import { IconContext} from 'react-icons';
import { AiOutlineHome } from 'react-icons/ai';
import { setSyntheticLeadingComments } from 'typescript';
import '../../App.css';
import {HiHome, HiStar} from 'react-icons/hi'
import {BsFillPersonFill, BsPencilSquare} from 'react-icons/bs'
import {IoIosJournal} from 'react-icons/io'
import {IoMdArrowDropdown} from 'react-icons/io'
import './Sidebar.css'


const Sidebar = ({show}:any) => {

  const [open, setOpen] = useState(false);

  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      
      <ul>
        <li>
          <Link to="/dashboard" className='sideLink'><HiHome/>Home</Link>
        </li>
        <li>
          <Link to="/dashboard" className='sideLink'><BsPencilSquare/>Departments</Link>
        </li>
        <li>
          <Link to="/dashboard" className='sideLink'><BsPencilSquare/>Reports</Link>
        </li>
        <li>
          <Link to="/dashboard" className='sideLink'><IoIosJournal/>Case Studies</Link>
        </li>
        <li>
          <Button className='button' onClick={() => setOpen(!open)}><IoMdArrowDropdown/>Reports</Button>
          {open && 
            <li>
              <Link to="/dashboard" className='link' color='red'><IoIosJournal/>This Month's Report</Link>
              <Link to="/dashboard" className='link'><IoIosJournal/>Previous Reports</Link>
              <Link to="/dashboard" className='link'><IoIosJournal/>Statistics</Link>
            </li>
                }
        </li>
      </ul>
    </div>
  );
  
};

export default Sidebar;
