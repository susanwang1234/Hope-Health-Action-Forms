/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { HiHome } from 'react-icons/hi';
import { BsPencilSquare, BsFillCalendarFill } from 'react-icons/bs';
import { IoIosJournal } from 'react-icons/io';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaHistory } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import './Sidebar.css';

const Sidebar = ({ show }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <ul>
        <li>
          <Link to="/dashboard" className="side-link">
            <HiHome />
            Home
          </Link>
        </li>
        <li>
          <Link to="/departments" className="side-link">
            <BsPencilSquare />
            Departments
          </Link>
        </li>
        <li>
          <Link to="/case-studies" className="side-link">
            <IoIosJournal />
            Case Studies
          </Link>
        </li>
        <li>
          <Button className="side-button" onClick={() => setOpen(!open)}>
            <IoMdArrowDropdown />
            Reports
          </Button>
          {open && (
            <li>
              <Link to="/submit-report" className="drop-link" color="red">
                <BsFillCalendarFill />
                This Month's Report
              </Link>
              <Link to="/data-page" className="drop-link">
                <FaHistory />
                Previous Reports
              </Link>
              <Link to="/statistics" className="drop-link">
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
