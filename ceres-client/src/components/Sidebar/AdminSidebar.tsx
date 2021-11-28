import { Link } from 'react-router-dom';
import { IoMdCreate } from 'react-icons/io';
import { MdAddBox } from 'react-icons/md';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { ReactElement, useEffect, useState } from 'react';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { BsPersonPlusFill } from 'react-icons/bs';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BsMegaphoneFill } from 'react-icons/bs';
import { RiMenuAddFill } from 'react-icons/ri';
import { RiMenuFill } from 'react-icons/ri';
import { BsClipboardData } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import './Sidebar.css';
/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/

const AdminSidebar = ({ show }: any) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [displayedCreateArrowIcon, setDisplayedCreateArrowIcon] = useState<ReactElement>();
  const [displayedEditArrowIcon, setDisplayedEditArrowIcon] = useState<ReactElement>();

  useEffect(() => {
    displayArrowIcon();
  });

  const displayArrowIcon = () => {
    !openCreate ? setDisplayedCreateArrowIcon(<MdOutlineKeyboardArrowRight className="absolute right-0" />) : setDisplayedCreateArrowIcon(<MdOutlineKeyboardArrowDown className="absolute right-0" />);
    !openEdit ? setDisplayedEditArrowIcon(<MdOutlineKeyboardArrowRight className="absolute right-0" />) : setDisplayedEditArrowIcon(<MdOutlineKeyboardArrowDown className="absolute right-0" />);
  };
  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <ul>
        <li>
          <Button className="side-button" onClick={() => setOpenCreate(!openCreate)}>
            <MdAddBox />
            Create New
            {displayedCreateArrowIcon}
          </Button>
          {openCreate && (
            <li>
              <Link to="/new-user" className="drop-link" color="red">
                <BsPersonPlusFill />
                User
              </Link>
              <Link to="/new-department" className="drop-link">
                <RiMenuAddFill />
                Department
              </Link>
              <Link to="/new-annoucenemnt" className="drop-link">
                <BsMegaphoneFill />
                Announcement
              </Link>
              <Link to="/new-employee-of-the-month" className="drop-link">
                <BsFillPersonBadgeFill />
                Employee of the Month
              </Link>
            </li>
          )}
        </li>
        <li>
          <Button className="side-button" onClick={() => setOpenEdit(!openEdit)}>
            <IoMdCreate />
            Edit Exisiting
            {displayedEditArrowIcon}
          </Button>
          {openEdit && (
            <li>
              <Link to="/edit-user" className="drop-link" color="red">
                <BsFillPersonLinesFill />
                User
              </Link>
              <Link to="/edit-department" className="drop-link">
                <RiMenuFill />
                Department
              </Link>
              <Link to="/edit-report" className="drop-link">
                <BsClipboardData />
                Data Report
              </Link>
            </li>
          )}
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
