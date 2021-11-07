import React from 'react';
import ReactDOM from 'react-dom';
import './components/Login/Login.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
