import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsPencilSquare, BsMegaphone } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import './Sidebar.css';
/*
 Cite: https://css.gg/chevron-down
 Cite: https://css.gg/mail
 Cite: https://css.gg/user-add
 Cite: https://css.gg/trophy
 Cite: https://css.gg/user-list
*/

const AdminSidebar = ({ show }: any) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <ul>
        <li>
          <Link to="/departments" className="side-link">
            <BsPencilSquare />
            Departments
          </Link>
        </li>
        <li>
          <Button value="create-new" className="side-button" onClick={() => setOpenCreate(!openCreate)}>
            <MdOutlineKeyboardArrowDown />
            Create New
          </Button>
          {openCreate && (
            <li>
              <Link to="/new-user" className="drop-link" color="red">
                <div className="gg-user-add" />
                User
              </Link>
              <Link to="/new-annoucenemnt" className="drop-link">
                <BsMegaphone />
                Announcement
              </Link>
              <Link to="/new-employee-of-the-month" className="drop-link">
                <div className="gg-trophy" />
                Employee of the Month
              </Link>
            </li>
          )}
        </li>
        <li>
          <Button value="edit-exisiting" className="side-button" onClick={() => setOpenEdit(!openEdit)}>
            <MdOutlineKeyboardArrowDown />
            Edit Exisiting
          </Button>
          {openEdit && (
            <li>
              <Link to="/edit-user" className="drop-link" color="red">
                <div className="gg-user-list" />
                User
              </Link>
              <Link to="/edit-emails" className="drop-link">
                <div className="gg-mail" />
                Emails
              </Link>
            </li>
          )}
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
