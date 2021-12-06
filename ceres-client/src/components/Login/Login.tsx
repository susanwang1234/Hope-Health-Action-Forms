import '../../App.css';
import { useForm } from 'react-hook-form';
import Logo from './../../images/Logo.png';
import display from './../../images/CBR_training_March 21.png';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import AuthService from '../../services/authService';
import { toast } from 'react-toastify';
import Popup from '../CaseStudySubmit/PopUpModal/Popup';
import { StringMappingType } from 'typescript';
import httpService from '../../services/httpService';

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

function Login() {
  const userContext = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [usernameForPasswordReset, setUsernameForPasswordReset] = useState<string>('');
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onChange' });

  const postLogin = async (loginUser: any) => {
    const data = await AuthService.login(loginUser);
    const { isAuthenticated } = data;
    if (isAuthenticated) {
      userContext.setUser(data.user);
      userContext.setIsAuthenticated(isAuthenticated);
      console.log("data.user.roleId: " + data.user.roleId);

      if (data.user.roleId != 4) {
        history.push('/departments');
      } else {
        let link = "/dashboard/" + data.user.departmentId.toString();
        console.log("going to: " + link)
        history.push(link);
      }

      
    } else {
      const { msg } = data;
      // do something with error message
      toast.error('Invalid Username or Password', { position: 'top-center' });
    }
  };

  const onSubmit = handleSubmit(({ username, password }) => {
    const user = {
      username,
      password
    };

    // Todo: validate user

    postLogin(user);
  });

  const popUpToEnterUserName = () => {
    setIsOpen(true);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const sendUsernameToResetPassword = async () => {
    let postUsername = { username: usernameForPasswordReset };
    httpService
      .post(`/forgot-password`, postUsername)
      .then(() => {
        setIsOpen(true);
        toast.success('Email Sent!!', { position: 'top-center', autoClose: 5000 });
      })
      .catch((error: any) => {
        console.log(error);
      }); 
  };

  return (
    <div className="flex xl:flex-row flex-col">
      <div className="min-h-screen bg-gray-50 flex flex-col flex-grow">
        <div className="max-w-md w-full mx-auto">
          <div className="logo-container">
            <img src={Logo} alt="Logo" className="logo-image" />
          </div>
        </div>
        <div className="border sign-in-box">
          <div className="sign-in-container">Sign In </div>
          <form action="" className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="" className="input-field-heading">
                Username
              </label>
              <input
                {...register('username', {
                  required: true,
                  minLength: 5,
                  maxLength: 25
                })}
                className="border input-field"
                style={{ borderColor: errors.username ? 'red' : '' }}
                name="username"
                type="text"
              />
            </div>

            <div>
              <label htmlFor="" className="input-field-heading">
                Password
              </label>
              <input {...register('password', { required: true })} name="password" type="password" className="border input-field" />
            </div>
            <button className="clickable-text" onClick={popUpToEnterUserName}>
              Forgot Password?
            </button>
            {isOpen && (
              <Popup
                content={
                  <>
                    <div className="popup_modal flex flex-col">
                      <div className="popup_child pt-2">
                        <label className="w-full text-center font-bold text-lg">Enter the username of the password you would like to retrieve</label>
                      </div>
                      <input className="border input-field" value={usernameForPasswordReset} onChange={(event) => setUsernameForPasswordReset(event.target.value.replace(/\s/g, ''))}></input>
                      <div className="flex w-full mt-10 relative justify-between px-20 space-x-10 pb-2">
                        <button onClick={() => setIsOpen(false)} className="grey-button-popup w-full ">
                          Cancel
                        </button>
                        <button onClick={sendUsernameToResetPassword} className="blue-button-popup w-full">
                          Send
                        </button>
                      </div>
                    </div>
                  </>
                }
                handleClose={togglePopup}
              />
            )}
            <div>
              <button className="transform hover:bg-blue-800 hover:font-bold submit-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden xl:flex">
        <img src={display} alt="Display" className="image" />
      </div>
    </div>
  );
}

export default Login;
