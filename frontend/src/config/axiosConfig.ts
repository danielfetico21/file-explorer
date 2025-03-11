import axios from  "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout:5000,
})

axiosConfig.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default axiosConfig