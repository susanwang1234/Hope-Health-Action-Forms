import axios from 'axios';

const baseApiUrl = 'http://localhost:8080';

const get = (url: string) => {
  return axios.get(baseApiUrl + url);
};

const post = (url: string) => {
  return axios.post(baseApiUrl + url);
};

const put = (url: string) => {
  return axios.put(baseApiUrl + url);
};

const patch = (url: string) => {
  return axios.patch(baseApiUrl + url);
};

export default {
  get,
  post,
  put,
  patch
};
