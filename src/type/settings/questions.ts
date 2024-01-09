import { Option, WorkTypeQuestionT } from "type/global";

export type AddQuestionsT = Partial<Omit<WorkTypeQuestionT, "options">> & {
  options: Partial<Option>[];
};
