import { GiHamburgerMenu } from 'react-icons/gi';
import AdminSidebar from '../Sidebar/AdminSidebar';
import AuthService from '../../services/authService';
import logo from '../../images/navlogo.png';
import { UserContext } from '../../UserContext';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../CaseStudySubmit/CaseStudySubmit.css';
import '../Admin/Admin.css';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
/*
Cite: https://melvingeorge.me/blog/show-or-hide-password-ability-reactjs
*/

const AdminCreateUser = () => {
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
  const userContext = useContext(UserContext);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [departmentId, setDepartmentId] = useState<string>('Nothing selected');
  const [roleId, setRoleId] = useState<string>('');
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

  const createUser = async () => {
    if (roleId === '') {
      toast.error('Role not selected');
      return;
    }
    if (departmentId === 'Nothing selected') {
      toast.error('Department not selected');
      return;
    }
    if (username === '' || password === '' || repeatedPassword === '') {
      toast.error('Please fill in all fields.');
      return;
    }
    if (username.length < 5) {
      toast.error('Username too short');
      return;
    }
    if (password != repeatedPassword) {
      toast.error('Passwords do not match');
      return;
    }
    let newUser = {
      username: username,
      password: password,
      departmentId: departmentId,
      roleId: roleId
    };
    const url = '/user';
    httpService
      .post(url, newUser)
      .then(() => {
        toast.success('New User Created', { position: 'top-center', autoClose: 5000 });
        window.location.href = '/departments';
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRoleId(value);
    if (value === '1') {
      setUserIsAdmin(true);
      setDepartmentId('1');
      toast.info('Admins do not belong to a specific department');
    } else {
      setUserIsAdmin(false);
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
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
            <label className="admin-inside-text">Role</label>
            <select className="minimal self-center" onChange={selectChange}>
              <option selected disabled>
                --Select a Role--
              </option>
              {roleState.roles.map((roleName: any) => {
                return <option value={roleName.id}>{roleName.label}</option>;
              })}
            </select>
            <label className="admin-inside-text">Department</label>
            <select className="minimal self-center" disabled={userIsAdmin} onChange={(event) => setDepartmentId(event.target.value)}>
              <option selected disabled>
                --Select a Department--
              </option>
              {departmentState.departments.slice(1).map((departmentName: any) => {
                return <option value={departmentName.id}>{departmentName.name}</option>;
              })}
            </select>
            <label className="admin-inside-text">Username</label>
            <input value={username} onChange={(event) => setUsername(event.target.value)} className="admin-response" placeholder="Type here..."></input>
            <label className="admin-inside-text">Password</label>
            <input value={password} type={passwordShown ? 'text' : 'password'} onChange={(event) => setPassword(event.target.value)} className="admin-response" placeholder="Type here..."></input>
            <label className="admin-inside-text">Repeat Password</label>
            <input
              value={repeatedPassword}
              onChange={(event) => setRepeatedPassword(event.target.value)}
              className="admin-response"
              type={passwordShown ? 'text' : 'password'}
              placeholder="Type here..."
            ></input>
            <div className="self-center w-50">
              <input className="float-left mr-2 mt-1" onChange={togglePassword} type="checkbox" />
              <p>Show password</p>
            </div>
            <button onClick={onclickCancel} className="grey-button bottom-5 left-31">
              Cancel
            </button>
            <button onClick={createUser} className="blue-button bottom-5 right-20">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminCreateUser;
