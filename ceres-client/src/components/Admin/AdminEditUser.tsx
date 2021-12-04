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
Cite: https://css.gg/pen
*/

const AdminEditUser = () => {
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
  const userContext = useContext(UserContext);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [userShown, setUserShown] = useState<boolean>(false);
  const [state, setState] = useState({
    stateUsername: '',
    statePassword: '',
    stateRepeatedPassword: '',
    stateRoleId: '',
    stateDepartmentId: ''
  });
  let testRoleId: string;
  let testDepartmentId: string;
  let testPasswordId: string;
  let testUserName: string;

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
    const url = `/user/${userId}`;
    let editedUser = {
      username: testUserName,
      password: testPasswordId,
      departmentId: testDepartmentId,
      roleId: testRoleId
    };
    httpService
      .put(url, editedUser)
      .then(() => {
        toast.success('User Edited', { position: 'top-center', autoClose: 5000 });
        window.location.href = '/departments';
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
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const onClickCancel = async (event: any) => {
    setIsOpen(true);
  };

  const OnClickNo = async (event: any) => {
    setIsOpen(false);
  };

  const OnClickYes = async (event: any) => {
    event.preventDefault();
    setUserShown(false);
    setIsOpen(false);
    toast.dismiss();
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
    toast.info('Fields that are left unselected or empty will default to their previously saved values');
  };
  const fillEmptyFieldsWithExisitingFields = () => {
    if (state.stateRoleId === '' && state.stateDepartmentId === '' && state.stateUsername === '' && state.statePassword === '') {
      toast.error('No changes made');
      return;
    }
    testRoleId = state.stateRoleId === '' ? currentUser.currentRole : state.stateRoleId;

    testDepartmentId = state.stateDepartmentId === '' ? currentUser.currentDepartment : state.stateDepartmentId;

    if (state.stateRoleId === '1' || state.stateRoleId === '2') {
      testDepartmentId = '1';
    }

    testUserName = state.stateUsername === '' ? currentUser.currentUsername : state.stateUsername;

    if (state.stateUsername.length < 5 && state.stateUsername !== '') {
      toast.error('Username too short, must be minimum 5 characters');
      return;
    }

    if (state.stateUsername.length > 25) {
      toast.error('Username too long, must be maximum 25 characters');
      return;
    }

    if (state.statePassword !== state.stateRepeatedPassword) {
      toast.error('Passwords do not match');
      return;
    }

    testPasswordId = state.statePassword === '' && state.stateRepeatedPassword === '' ? currentUser.currentPassword : state.statePassword;

    editUser(userId);
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleChange = (event: any) => {
    //Purpose of replace method is to not allow users to input spaces for usernames and passwords
    setState({
      ...state,
      [event.target.name]: event.target.value.replace(/\s/g, '')
    });

    if (event.target.name === 'stateRoleId') {
      let checkRoleIdValueForAdmim = event.target.value;
      checkRoleIdValueForAdmim === '1' || checkRoleIdValueForAdmim == '2' ? setUserIsAdmin(true) : setUserIsAdmin(false);
    }
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
          {userShown ? (
            <div>
              <h2 className="inside-card -mt-10 mb-8">
                <b>Edit {currentUser.currentUsername}</b>
              </h2>
              <div className="w-full flex flex-col pt-10">
                <label className="admin-inside-text">Role</label>
                <select className="minimal self-center" name="stateRoleId" value={state.stateRoleId} onChange={handleChange}>
                  <option selected>--Select a New Role--</option>
                  {roleState.roles.map((roleName: any) => {
                    return <option value={roleName.id}>{roleName.label}</option>;
                  })}
                </select>
                <label hidden={userIsAdmin} className="admin-inside-text">
                  Department
                </label>
                <select className="minimal self-center" hidden={userIsAdmin} name="stateDepartmentId" value={state.stateDepartmentId} onChange={handleChange}>
                  <option selected>--Select a New Department--</option>
                  {departmentState.departments.slice(1).map((departmentName: any) => {
                    return <option value={departmentName.id}>{departmentName.name}</option>;
                  })}
                </select>

                <label className="admin-inside-text">Username</label>
                <input name="stateUsername" value={state.stateUsername} onChange={handleChange} className="admin-response" placeholder="Type new username..."></input>
                <label className="admin-inside-text">Password</label>
                <input
                  name="statePassword"
                  value={state.statePassword}
                  onChange={handleChange}
                  type={passwordShown ? 'text' : 'password'}
                  className="admin-response"
                  placeholder="Type new password..."
                ></input>

                <label className="admin-inside-text">Repeat Password</label>
                <input
                  name="stateRepeatedPassword"
                  value={state.stateRepeatedPassword}
                  onChange={handleChange}
                  className="admin-response"
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="Type new password..."
                ></input>

                <div className="self-center w-50">
                  <input className="float-left mr-2 mt-1" onChange={togglePassword} type="checkbox" />
                  <p>Show password</p>
                </div>
              </div>
              <button onClick={onClickCancel} className="grey-button bottom-5 left-31">
                Cancel
              </button>
              {isOpen && (
                <Popup
                  content={
                    <>
                      <div className="popup_modal flex flex-col">
                        <div className="popup_child pt-2">
                          <p className="w-full text-center font-bold text-lg">Are you sure you want to cancel?</p>
                          <p className="w-full text-center">It will remove all the fields that you have filled!!</p>
                        </div>

                        <div className="flex w-full mt-10 relative justify-between px-20 space-x-10 pb-2">
                          <button onClick={OnClickNo} className="grey-button-popup w-full ">
                            No
                          </button>
                          <button onClick={OnClickYes} className="blue-button-popup w-full">
                            Yes
                          </button>
                        </div>
                      </div>
                    </>
                  }
                  handleClose={togglePopup}
                />
              )}
              <button onClick={() => fillEmptyFieldsWithExisitingFields()} className="blue-button bottom-5 right-20">
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2 className="inside-card -mt-10 mb-8">
                <b>Select a User</b>
              </h2>
              <button onClick={() => (window.location.href = '/departments')} className="grey-button bottom-5 left-31">
                Cancel
              </button>
              <div className="box-inside-for-overflow">
                <ul>
                  {userState.users.map((singleUser: any) => {
                    if (singleUser.roleId !== 1) {
                      return (
                        <li className="alternate-background-colours">
                          <label className="admin-inside-text">{singleUser.username}</label>
                          <button className="gg-pen" onClick={() => updateFields(singleUser.id, singleUser.departmentId, singleUser.roleId, singleUser.password, singleUser.username)} />
                        </li>
                      );
                    }
                    return;
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminEditUser;
