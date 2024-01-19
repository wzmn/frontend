import { CATEGORY } from "constants/api";
import { request } from "services/http-request";
import { WorkTypeRespT, WorkTypeT } from "type/global";

export async function fetchCategory(): Promise<WorkTypeT[]> {
  try {
    const response = await request<WorkTypeRespT>({
      url: CATEGORY,
    });

    return response.data.results!;
  } catch (error) {
    return [];
  }
}
