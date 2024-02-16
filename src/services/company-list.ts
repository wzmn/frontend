import { COMPANY_LISTING } from "constants/api";
import { CompanyDataType } from "type/company";
import { request } from "./http-request";

export const companyList = async (
  params?: Record<any, any>
): Promise<CompanyDataType> => {
  const response = await request<CompanyDataType>({
    url: COMPANY_LISTING,
    params,
  });

  return response.data;
};

export default companyList;
