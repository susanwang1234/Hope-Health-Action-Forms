import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import './Sidebar.css';

const AdminSidebar = ({ show }: any) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <ul>
        <li>
          <Button value="create-new" className="side-button" onClick={() => setOpenCreate(!openCreate)}>
            Create New
          </Button>
          {openCreate && (
            <li>
              <Link to="/new-user" className="drop-link" color="red">
                User
              </Link>
              <Link to="/new-department" className="drop-link">
                Department
              </Link>
              <Link to="/new-annoucenemnt" className="drop-link">
                Announcement
              </Link>
              <Link to="/new-employee-of-the-month" className="drop-link">
                Employee of the Month
              </Link>
            </li>
          )}
        </li>
        <li>
          <Button value="edit-exisiting" className="side-button" onClick={() => setOpenEdit(!openEdit)}>
            Edit Exisiting
          </Button>
          {openEdit && (
            <li>
              <Link to="/edit-user" className="drop-link" color="red">
                User
              </Link>
              <Link to="/edit-department" className="drop-link">
                Department
              </Link>
              <Link to="/edit-report" className="drop-link">
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
