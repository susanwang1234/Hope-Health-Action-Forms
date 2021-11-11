import { loginInfoType } from '../types/userAccountType';
import httpService from './httpService';

const baseApiUrl = process.env.REACT_APP_DEPLOYMENT_API_URL || 'http://localhost:8080';

const AuthService = {
  login: (user: loginInfoType): Promise<any> => {
    return httpService
      .post('/auth/login', user)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          return error.response.data;
        }
      });
  },

  logout: (): Promise<any> => {
    return httpService.get('/auth/logout').then((res) => res.data);
  },

  isAuthenticated: (): Promise<any> => {
    console.log(baseApiUrl);
    return httpService
      .get('/auth/authenticate')
      .then((res) => res.data)
      .catch((error) => {
        return { isAuthenticated: false, user: null };
      });
  }
};

export default AuthService;
