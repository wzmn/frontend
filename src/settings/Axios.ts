import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginResType } from "type/auth";

const Axios: AxiosInstance = axios.create({
  baseURL: process.env.API_URL + "/api",
  // timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
});

// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    if (!(localStorage.getItem("user") === 'undefined')){
      const user = JSON.parse(localStorage.getItem("user") + "") as LoginResType;
      config.headers.Authorization = "Bearer " + user?.access;
      // Do something before request is sent
    }
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
Axios.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      // let pathname =
      //   typeof window !== "undefined" ? window.location.pathname : "";
      console.log("401");
      // if (pathname === "/login/") return;
      // localStorage.setItem("user", "null");
      // window.location.replace("/login");
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default Axios;
