import axios from "axios"
import {BASE_URL} from "./apiPaths.js"

const axiosInstance = axios.create({
  baseURL : BASE_URL,
  timeout : 120000,
  headers:{
    "Content-Type" : "application/json",
    Accept : "application/json",
  },
});



//Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



//Response Interceptor
// axiosInstance.interceptors.response.use((response) => {
//   return response;
// },(error) => {
//   if(error.response){
//     if(error.response.status === 401){
//       window.location.href = "/";
//     }
//     else if(error.response.status === 500){
//       console.error('Server error. Please try again later');
//     }
//   }
//   else if(error.code === "ECONNABORTED"){
//     console.error("Request Timeout. Please try again");
//   }

//   return Promise.reject(error);
// });
// axiosInstance.js - Enhanced Response Interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 429 (Rate Limit) and 503 (Service Unavailable)
    if (
      (error.response?.status === 429 || error.response?.status === 503) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Wait before retry (from backend retryAfter header or default 60s)
      const retryAfter = error.response?.data?.retryAfter || 60;
      console.log(`⏳ Retrying after ${retryAfter} seconds...`);

      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));

      return axiosInstance(originalRequest);
    }

    // Handle 401 (Unauthorized)
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    
    // Handle 500 (Server Error)
    else if (error.response?.status === 500) {
      console.error("Server error. Please try again later");
    }

    // Handle timeout
    else if (error.code === "ECONNABORTED") {
      console.error("Request Timeout. Please try again");
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;