import axios from 'axios';
axios.defaults.withCredentials = true;

const baseApiUrl = process.env.REACT_APP_DEPLOYMENT_API_URL || 'http://localhost:8080';

const get = (url: string): Promise<any> => {
  return axios.get(baseApiUrl + url);
};

const post = (url: string, obj: any): Promise<any> => {
  return axios.post(baseApiUrl + url, obj);
};

const put = (url: string, obj: any): Promise<any> => {
  return axios.put(baseApiUrl + url, obj);
};

const patch = (url: string, obj: any): Promise<any> => {
  return axios.patch(baseApiUrl + url, obj);
};

export default {
  get,
  post,
  put,
  patch
};
