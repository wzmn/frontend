import { WORK_TYPE } from "constants/api";
import { request } from "services/http-request";
import { WorkTypeRespT, WorkTypeT } from "type/global";

export async function fetchWorkTypes(): Promise<WorkTypeT[]> {
  try {
    const response = await request<WorkTypeRespT>({
      url: WORK_TYPE,
    });

    return response.data.results!;
  } catch (error) {
    return [];
  }
}
