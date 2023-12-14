import { WorkTypeT } from "type/global";
import { FetchApptStatus } from "./appt";
import { FetchEmpStatus } from "./emp";
import { FetchCompanyStatusT } from "./company";

export type AppProviderType = {
  appointment: FetchApptStatus;
  workTypes: WorkTypeT[];
  emp: FetchEmpStatus;
  company: FetchCompanyStatusT;
};
