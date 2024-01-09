import Badge from "components/badge";
import Checkbox from "components/checkbox";
import Input from "components/input";
import { APPT_Q, SUB_Q_CONDITIONS } from "constants/api";
import React, { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { request } from "services/http-request";
import {
  Option,
  SubQuestionRespT,
  SubQuestionT,
  WorkTypeQuestionT,
} from "type/global";

const mutiChecker = ["multi_choice_ss", "multi_choice_ms"];

const Question = ({ data }: { data: WorkTypeQuestionT }) => {
  useEffect(() => {
    console.log("main questions");
  }, []);

  return (
    <>
      <div
        className={`${
          mutiChecker.includes(data.question_type) && "border-l-2"
        }`}
      >
        <div className="w-96">
          <Input placeholder={data.content} />
          {mutiChecker.includes(data.question_type) && (
            <div className="mt-2 ml-2">
              {data.options.map((item, key) => {
                return (
                  <div className="mt-1 flex gap-3 flex-col" key={key}>
                    <NestedQuestions data={item} parentId={data.id} />
                    {/* <div className="flex">
                      <Checkbox
                        type="radio"
                        id={item.option_text}
                        label={<p>{item.option_text}</p>}
                        disabled
                        name="same"
                        value={item.option_text}
                      />

                      <Badge label="Load more" />
                    </div> */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function NestedQuestions({
  data,
  parentId,
}: {
  data: Option;
  parentId: number;
}) {
  const [subQ, setSubQ] = useState<SubQuestionT[]>();
  const [loading, setLoading] = useState(false);

  async function fetchNestQ(qText: string) {
    try {
      setLoading((prev) => !prev);
      const response = await request<SubQuestionRespT>({
        url: SUB_Q_CONDITIONS,
        params: {
          answer: qText,
          question: parentId,
        },
      });
      setSubQ(() => response.data.results);
    } catch (error) {
    } finally {
      setLoading((prev) => !prev);
    }
  }

  useEffect(() => {
    console.log("nested questions");
  }, []);

  return (
    <div className="">
      <div className="flex">
        <Checkbox
          type="radio"
          id={data.option_text}
          label={<p>{data.option_text}</p>}
          //   disabled
          name="same"
          value={data.option_text}
        />

        {loading ? (
          <div className="ml-5 mt-1">
            <ImSpinner10 className="animate-spin text-blue-500" />
          </div>
        ) : (
          <Badge
            label="Load more"
            className="cursor-pointer"
            onClick={() => {
              fetchNestQ(data.option_text);
            }}
          />
        )}
      </div>
      {!!subQ &&
        subQ?.[0]?.next_subquestions?.map((item, key) => {
          return (
            <div className="my-5 ml-5" key={key}>
              <Question data={item} />
            </div>
          );
        })}
    </div>
  );
}

export default Question;
