import { useContext, useEffect, useState } from 'react';
import logo from '../../images/navlogo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import AdminSidebar from '../Sidebar/AdminSidebar';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import '../CaseStudySubmit/CaseStudySubmit.css';
import '../../App.css';
import '../Admin/Admin.css';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
/*
Cite: https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
*/

const AdminEmailForPasswordReset = () => {
  const userContext = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);
  const [newEmail, setNewEmail] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [adminEmails, setAdminEmails] = useState({
    emails: []
  });

  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
    return <Redirect to="/" />;
  };
  const onClickCancel = async (event: any) => {
    event.preventDefault();

    window.location.href = '/departments';
  };

  useEffect(() => {
    getEmails();
  }, [setAdminEmails]);
  const getEmails = async () => {
    const url = `/email`;
    try {
      const response = await httpService.get(url);
      const data = response.data;
      setAdminEmails({
        emails: data
      });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const createNewEmail = async () => {
    const url = `/email`;
    let newEmailAddress = { email: newEmail };
    httpService
      .post(url, newEmailAddress)
      .then(() => {
        toast.success('Email has been created');
        window.location.href = `/edit-emails`;
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const editAnEmail = async (emailId: number) => {
    const url = `/email/${emailId}`;
    let editedEmail = { email: editEmail };
    httpService
      .put(url, editedEmail)
      .then(() => {
        toast.success('Email has been edited');
        window.location.href = `/edit-emails`;
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const deleteAnEmail = async (emailId: number) => {
    const url = `/email/${emailId}`;
    httpService
      .del(url)
      .then(() => {
        toast.error('Email has been deleted');
        window.location.href = `/edit-emails`;
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const editCurrentEmail = (index: number) => {
    let editDisabled = (document.getElementById('input-id-' + index) as HTMLInputElement).disabled;
    (document.getElementById('input-id-' + index) as HTMLInputElement).disabled = !editDisabled;
    if (editDisabled) {
      (document.getElementById('input-id-' + index) as HTMLInputElement).focus();
    }
  };
  const validateEmailAddress = (index: number, emailId?: number) => {
    let emailAddress = (document.getElementById('input-id-' + index) as HTMLInputElement).value;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (emailRegex.test(emailAddress)) {
      if (emailId) {
        editAnEmail(emailId);
      } else {
        createNewEmail();
      }
    } else {
      toast.error('Invalid email address');
      return;
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
      <div className="casestudy-background">
        <div className="cards-case-study">
          <div className="casestudy-single-card">
            <h2 className="inside-card -mt-10 mb-8">
              <b>Emails to Reset Passwords</b>
            </h2>
            <div className="box-inside-for-overflow">
              <ul>
                {adminEmails.emails.map((Emails: any, index: number) => {
                  return (
                    <li className="alternate-background-colours">
                      <p>
                        <input className="admin-inner-input-text" id={'input-id-' + index} defaultValue={Emails.email} disabled={true} onChange={(event) => setEditEmail(event.target.value)}></input>
                        <button className="gg-pen" onClick={() => editCurrentEmail(index)} />
                        <button className="gg-close" onClick={() => deleteAnEmail(Emails.id)} />
                        <button className="button-text" onClick={() => validateEmailAddress(index, Emails.id)}>
                          Save
                        </button>
                      </p>
                    </li>
                  );
                })}
                <li className="alternate-background-colours">
                  <p>
                    <input className="admin-inner-input-text" id={'input-id-' + adminEmails.emails.length} defaultValue={''} onChange={(event) => setNewEmail(event.target.value)}></input>
                    <button className="button-text" onClick={() => validateEmailAddress(adminEmails.emails.length)}>
                      Submit
                    </button>
                  </p>
                </li>
              </ul>
            </div>
            <button onClick={onClickCancel} className="grey-button bottom-5 left-31">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminEmailForPasswordReset;
