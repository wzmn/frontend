import Input from "components/input";
import SelectBox from "components/selectBox";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Option, SubQuestionRespT, WorkTypeQuestionT } from "type/global";
import * as styles from "./styles.module.scss";
import Button from "components/button";
import TextButton from "components/text-button";
import { ImSpinner10 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import * as settingStyles from "./styles.module.scss";
import { SUB_Q_CONDITIONS } from "constants/api";
import { request } from "services/http-request";
import { questions } from "./helper";

const Questions = ({
  data,
  appendInParentState,
  setLoading,
}: {
  data: WorkTypeQuestionT;
  appendInParentState: React.Dispatch<
    React.SetStateAction<WorkTypeQuestionT[][]>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { control, register, setValue } = useForm<{
    options: Partial<Option>[];
  }>({
    defaultValues: {
      options: data.options,
    },
  });
  const { fields, append, remove } = useFieldArray({
    keyName: "arrayId",
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "options", // unique name for your Field Array
  });

  async function fetchNestQ(qText: string) {
    try {
      setLoading((prev) => !prev);
      const response = await request<SubQuestionRespT>({
        url: SUB_Q_CONDITIONS,
        params: {
          answer: qText,
          question: data.id,
        },
      });
      !!response.data.results![0]?.next_subquestions &&
        appendInParentState((prev) => [
          ...prev,
          response.data.results![0]?.next_subquestions,
        ]);
    } catch (error) {
    } finally {
      setLoading((prev) => !prev);
    }
  }

  useEffect(() => {
    setValue("options", data.options);
  }, [JSON.stringify(data)]);

  return (
    <div>
      <form className="">
        <div className="flex gap-3">
          <div className="w-80">
            <Input placeholder={data.content} />
          </div>
          <div className="w-52">
            <SelectBox
              data={questions}
              placeholder={data.question_type}
              onChange={(e) => {
                // setValue("question_type", e.value);
              }}
            />
          </div>

          {/* {checkforMultiChecker.includes(data.question_type) && (
              <IoMdAdd
                className={`${settingStyles.svg}`}
                onClick={() => {
                  append({
                    option_text: "",
                  });
                }}
              />
            )} */}
        </div>

        <div className="mt-2">
          {fields?.map((option) => {
            return (
              <div className="flex gap-3">
                {/* {JSON.stringify(option)} */}
                <div className="w-48 mt-2 ">
                  <Input placeholder={option.option_text} />
                </div>
                <TextButton
                  type="button"
                  label="View Sub Questions"
                  className={styles.txtBtn}
                  onClick={() => {
                    fetchNestQ(option.option_text!);
                  }}
                />
                <TextButton
                  type="button"
                  label="Add Questions"
                  className={styles.txtBtn}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-5 items-center mt-4">
          <div className={styles.submitBtn}>
            <Button type="submit" title="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export function QuestionTabWrapper({
  data,
}: {
  data: Array<WorkTypeQuestionT[]>;
}) {
  const [state, setState] = useState<Array<WorkTypeQuestionT[]>>(data);
  const [loading, setLoading] = useState(false);
  function clear(index: number) {
    console.log(index);
    const list = [...state];
    list.splice(index + 1, list.length - 1);
    console.log(list);

    setState(() => [...list]);
  }

  return (
    <>
      {/* <pre>{JSON.stringify(state, null, 4)}</pre> */}
      <div className="mb-3 flex gap-2">
        {state.map((item, index) => {
          return (
            <>
              <p
                className="text-rose-600 text-xs cursor-pointer"
                onClick={() => {
                  clear(index);
                }}
              >
                Q{index + 1}
              </p>{" "}
            </>
          );
        })}
      </div>
      <>
        {loading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ImSpinner10 className="animate-spin text-blue-500" />
          </div>
        ) : (
          state[state.length - 1]?.map((question) => {
            return (
              <div className="mt-5">
                {" "}
                <Questions
                  setLoading={setLoading}
                  data={question}
                  appendInParentState={setState}
                />
              </div>
            );
          })
        )}
      </>
    </>
  );
}

export default Questions;
