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

const NewAnnouncement = () => {
  
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const [announcement, setAnnouncement] = useState<string>('');
  const [departmentId, setDepartmentId] = useState<string>('Nothing selected');
  const [departmentState, setDepartmentState] = useState({
    departments: []
  });

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

const saveAnnouncement = async () => {
  const urlAdd = `/messages`;
  if (announcement.trim() === '' || departmentId === 'Nothing selected') {
    toast.error('Please fill in all the fields.');
    return;
  }

  const config = {
      departmentId: departmentId,
      author: user?.username,
      messageContent: announcement
    }

  httpService
    .post(urlAdd, config)
    .then(() => {
      alert("Your new announcement has been added.");
      window.location.href = '/new-announcement';
    })
    .catch((error: any) => {
      console.log(error);
      toast.error(error.response.data.error);
    });
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
            <b>Post Announcement</b>
          </h2>
          <div className="announcement">
            <div className="w-full flex flex-col pt-10">
            <label className="admin-inner-text">
              Department
            </label>
            <select className="minimal self-center" onChange={(event) => setDepartmentId(event.target.value)}>
              <option id="dept" selected>--Select a Department--</option>
              {departmentState.departments.slice(1).map((departmentName: any) => {
                return <option value={departmentName.id}>{departmentName.name}</option>;
              })}
            </select>
              <label className="inside-text-case-study self-center">Post your announcement here</label>
              <textarea id="announcement" value={announcement} onChange={(event) => setAnnouncement(event.target.value)} className="response" style={{ height: '600px' }} placeholder="Type here..."></textarea>
              <button onClick={onclickCancel} className="grey-button bottom-5 left-31">
                Cancel
              </button>
              <button onClick={saveAnnouncement} className="blue-button bottom-5 right-20">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};
export default NewAnnouncement;
