import { COMPANY_STATUS, EMPLOYEE_STATUS } from "constants/api";
import { request } from "services/http-request";
import { CompanyStateStatus, CompanyStatus } from "type/company";
import { EmpStateStatus, EmpStatusRespT, EmpStatusT } from "type/employee";

export type FetchCompanyStatusRespT = {
  statuses?: CompanyStatus[];
};

export type FetchCompanyStatusT = {
  status: CompanyStateStatus;
};

export async function fetchCompanyStatus(): Promise<FetchCompanyStatusT> {
  try {
    const response = await request<FetchCompanyStatusRespT>({
      url: COMPANY_STATUS,
    });

    const status = {} as CompanyStateStatus;

    response.data?.statuses?.map((item) => {
      status[item] = [];
    });

    return { status };
  } catch (error) {
    return {} as FetchCompanyStatusT;
  }
}
