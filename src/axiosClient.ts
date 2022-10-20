import axios from 'axios';

// Axios common config

const axiosClient = axios.create({
  baseURL: 'https://awasm-native.vercel.app/'
});

export default axiosClient;
