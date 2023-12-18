import { EmployeeDataType } from "type/employee";
import { request } from "./http-request";
import { EMPLOYEE_LISTING } from "constants/api";

export const employeeList = async (
  params?: Record<any, any>
): Promise<EmployeeDataType> => {
  const response = await request<EmployeeDataType>({
    url: EMPLOYEE_LISTING,
    params,
  });

  return response.data;
};

export default employeeList;
