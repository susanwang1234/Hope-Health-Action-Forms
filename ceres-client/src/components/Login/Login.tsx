import '../../App.css';
import { useForm } from 'react-hook-form';
import Logo from './../../images/Logo.png';
import display from './../../images/CBR_training_March 21.png';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import AuthService from '../../services/authService';

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

function Login() {
  const userContext = useContext(UserContext);
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
      history.push('/dashboard');
    } else {
      const { msg } = data;
      // do something with error message
    }
  };

  const onSubmit = handleSubmit(({ username, password, remember }) => {
    const user = {
      username,
      password
    };

    // Todo: validate user

    postLogin(user);
  });

  if(userContext.user?.username != null){
    
    console.log('(Login Page)  Username is ' , userContext.user?.username)
    console.log('(Login Page) ID is ' , userContext.user?.id)
    console.log('(Login Page) Department Id is ' , userContext.user?.departmentId)
    console.log('(Login Page) Role ID is ' , userContext.user?.roleId)
  }




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
              {errors.username && 'Username is invalid'}
            </div>

            <div>
              <label htmlFor="" className="input-field-heading">
                Password
              </label>
              <input {...register('password', { required: true })} name="password" type="password" className="border input-field" />
            </div>
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
