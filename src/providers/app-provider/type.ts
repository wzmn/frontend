import { WorkTypeT } from "type/global";
import { FetchApptStatus } from "./appt";
import { FetchEmpStatus } from "./emp";
import { FetchCompanyStatusT } from "./company";
import { QuestionsT } from "./questions";

export type AppProviderType = {
  appointment: FetchApptStatus;
  workTypes: WorkTypeT[];
  category: WorkTypeT[];
  emp: FetchEmpStatus;
  company: FetchCompanyStatusT;
  questions: QuestionsT;
};
