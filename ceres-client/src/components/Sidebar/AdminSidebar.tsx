import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { IoMdArrowDropdown } from 'react-icons/io';
import './Sidebar.css';
/*Citation: https://github.com/mustafaerden/react-admin-dashboard*/

const AdminSidebar = ({ show }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <ul>
        <li>
          <Link to="/employee-of-the-month" className="side-link">
            New Employee of the Month
          </Link>
        </li>
        <li>
          <Link to="/employee-of-the-month" className="side-link">
            Edit Forms
          </Link>
        </li>
        <li>
          <Button className="side-button" onClick={() => setOpen(!open)}>
            <IoMdArrowDropdown />
            Create or Edit Users
          </Button>
          {open && (
            <li>
              <Link to="/employee-of-the-month" className="drop-link" color="red">
                Create new user
              </Link>
              <Link to="/employee-of-the-month" className="drop-link">
                Edit existing user
              </Link>
            </li>
          )}
        </li>
        <li>
          <Button className="side-button" onClick={() => setOpen(!open)}>
            <IoMdArrowDropdown />
            Create or Edit Departments
          </Button>
          {open && (
            <li>
              <Link to="/employee-of-the-month" className="drop-link" color="red">
                Create new department
              </Link>
              <Link to="/employee-of-the-month" className="drop-link">
                Edit existing department
              </Link>
            </li>
          )}
        </li>
        <li></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
