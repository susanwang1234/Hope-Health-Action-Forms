import '../../App.css';
import { useForm } from 'react-hook-form';
import Logo from './../../images/Logo.png';
import display from './../../images/CBR_training_March 21.png';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../../UserContext';
import { useEffect } from 'react'


interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

function Login() {
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onChange' });

  const onSubmit = handleSubmit(({ username, password }) => {
    console.log(username, password);
    history.push('/dashboard');
  });

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext){
      userContext.setUser({name: 'Ritika' , department: 'comp science'})
    }
    
  }, [])

  console.log('Username (Login) is ' , userContext.user?.name)
  console.log('Department (Login) is ' , userContext.user?.department)

  return (
    <div className="flex xl:flex-row flex-col" >
      <div className="min-h-screen bg-gray-50 flex flex-col flex-grow">
        <div className="max-w-md w-full mx-auto">
          <div className="logo_container">
            <img src={Logo} alt="Logo" className="logo_image" />
          </div>
        </div>
        <div className="border sign_in_box">
          <div className="sign_in_container">Sign In </div>
          <form action="" className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="" className="input_field_heading">
                Username
              </label>
              <input
                {...register('username', {
                  required: true,
                  minLength: 6,
                  maxLength: 25
                })}
                className="border input_field"
                style={{ borderColor: errors.username ? 'red' : '' }}
                name="username"
                type="text"
              />
              {errors.username && 'Username is invalid'}
            </div>

            <div>
              <label htmlFor="" className="input_field_heading">
                Password
              </label>
              <input {...register('password', { required: true })} name="password" type="password" className="border input_field" />
            </div>
            <div>
              <button className="transform hover:bg-blue-800 hover:font-bold submit_button">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className = "hidden xl:flex">
        <img src={display} alt="Display" className="image" />
      </div>
    </div>
  );
}

export default Login;
