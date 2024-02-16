import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginResType, UseLocalStorageP1Type } from "type/auth";

const notToReload = ["/login/", "/change-password/"];

const Axios: AxiosInstance = axios.create({
  baseURL: process.env.API_URL + "/api",
  // timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
});

// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    if (
      !(
        getItem<LoginResType | string>("user") + "" === "undefined" ||
        getItem<LoginResType | string>("user") + "" === "null"
      )
    ) {
      const user = getItem<LoginResType>("user");
      config.headers.Authorization = "Bearer " + user?.access;
      // Do something before request is sent
    } else {
      delete config.headers.Authorization;
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
      let pathname =
        typeof window !== "undefined" ? window.location.pathname : "";

      if (notToReload.includes(pathname)) return Promise.reject(error);
      setItem("user", "null");
      window.location.replace("/login");
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export function getItem<T = any>(key: UseLocalStorageP1Type): T {
  return JSON.parse(localStorage.getItem(key) + "");
}

export function setItem(key: UseLocalStorageP1Type, val: string) {
  return localStorage.setItem(key, val);
}

export default Axios;
