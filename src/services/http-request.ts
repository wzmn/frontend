import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import { AxiosExceptStatueReg } from "constants/regex";
import Axios from "settings/Axios";

export type AxiosInstanceConfig = Omit<AxiosRequestConfig, "baseURL">;

export const request = async <T>(
  config: AxiosInstanceConfig
): Promise<AxiosResponse<T>> => {
  let response: AxiosResponse;

  try {
    response = await Axios(config);
    // if (AxiosExceptStatueReg.test(String(response.status))) {
    console.log("sucessfully passed");
    return response;
    // }
    // return response;
  } catch (error: any | AxiosError) {
    console.log("api request failed");
    throw error;
  }
};
