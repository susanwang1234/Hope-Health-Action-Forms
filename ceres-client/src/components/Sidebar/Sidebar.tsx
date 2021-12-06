import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { HiHome } from 'react-icons/hi';
import { BsPencilSquare, BsFillCalendarFill } from 'react-icons/bs';
import { IoIosJournal } from 'react-icons/io';
import { FaHistory } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import { createDashboardIDPath } from '../../utils/urlParamUtil';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import './Sidebar.css';
/*
 Cite: https://css.gg/chevron-down
*/

const Sidebar = ({ show, departmentID }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <ul>
        <li>
          <Link to={{ pathname: createDashboardIDPath(departmentID), state: { currentDeparmentID: departmentID } }} className="side-link">
            <HiHome />
            Dashbaord
          </Link>
        </li>
        <li>
          <Link to={{ pathname: '/departments', state: { currentDeparmentID: departmentID } }} className="side-link">
            <BsPencilSquare />
            Departments
          </Link>
        </li>
        <li>
          <Link to={{ pathname: createDashboardIDPath(departmentID) + '/case-studies', state: { currentDeparmentID: departmentID } }} className="side-link">
            <IoIosJournal />
            Case Studies
          </Link>
        </li>
        <li>
          <Button className="side-button" onClick={() => setOpen(!open)}>
            <MdOutlineKeyboardArrowDown />
            Reports
          </Button>
          {open && (
            <li>
              <Link to={{ pathname: createDashboardIDPath(departmentID) + '/submit-report', state: { currentDeparmentID: departmentID } }} className="drop-link" color="red">
                <BsFillCalendarFill />
                This Month's Report
              </Link>
              <Link to={{ pathname: createDashboardIDPath(departmentID) + '/data-page', state: { currentDeparmentID: departmentID } }} className="drop-link">
                <FaHistory />
                Previous Reports
              </Link>
              <Link to={{ pathname: createDashboardIDPath(departmentID) + '/statistics', state: { currentDeparmentID: departmentID } }} className="drop-link">
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
