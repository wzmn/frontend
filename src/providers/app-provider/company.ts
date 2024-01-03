import { COMPANY_STATUS } from "constants/api";
import { request } from "services/http-request";
import { CompanyStateStatus, CompanyStatus } from "type/company";

export type FetchCompanyStatusRespT = {
  statuses?: CompanyStatus[];
};

export type FetchCompanyStatusT = {
  status: Partial<CompanyStateStatus>;
};

export async function fetchCompanyStatus(): Promise<FetchCompanyStatusT> {
  try {
    const response = await request<FetchCompanyStatusRespT>({
      url: COMPANY_STATUS,
    });

    const status: Partial<CompanyStateStatus> = {};

    response.data?.statuses?.map((item) => {
      status[item] = [];
    });

    return { status };
  } catch (error) {
    return {} as FetchCompanyStatusT;
  }
}
