import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

export const fetcher = async (method, path, data) => {
  const config = {
    method: method,
    url: path,
    data: data,
  };

  const res = await axios(config);

  return res.data;
};