import axios from 'axios';

// Axios common config

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/'
});

export default axiosClient;
