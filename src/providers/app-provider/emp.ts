import { EMPLOYEE_STATUS } from "constants/api";
import { request } from "services/http-request";
import { EmpStateStatus, EmpStatusRespT, EmpStatusT } from "type/employee";

export type FetchEmpStatus = {
  statusData?: EmpStatusRespT["results"];
  status?: Partial<EmpStateStatus>;
};

export async function fetchEmpStatus(): Promise<FetchEmpStatus> {
  try {
    const response = await request<EmpStatusRespT>({
      url: EMPLOYEE_STATUS,
    });

    const status = {} as EmpStateStatus;

    response?.data?.results?.map((item) => {
      status[item.title] = [];
    });

    return { statusData: response.data?.results, status };
  } catch (error) {
    return {};
  }
}
