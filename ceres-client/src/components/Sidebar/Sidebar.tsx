/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/

import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { AiOutlineHome } from 'react-icons/ai';
import { setSyntheticLeadingComments } from 'typescript';
import { HiHome, HiStar } from 'react-icons/hi';
import { BsFillPersonFill, BsPencilSquare, BsFillCalendarFill } from 'react-icons/bs';
import { IoIosJournal } from 'react-icons/io';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaHistory } from 'react-icons/fa'
import { ImStatsDots } from 'react-icons/im'
import './Sidebar.css';

const Sidebar = ({ show }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <ul>
        <li>
          <Link to="/dashboard" className="sideLink">
            <HiHome />
            Home
          </Link>
        </li>
        <li>
          <Link to="/departments" className="sideLink">
            <BsPencilSquare />
            Departments
          </Link>
        </li>
        <li>
          <Link to="/case-study" className="sideLink">
            <IoIosJournal />
            Case Studies
          </Link>
        </li>
        <li>
          <Button className="sideButton" onClick={() => setOpen(!open)}>
            <IoMdArrowDropdown />
            Reports
          </Button>
          {open && (
            <li>
              <Link to="/submit-report" className="dropLink" color="red">
                <BsFillCalendarFill />
                This Month's Report
              </Link>
              <Link to="/data-page" className="dropLink">
                <FaHistory />
                Previous Reports
              </Link>
              <Link to="/statistics" className="dropLink">
                <ImStatsDots />
                Statistics
              </Link>
            </li>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
