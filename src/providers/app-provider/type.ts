import { ApptStateStatus, ApptStatues } from "type/appointment";

// export

export type FetchApptStatus = {
  statusData?: ApptStatues;
  status?: ApptStateStatus;
};

export type AppProviderType = {
  appointment: FetchApptStatus;
};
