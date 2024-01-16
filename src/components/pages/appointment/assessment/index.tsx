import Checkbox from "components/checkbox";
import Input from "components/input";
import { checkforMultiChecker } from "components/pages/settings/new-appt-questions/helper";
import TextButton from "components/text-button";
import { QUESTIONS_ANS, SUB_Q_CONDITIONS } from "constants/api";
import React, { useState } from "react";
import { UseFormRegister, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { request } from "services/http-request";
import {
  Option,
  QAnsRespT,
  QAnsResultT,
  SubQuestionRespT,
  SubQuestionT,
} from "type/global";

const AnsQuestion = ({
  data,
  formParent = "parent",
}: {
  data: QAnsResultT;
  formParent?: string;
}) => {
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

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit(onSubmit)(e);
      }}
      className=""
    >
      <p className="">{data?.question?.content}</p>
      <div className="">
        {checkforMultiChecker.includes(data?.question?.question_type) ? (
          <div className="mt-2">
            {fields?.map((option, index) => {
              return (
                <Options
                  option={option}
                  company={data?.question?.company}
                  work_type={data?.question?.work_type}
                  //   fetchNestQ={fetchNestQ}
                  parentQId={data?.id}
                  register={register}
                  index={index}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-64">
            <Input placeholder={data?.answer} />
          </div>
        )}
      </div>
      {/* <button type="submit">submit</button> */}
    </form>
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
  const [subQ, setSubQ] = useState<QAnsResultT[]>();

  async function fetchQuestionsAns(id: number) {
    try {
      const response = await request<QAnsRespT>({
        url: QUESTIONS_ANS,
        params: {
          answer: id,
        },
      });
      setSubQ(() => response?.data?.results);
    } catch (error) {
      toast("Problem fetching questions");
    }
  }

  async function fetchNestQ(qText: string) {
    try {
      setLoading((prev) => !prev);
      const response = await request<SubQuestionRespT>({
        url: SUB_Q_CONDITIONS,
        params: {
          answer__in: qText,
          question: parentQId,
        },
      }).then((res) => {
        if (res?.data?.results?.length! > 0) {
          fetchQuestionsAns(res?.data?.results?.[0]?.id!);
        }
      });
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
          <Checkbox
            type="radio"
            checked={option?.option_text === "Yes"}
            id={option?.option_text}
            {...register(`options`)}
            label={<p className="">{option?.option_text}</p>}
            value={option?.option_text}
          />

          {/* //   <Input
        //     placeholder={option.option_text}
        //     {...register(`options.${index}.option_text`)}
        //   /> */}
        </div>
        <TextButton
          type="button"
          label="View Sub Questions"
          // className={styles.txtBtn}
          onClick={() => {
            fetchNestQ(option?.option_text!);
          }}
        />
        {/* <TextButton
          type="button"
          label={showAddQ ? "Hide" : "Add Questions"}
          // className={styles.txtBtn}
          onClick={() => {
            setShowAddQ((prev) => !prev);
          }}
        /> */}
      </div>

      {
        !!subQ &&
          subQ?.map((item, key) => {
            return (
              <div className="my-5 ml-5 " key={key}>
                <AnsQuestion data={item} />
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
