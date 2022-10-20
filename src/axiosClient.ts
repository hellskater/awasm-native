import axios from 'axios';

// Axios common config

const axiosClient = axios.create({
  baseURL: '/'
});

export default axiosClient;
