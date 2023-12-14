import { ApptStateStatus, ApptStatues } from "type/appointment";
import { WorkTypeT } from "type/global";

// export

export type FetchApptStatus = {
  statusData?: ApptStatues;
  status?: ApptStateStatus;
};

export type AppProviderType = {
  appointment: FetchApptStatus;
  workTypes: WorkTypeT[];
};
