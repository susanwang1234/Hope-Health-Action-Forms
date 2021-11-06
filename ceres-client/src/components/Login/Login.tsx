import '../../App.css';
import { useForm } from 'react-hook-form';
import Logo from './../../images/Logo.png';
import display from './../../images/CBR_training_March 21.png';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useEffect } from 'react';
import authService from '../../services/authService';

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

const logout = async () => {
  try {
    const response = await authService.logout();
    console.log(response.data);
  } catch (error: any) {
    console.log(error);
  }
};

function Login() {
  let history = useHistory();

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const userContext = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onChange' });

  const postLogin = async (loginUser: any) => {
    const data = await authService.login(loginUser);
    const { isAuthenticated } = data;
    if (isAuthenticated) {
      // history.push('/dashboard');
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

  useEffect(() => {
    if (userContext) {
      userContext.setUser({ name: 'Ritika', department: 'comp science' });
    }
  }, []);

  console.log('Username (Login) is ', userContext.user?.name);
  console.log('Department (Login) is ', userContext.user?.department);

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
