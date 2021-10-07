import React from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import Logo from './images/Logo.png';
import display from './images/CBR_training_March 21.png';

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onChange' });

  const onSubmit = handleSubmit(({ username, password, remember }) => {
    console.log(username, password, remember);
  });

  return (
    <div className="flex">
      <div className="min-h-screen bg-gray-50 flex flex-col flex-grow">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center font-medium text-xl ">
            <img src={Logo} alt="Logo" className="object-contain h-48 w-full" />
          </div>
        </div>
        <div className="max-w-md w-9/12 mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-xl shadow-2xl">
          <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Sign In </div>
          <form action="" className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="" className="text-sm font-bold text-gray-600 block">
                Username
              </label>
              <input
                {...register('username', {
                  required: true,
                  minLength: 6,
                  maxLength: 25
                })}
                style={{ borderColor: errors.username ? 'red' : '' }}
                name="username"
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.username && 'Username is invalid'}
            </div>

            <div>
              <label htmlFor="" className="text-sm font-bold text-gray-600 block">
                Password
              </label>
              <input {...register('password', { required: true })} name="password" type="password" className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input {...register('remember', { required: false })} name="remember" type="checkbox" className="h-4 w-4 text-blue-300 rounded" />
                <label htmlFor="" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <div>
                <a href="/#" className="font-medium text-sm text-blue-500">
                  Forgot Password
                </a>
              </div>
            </div>
            <div>
              <button className="w-full py-2 px-4 transition-all transform duration-300 ease-in bg-blue-600 hover:bg-blue-800 font-medium hover:font-bold rounded-md text-white text-sm">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <img src={display} alt="Display" className="object-fill h-screen w-full" />
      </div>
    </div>
  );
}

export default App;

