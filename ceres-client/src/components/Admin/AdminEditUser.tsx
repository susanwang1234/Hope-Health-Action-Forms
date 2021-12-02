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

const AdminEditUser = () => {
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
  const userContext = useContext(UserContext);
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
    const url = '/user/${userId}';
    let editedUser = {
      username: '',
      password: '',
      departmentId: '',
      roleId: ''
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
  const deleteUser = async (userId: number) => {
    const url = '/user/${userId}';
    httpService
      .del(url)
      .then(() => {
        toast.success('User Deleted', { position: 'top-center', autoClose: 5000 });
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };
  const deleteAllUsers = async () => {
    const url = '/user';
    httpService
      .del(url)
      .then(() => {
        toast.success('All Users Deleted', { position: 'top-center', autoClose: 5000 });
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
        <div className="admin-individual-card">Test</div>
        <div className="admin-individual-card">Test2</div>
      </div>
    </div>
  );
};
export default AdminEditUser;
