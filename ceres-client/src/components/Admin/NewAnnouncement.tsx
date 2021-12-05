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
  /*
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const [announcement, setAnnouncement] = useState<string>('');

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
    const url = `/messages`;
    if (announcement.trim() === '') {
      toast.error('Please write an announcement.');
      return;
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    try {
      httpService.post(url, null, config).then((response) => {
        createAnnouncement(response.data[0].id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  
  const createAnnouncement = async (id: number) => {
    const url = `/messages/2`;

    let newAnnouncement = {
      departmentId: user?.departmentId,
      author: user?.id,
      messageContent: announcement
    };

    httpService
      .put(url, newAnnouncement)
      .then(() => {
        toast.success('New announcement posted', { position: 'top-center', autoClose: 5000 });
        window.location.href = '/announcements';
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
              <label className="inside-text-case-study">Post your announcement here</label>
              <textarea value={announcement} onChange={(event) => setAnnouncement(event.target.value)} className="response" style={{ height: '600px' }} placeholder="Type here..."></textarea>
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
  */
};
export default NewAnnouncement;
