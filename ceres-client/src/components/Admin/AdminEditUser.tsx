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
  const userContext = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [departmentState, setDepartmentState] = useState({
    departments: []
  });
  const [roleState, setRoleState] = useState({
    roles: []
  });
  const [userState, setUserState] = useState({
    users: []
  });
  const [updateUserValues, setUpdateUserValues] = useState({
    updateUsername: '',
    updatePassword: '',
    updateRepeatedPassword: '',
    updateRoleId: '',
    updateDepartmentId: ''
  });
  const [originalUserValues, setOriginalUserValues] = useState({
    originalUsername: '',
    originalPassword: '',
    originalDepartment: '',
    originalRole: '',
    userShown: false,
    userId: 0
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

  const handleChange = (event: any) => {
    //Purpose of replace method is to not allow users to input spaces for usernames and passwords
    setUpdateUserValues({
      ...updateUserValues,
      [event.target.name]: event.target.value.replace(/\s/g, '')
    });

    if (event.target.name === 'updateRoleId') {
      let checkRoleIdValueForAdmim = event.target.value;
      checkRoleIdValueForAdmim === '1' || checkRoleIdValueForAdmim === '2' ? setUserIsAdmin(true) : setUserIsAdmin(false);
    }
  };

  const updateNewValues = () => {
    //Empty form
    if (updateUserValues.updateRoleId === '' && updateUserValues.updateDepartmentId === '' && updateUserValues.updateUsername === '' && updateUserValues.updatePassword === '') {
      toast.error('No savable changes made');
      return;
    }

    if (updateUserValues.updateUsername.length < 5 && updateUserValues.updateUsername !== '') {
      toast.error('Username too short, must be minimum 5 characters');
      return;
    }

    if (updateUserValues.updateUsername.length > 25) {
      toast.error('Username too long, must be maximum 25 characters');
      return;
    }

    if (updateUserValues.updatePassword !== updateUserValues.updateRepeatedPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (updateUserValues.updateRoleId === '') {
      updateUserValues.updateRoleId = originalUserValues.originalRole;
    }

    if (updateUserValues.updateDepartmentId === '') {
      updateUserValues.updateDepartmentId = originalUserValues.originalDepartment;
    }

    //User is an admin
    if (updateUserValues.updateRoleId === '1' || updateUserValues.updateRoleId === '2') {
      updateUserValues.updateDepartmentId = '1';
    }

    if (updateUserValues.updateUsername === '') {
      updateUserValues.updateUsername = originalUserValues.originalUsername;
    }

    if (updateUserValues.updatePassword === '' && updateUserValues.updateRepeatedPassword === '') {
      updateUserValues.updatePassword = originalUserValues.originalPassword;
    }

    editUser(originalUserValues.userId);
  };

  const editUser = async (userId: number) => {
    const url = `/user/${userId}`;
    let editedUser = {
      username: updateUserValues.updateUsername,
      password: updateUserValues.updatePassword,
      departmentId: updateUserValues.updateDepartmentId,
      roleId: updateUserValues.updateRoleId
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

  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
    return <Redirect to="/" />;
  };

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
    setOriginalUserValues({
      ...originalUserValues,
      userShown: false
    });
    setIsOpen(false);
    toast.dismiss();
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
          {originalUserValues.userShown ? (
            <div>
              <h2 className="inside-card -mt-10 mb-8">
                <b>Edit {originalUserValues.originalUsername}</b>
              </h2>
              <div className="w-full flex flex-col pt-10">
                <p>Fields that are left unselected or empty will default to their previously saved values</p>
                <label className="admin-inside-text">Role</label>
                <select className="minimal self-center" name="updateRoleId" value={updateUserValues.updateRoleId} onChange={handleChange}>
                  <option selected>--Select a New Role--</option>
                  {roleState.roles.map((roleName: any) => {
                    return <option value={roleName.id}>{roleName.label}</option>;
                  })}
                </select>
                <label className="admin-inside-text" hidden={userIsAdmin}>
                  Department
                </label>
                <select className="minimal self-center" name="updateDepartmentId" value={updateUserValues.updateDepartmentId} hidden={userIsAdmin} onChange={handleChange}>
                  <option selected>--Select a New Department--</option>
                  {departmentState.departments.slice(1).map((departmentName: any) => {
                    return <option value={departmentName.id}>{departmentName.name}</option>;
                  })}
                </select>
                <label className="admin-inside-text">Username</label>
                <input className="admin-response" name="updateUsername" value={updateUserValues.updateUsername} placeholder="Type new username..." onChange={handleChange}></input>
                <label className="admin-inside-text">Password</label>
                <input
                  className="admin-response"
                  name="updatePassword"
                  value={updateUserValues.updatePassword}
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="Type new password..."
                  onChange={handleChange}
                ></input>
                <label className="admin-inside-text">Repeat Password</label>
                <input
                  className="admin-response"
                  name="updateRepeatedPassword"
                  value={updateUserValues.updateRepeatedPassword}
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="Type new password..."
                  onChange={handleChange}
                ></input>
                <div className="self-center w-50">
                  <input className="float-left mr-2 mt-1" type="checkbox" onChange={togglePassword} />
                  <p>Show password</p>
                </div>
              </div>
              <button className="grey-button bottom-5 left-31" onClick={onClickCancel}>
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
                          <button className="grey-button-popup w-full" onClick={OnClickNo}>
                            No
                          </button>
                          <button className="blue-button-popup w-full" onClick={OnClickYes}>
                            Yes
                          </button>
                        </div>
                      </div>
                    </>
                  }
                  handleClose={togglePopup}
                />
              )}
              <button className="blue-button bottom-5 right-20" onClick={() => updateNewValues()}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2 className="inside-card -mt-10 mb-8">
                <b>Select a User</b>
              </h2>
              <button className="grey-button bottom-5 left-31" onClick={() => (window.location.href = '/departments')}>
                Cancel
              </button>
              <div className="box-inside-for-overflow">
                <ul>
                  {userState.users.map((selectedUser: any) => {
                    if (selectedUser.roleId !== 1 && selectedUser.roleId !== 2) {
                      return (
                        <li className="alternate-background-colours">
                          <label className="admin-inside-text">{selectedUser.username}</label>
                          <button
                            className="gg-pen"
                            onClick={() =>
                              setOriginalUserValues({
                                originalUsername: selectedUser.username,
                                originalPassword: selectedUser.password,
                                originalDepartment: selectedUser.departmentId,
                                originalRole: selectedUser.roleId,
                                userShown: true,
                                userId: selectedUser.id
                              })
                            }
                          />
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
