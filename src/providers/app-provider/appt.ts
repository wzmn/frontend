import { APPT_STATUES } from "constants/api";
import { request } from "services/http-request";
import { ApptStateStatus, ApptStatues } from "type/appointment";

export type FetchApptStatus = {
  statusData?: ApptStatues["results"];
  status?: ApptStateStatus;
};

export async function fetchApptStatus(): Promise<FetchApptStatus> {
  try {
    const response = await request<ApptStatues>({
      url: APPT_STATUES,
    });

    const status = {} as ApptStateStatus;

    response?.data?.results?.map((item) => {
      status[item.title] = [];
    });

    return { statusData: response.data?.results, status };
  } catch (error) {
    return {};
  }
}
