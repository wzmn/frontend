import { APPT_Q } from "constants/api";
import { request } from "services/http-request";
import { WorkTypeQuestionT, WorkTypeRespQuestionT } from "type/global";

export type Questions = Partial<WorkTypeQuestionT> & {
  label?: string;
};

export type QuestionsT = Partial<{
  questions: Questions[];
}>;

export async function fetchQuestionsList(): Promise<QuestionsT> {
  try {
    const response = await request<WorkTypeRespQuestionT>({
      url: APPT_Q,
    });

    const questions: Questions[] = response.data?.results!.map((item) => {
      return {
        label: item.content + " " + "(" + item.id + ")",
        ...item,
      };
    });

    return { questions: questions };
  } catch (error) {
    return {};
  }
}
