import { loginInfoType } from '../types/userAccountType';
import axios from 'axios';
axios.defaults.withCredentials = true;

const baseApiUrl = 'http://localhost:8080';

const AuthService = {
  login: (user: loginInfoType): Promise<any> => {
    return axios
      .post(baseApiUrl + '/auth/login', user)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          return error.response.data;
        }
      });
  },

  logout: (): Promise<any> => {
    return axios.get(baseApiUrl + '/auth/logout').then((res) => res.data);
  },

  isAuthenticated: (): Promise<any> => {
    return axios
      .get(baseApiUrl + '/auth/authenticate')
      .then((res) => res.data)
      .catch((error) => {
        return { isAuthenticated: false, user: null };
      });
  }
};

export default AuthService;
