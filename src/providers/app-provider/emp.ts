import { EMPLOYEE_STATUS } from "constants/api";
import { useAuthContext } from "providers/auth-provider";
import { request } from "services/http-request";
import { EmpStateStatus, EmpStatusRespT, EmpStatusT } from "type/employee";

export type FetchEmpStatus = {
  statusData?: EmpStatusRespT["results"];
  status?: Partial<EmpStateStatus>;
};

export async function fetchEmpStatus(
  params: Record<any, any> = {}
): Promise<FetchEmpStatus> {
  try {
    const response = await request<EmpStatusRespT>({
      url: EMPLOYEE_STATUS,
      params: {
        limit: 30,
        ...params,
      },
    });

    const status = {} as EmpStateStatus;

    response?.data?.results?.map((item) => {
      status[item?.title] = [];
    });

    return { statusData: response.data?.results, status };
  } catch (error) {
    return {};
  }
}
