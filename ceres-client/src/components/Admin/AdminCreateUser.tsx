import { GiHamburgerMenu } from 'react-icons/gi';
import AdminSidebar from '../Sidebar/AdminSidebar';
import AuthService from '../../services/authService';
import logo from '../../images/navlogo.png';
import { UserContext } from '../../UserContext';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../CaseStudySubmit/CaseStudySubmit.css';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';

let newUser;
const AdminCreateUser = () => {
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
  const userContext = useContext(UserContext);
  const [checkMark, SetCheckMark] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Nothing selected');
  const [departmentState, setDepartmentState] = useState({
    departments: []
  });
  const [roleState, setRoleState] = useState({
    roles: []
  });

  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
    return <Redirect to="/" />;
  };
  const onclickCancel = async (event: any) => {
    event.preventDefault();
    window.location.href = '/departments';
  };

  useEffect(() => {
    getDepartments();
  }, [setDepartmentState]);

  const getDepartments = async () => {
    const url = '/department';
    try {
      const response = await httpService.get(url);
      const data = response.data;
      setDepartmentState({
        departments: data
      });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  useEffect(() => {
    getRoles();
  }, [setRoleState]);

  const getRoles = async () => {
    const url = '/role';
    try {
      const response = await httpService.get(url);
      const data = response.data;
      setRoleState({
        roles: data
      });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  // const createUser = async () => {
  //     newUser = {
  //       username: ,
  //       password: ,
  //       departmentId: ,
  //       roleId:
  //     }
  //   const url = '/user';
  //   httpService
  //     .post(url, newUser)
  //     .then(() => {
  //       toast.success('New Employee of the Month Submitted', { position: 'top-center', autoClose: 5000 });
  //       window.location.href = '/departments';
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedDepartment(value);
  };

  return (
    <div>
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button type="submit" onClick={onClickLogOutHandler} className="grey-button top-2% right-2">
          Log Out
        </button>
      </header>
      <div className="flex h-full">
        <AdminSidebar show={showNav} />
      </div>
      <div className="cards-case-study">
        <div className="casestudy-single-card">
          <h2 className="inside-card -mt-10 mb-8">
            <b>Create a New User</b>
          </h2>
          <div className="w-full flex flex-col pt-10">
            <div>
              <input onChange={() => SetCheckMark(!checkMark)} checked={checkMark} type="checkbox" />
              <p>New user is an admin.</p>
            </div>
            <label className="inside-text-case-study">Role</label>
            <select className="minimal">
              <option selected disabled>
                --Select a Role--
              </option>
              {roleState.roles.map((roleName: any) => {
                return <option value={roleName.id}>{roleName.name}</option>;
              })}
            </select>
            <label className="inside-text-case-study">Department</label>
            <select className="minimal" disabled={checkMark} onChange={selectChange}>
              <option selected disabled>
                --Select a Department--
              </option>
              {departmentState.departments.slice(1).map((departmentName: any) => {
                return <option value={departmentName.id}>{departmentName.name}</option>;
              })}
            </select>
            <label className="inside-text-case-study">Username</label>
            <textarea className="response" placeholder="Type here..."></textarea>
            <label className="inside-text-case-study">Password</label>
            <textarea className="response" placeholder="Type here..."></textarea>
            <label className="inside-text-case-study">Repeat Password</label>
            <textarea className="response" placeholder="Type here..."></textarea>
            <button onClick={onclickCancel} className="grey-button bottom-5 left-31">
              Cancel
            </button>
            <button className="blue-button bottom-5 right-20">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminCreateUser;
