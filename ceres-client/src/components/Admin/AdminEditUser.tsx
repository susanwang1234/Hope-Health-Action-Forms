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
import Popup from '../CaseStudySubmit/PopUpModal/Popup';
/*
Cite: https://melvingeorge.me/blog/show-or-hide-password-ability-reactjs
*/

const AdminEditUser = () => {
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
  const userContext = useContext(UserContext);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [username, setUsername] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [userShown, setUserShown] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [departmentId, setDepartmentId] = useState<string>('');
  const [roleId, setRoleId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState({
    currentUsername: '',
    currentPassword: '',
    currentDepartment: '',
    currentRole: ''
  });
  const [departmentState, setDepartmentState] = useState({
    departments: []
  });
  const [roleState, setRoleState] = useState({
    roles: []
  });
  const [userState, setUserState] = useState({
    users: []
  });

  useEffect(() => {
    getUsers();
  }, [setUserState]);

  const getUsers = async () => {
    const url = '/user';
    try {
      const response = await httpService.get(url);
      const data = response.data;
      setUserState({
        users: data
      });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const editUser = async (userId: number) => {
    console.log(roleId);
    console.log(departmentId);
    console.log(username);
    console.log(password);
    const url = `/user/${userId}`;
    let editedUser = {
      username: username,
      password: password,
      departmentId: departmentId,
      roleId: roleId
    };
    httpService
      .put(url, editedUser)
      .then(() => {
        toast.success('User Edited', { position: 'top-center', autoClose: 5000 });
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
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
  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
    return <Redirect to="/" />;
  };
  const updateFields = (currentId: number, currentDepartment: string, currentRole: string, currentPassword: string, currentUsername: string) => {
    setUserId(currentId);
    setCurrentUser({
      currentDepartment: currentDepartment,
      currentRole: currentRole,
      currentUsername: currentUsername,
      currentPassword: currentPassword
    });
    setUserShown(true);
  };
  const fillEmptyFieldsWithExisitingFields = () => {
    if (roleId === '' && departmentId === '' && username === '' && password === '') {
      toast.error('No changes made');
      return;
    }
    if (roleId === '') {
      setRoleId(currentUser.currentRole);
      console.log('hello');
    }
    if (roleId === '1' || roleId === '2') {
      setDepartmentId('1');
    }
    if (departmentId === '') {
      setDepartmentId(currentUser.currentDepartment);
      console.log('hello1');
    }
    if (username === '') {
      setUsername(currentUser.currentUsername);
      console.log('hello2');
    }
    if (username.length < 5 && username !== '') {
      toast.error('Username too short' + username.length);
      return;
    }
    if (password !== repeatedPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password === '' && repeatedPassword === '') {
      setPassword(currentUser.currentPassword);
    }
    console.log(roleId);
    console.log(departmentId);
    console.log(username);
    console.log(password);
  };
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRoleId(value);
    if (value === '1' || value === '2') {
      setUserIsAdmin(true);
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
      <div className="admin-cards">
        <div className="admin-individual-card">
          <h2 className="inside-card">Select a User</h2>
          <ul>
            {userState.users.map((singleUser: any) => {
              if (singleUser.roleId !== 1) {
                return (
                  <li>
                    <h2>{singleUser.username}</h2>
                    <button onClick={() => updateFields(singleUser.id, singleUser.departmentId, singleUser.roleId, singleUser.password, singleUser.username)}>Edit</button>
                  </li>
                );
              }
              return;
            })}
          </ul>
          <h1>{username}</h1>
        </div>
        <div className="admin-individual-card">
          {userShown ? (
            <div>
              <h2 className="inside-card -mt-10 mb-8">
                <b>Edit User</b>
              </h2>
              <div className="w-full flex flex-col pt-10">
                <label className="admin-inside-text">Role</label>
                <select className="minimal self-center" onChange={selectChange}>
                  <option selected disabled>
                    --Select a New Role--
                  </option>
                  {roleState.roles.map((roleName: any) => {
                    return <option value={roleName.id}>{roleName.label}</option>;
                  })}
                </select>
                <label hidden={userIsAdmin} className="admin-inside-text">
                  Department
                </label>
                <select className="minimal self-center" hidden={userIsAdmin} onChange={(event) => setDepartmentId(event.target.value)}>
                  <option selected disabled>
                    --Select a New Department--
                  </option>
                  {departmentState.departments.slice(1).map((departmentName: any) => {
                    return <option value={departmentName.id}>{departmentName.name}</option>;
                  })}
                </select>
                <label className="admin-inside-text">Username</label>
                <input value={username} onChange={(event) => setUsername(event.target.value)} className="admin-response" placeholder={username}></input>
                <label className="admin-inside-text">Password</label>
                <input
                  value={password}
                  type={passwordShown ? 'text' : 'password'}
                  onChange={(event) => setPassword(event.target.value)}
                  className="admin-response"
                  placeholder="Type new password..."
                ></input>
                <label className="admin-inside-text">Repeat Password</label>
                <input
                  value={repeatedPassword}
                  onChange={(event) => setRepeatedPassword(event.target.value)}
                  className="admin-response"
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="Type new password..."
                ></input>
                <div className="self-center w-50">
                  <input className="float-left mr-2 mt-1" onChange={togglePassword} type="checkbox" />
                  <p>Show password</p>
                </div>
              </div>
              <p>Fields that are left unselected or empty will default to their previous selections.</p>
              <button onClick={() => setUserShown(false)} className="grey-button">
                Cancel
              </button>
              <button onClick={() => fillEmptyFieldsWithExisitingFields()} className="blue-button">
                Save
              </button>
            </div>
          ) : (
            <p>Select a User from the List</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminEditUser;
