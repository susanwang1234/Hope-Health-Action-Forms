import axios from 'axios';

const baseApiUrl = 'http://localhost:8080';

const get = (url: string) => {
  return axios.get(baseApiUrl + url);
};

const post = (url: string, obj: any) => {
  return axios.post(baseApiUrl + url, obj);
};

const put = (url: string, obj: any) => {
  return axios.put(baseApiUrl + url, obj);
};

const patch = (url: string, obj: any) => {
  return axios.patch(baseApiUrl + url, obj);
};

export default {
  get,
  post,
  put,
  patch
};
