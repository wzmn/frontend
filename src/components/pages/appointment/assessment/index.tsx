import Input from "components/input";
import { checkforMultiChecker } from "components/pages/settings/new-appt-questions/helper";
import TextButton from "components/text-button";
import { SUB_Q_CONDITIONS } from "constants/api";
import React, { useState } from "react";
import { UseFormRegister, useFieldArray, useForm } from "react-hook-form";
import { request } from "services/http-request";
import {
  Option,
  QAnsResultT,
  SubQuestionRespT,
  SubQuestionT,
} from "type/global";

const AnsQuestion = ({ data }: { data: QAnsResultT }) => {
  const { control, register, setValue, handleSubmit } = useForm<{
    options: Partial<Option>[];
    content: string;
    question_type: string;
  }>({
    defaultValues: {
      content: data.question.content,
      question_type: data.question.question_type,
      options: data.question.options,
    },
  });
  const { fields, append, remove } = useFieldArray({
    keyName: "arrayId",
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "options", // unique name for your Field Array
  });

  return (
    <div>
      <p className="">{data.question.content}</p>
      <div className="">
        {checkforMultiChecker.includes(data.question.question_type) ? (
          <div className="mt-2">
            {fields?.map((option, index) => {
              return (
                <Options
                  option={option}
                  company={data.question.company}
                  work_type={data.question.work_type}
                  //   fetchNestQ={fetchNestQ}
                  parentQId={data.id}
                  register={register}
                  index={index}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-64">
            <Input placeholder={data.answer} />
          </div>
        )}
      </div>
    </div>
  );
};

function Options({
  option,
  //   fetchNestQ,
  company,
  work_type,
  parentQId,
  register,
  index,
}: {
  option: Partial<Option>;
  //   fetchNestQ: (e: any) => Promise<void>;
  company: number;
  work_type: number;
  parentQId: number;
  register: UseFormRegister<{
    options: Partial<Option>[];
    content: string;
    question_type: string;
  }>;
  index: number;
}) {
  const [showAddQ, setShowAddQ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subQ, setSubQ] = useState<SubQuestionT[]>();

  async function fetchNestQ(qText: string) {
    try {
      setLoading((prev) => !prev);
      const response = await request<SubQuestionRespT>({
        url: SUB_Q_CONDITIONS,
        params: {
          answer_in: qText,
          question: parentQId,
        },
      });
      setSubQ(() => response.data.results);
    } catch (error) {
    } finally {
      setLoading((prev) => !prev);
    }
  }

  return (
    <>
      <div className="flex gap-3">
        {/* {JSON.stringify(option)} */}
        <div className="w-48 mt-2 ">
          <Input
            placeholder={option.option_text}
            {...register(`options.${index}.option_text`)}
          />
        </div>
        <TextButton
          type="button"
          label="View Sub Questions"
          // className={styles.txtBtn}
          onClick={() => {
            fetchNestQ(option.option_text!);
          }}
        />
        <TextButton
          type="button"
          label={showAddQ ? "Hide" : "Add Questions"}
          // className={styles.txtBtn}
          onClick={() => {
            setShowAddQ((prev) => !prev);
          }}
        />
      </div>

      {showAddQ &&
        !!subQ &&
        subQ?.[0]?.next_subquestions?.map((item, key) => {
          return (
            <div className="my-5 ml-5" key={key}>
              {/* <AnsQuestion data={subQ?.[0]?.next_subquestions!} /> */}
            </div>
          );
        })
        // <div className="ml-10 my-8">
        //
        // </div>
      }
    </>
  );
}

export default AnsQuestion;
