import Input from "components/input";
import SelectBox from "components/selectBox";
import TextButton from "components/text-button";
import { SUB_Q_CONDITIONS } from "constants/api";
import React, { useEffect, useState } from "react";
import { UseFormRegister, useFieldArray, useForm } from "react-hook-form";
import { ImSpinner10 } from "react-icons/im";
import { request } from "services/http-request";
import { Option, SubQuestionRespT, WorkTypeQuestionT } from "type/global";
import AddSubQuestions from "./add-sub-questions";
import { questions } from "./helper";
import * as styles from "./styles.module.scss";

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
  const { control, register, setValue, handleSubmit } = useForm<{
    options: Partial<Option>[];
    content: string;
    question_type: string;
  }>({
    defaultValues: {
      content: data.content,
      question_type: data.question_type,
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
      let qArr: WorkTypeQuestionT[] = [];
      response.data?.results!?.length > 0 &&
        response.data?.results!?.map((nxtQList) => {
          qArr.push(...nxtQList.next_subquestions);
        });
      appendInParentState((prev) => [...prev, qArr]);
    } catch (error) {
    } finally {
      setLoading((prev) => !prev);
    }
  }

  function onSubmit(data: any) {
    console.log(data);
  }

  useEffect(() => {
    setValue("options", data.options);
  }, [JSON.stringify(data)]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex gap-3">
          <div className="w-80">
            <Input
              disabled={true}
              {...register("content")}
              placeholder={data.content}
            />
          </div>
          <div className="w-52">
            <SelectBox
              disabled={true}
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
          {fields?.map((option, index) => {
            return (
              <Options
                option={option}
                company={data.company}
                work_type={data.work_type}
                fetchNestQ={fetchNestQ}
                parentQId={data.id}
                register={register}
                index={index}
                hasSubQ={data.has_sub_question}
              />
            );
          })}
        </div>
        {/* <div className="flex gap-5 items-center mt-4">
          <div className={styles.submitBtn}>
            <Button type="submit" title="Submit" />
          </div>
        </div> */}
      </form>
    </div>
  );
};

function Options({
  option,
  fetchNestQ,
  company,
  work_type,
  parentQId,
  register,
  index,
  hasSubQ,
}: {
  option: Partial<Option>;
  fetchNestQ: (e: any) => Promise<void>;
  company: number;
  work_type: number;
  parentQId: number;
  hasSubQ: boolean;
  register: UseFormRegister<{
    options: Partial<Option>[];
    content: string;
    question_type: string;
  }>;
  index: number;
}) {
  const [showAddQ, setShowAddQ] = useState(false);

  return (
    <>
      <div className="flex gap-3">
        {/* {JSON.stringify(option)} */}
        <div className="w-48 mt-2 ">
          <Input
            disabled={true}
            placeholder={option.option_text}
            {...register(`options.${index}.option_text`)}
          />
        </div>
        {hasSubQ && (
          <>
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
              label={showAddQ ? "Hide" : "Add Questions"}
              className={styles.txtBtn}
              onClick={() => {
                setShowAddQ((prev) => !prev);
              }}
            />
          </>
        )}
      </div>

      {showAddQ && (
        <div className="ml-10 my-8">
          <AddSubQuestions
            qText={option.option_text!}
            company={company}
            work_type={work_type}
            parentQId={parentQId}
            setShowAddQ={setShowAddQ}
          />
        </div>
      )}
    </>
  );
}

// QuestionTabWrapper this function is use to wrap a question in a tab view ans also control loading state
//all the question and nested questions will be wraped in it
export function QuestionTabWrapper({
  qIndex,
  data,
}: {
  qIndex: number;
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
            <p
              key={index}
              className="text-rose-600 text-xs cursor-pointer"
              onClick={() => {
                clear(index);
              }}
            >
              Q{index === 0 ? qIndex + 1 : qIndex + 1 + "." + index}
            </p>
          );
        })}
      </div>
      <>
        {loading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ImSpinner10 className="animate-spin text-blue-500" />
          </div>
        ) : (
          state[state.length - 1]?.map((question, index) => {
            return (
              <div className="mt-5" key={index}>
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
