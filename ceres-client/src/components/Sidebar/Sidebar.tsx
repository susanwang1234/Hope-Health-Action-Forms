/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/

import { Link } from 'react-router-dom';
import { ReactElement, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { HiHome } from 'react-icons/hi';
import { BsPencilSquare, BsFillCalendarFill } from 'react-icons/bs';
import { IoIosJournal } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaHistory } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import { BsFileEarmarkTextFill } from 'react-icons/bs';
import './Sidebar.css';

const Sidebar = ({ show }: any) => {
  const [open, setOpen] = useState(false);
  const [displayedArrowIcon, setDisplayedArrowIcon] = useState<ReactElement>();
  useEffect(() => {
    displayArrowIcon();
  });
  const displayArrowIcon = () => {
    !open ? setDisplayedArrowIcon(<MdOutlineKeyboardArrowRight className="absolute right-0" />) : setDisplayedArrowIcon(<MdOutlineKeyboardArrowDown className="absolute right-0" />);
  };

  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <ul>
        <li>
          <Link to="/dashboard" className="side-link">
            <HiHome />
            Dashbaord
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
            <BsFileEarmarkTextFill />
            Reports
            {displayedArrowIcon}
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
