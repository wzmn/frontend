import Checkbox from "components/checkbox";
import Input from "components/input";
import { checkforMultiChecker } from "components/pages/settings/new-appt-questions/helper";
import TextButton from "components/text-button";
import { DOCUMENTS_ANS, QUESTIONS_ANS, SUB_Q_CONDITIONS } from "constants/api";
import React, { useEffect, useState } from "react";
import { UseFormRegister, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { request } from "services/http-request";
import {
  DocumentsAnsRespT,
  DocumentsAnsT,
  Option,
  QAnsRespT,
  QAnsResultT,
  SubQuestionRespT,
  SubQuestionT,
} from "type/global";

import * as locStyles from "./styles.module.scss";
import ViewDocuments from "./view-documents";

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
      // options: data.question.options,
      options: [],
    },
  });
  // const { fields, append, remove } = useFieldArray({
  //   keyName: "arrayId",
  //   control, // control props comes from useForm (optional: if you are using FormContext)
  //   name: "options", // unique name for your Field Array
  // });

  function onSubmit(data: any) {
    console.log(data);
  }

  const fId = Math.random();

  return (
    <form
      id={String(fId)}
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit(onSubmit)(e);
      }}
      className={`pl-5 ${
        data?.question?.options?.length > 0 &&
        data?.question?.has_sub_question &&
        "border-l border-blue-500"
      }`}
    >
      <p className="font-semibold">
        <span>{`Q)`}</span>{" "}
        <span className={locStyles.qBorder}>{data?.question?.content}</span>
      </p>
      <div className="">
        {checkforMultiChecker.includes(data?.question?.question_type) ? (
          <div className="mt-3">
            {data?.question?.options?.map((option, index) => {
              return (
                <Options
                  selectedOpt={data.selected_options}
                  option={option}
                  company={data?.question?.company}
                  work_type={data?.question?.work_type}
                  //   fetchNestQ={fetchNestQ}
                  parentQId={data?.question.id}
                  register={register}
                  index={index}
                  hasSubQ={data.question.has_sub_question}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-64 mt-3">
            <Input placeholder={data?.answer} disabled={true} />
          </div>
        )}
      </div>
      {/* <button form={String(fId)} type="submit">
        submit
      </button> */}
    </form>
  );
};

function Options({
  selectedOpt,
  option,
  //   fetchNestQ,
  company,
  work_type,
  parentQId,
  register,
  index,
  hasSubQ,
}: {
  hasSubQ: boolean;
  selectedOpt: Option[];
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
  const [docAns, setDocAns] = useState<DocumentsAnsT[]>();

  async function fetchQuestionsAns() {
    try {
      const response = await request<QAnsRespT>({
        url: QUESTIONS_ANS,
        params: {
          question__parent_question: parentQId,
          question__parent_question__subquestion_conditions__answer:
            option.option_text,
        },
      });
      setSubQ(() => response?.data?.results);
    } catch (error) {
      toast("Problem fetching questions");
    }
  }

  async function fetchDocQuestionsAns() {
    try {
      const response = await request<DocumentsAnsRespT>({
        url: DOCUMENTS_ANS,
        params: {
          question__parent_question: parentQId,
          question__parent_question__appointmentanswers__answer:
            option.option_text,
        },
      });
      setDocAns(() => response?.data?.results!);
    } catch (error) {
      toast("Problem fetching questions");
    }
  }

  useEffect(() => {
    hasSubQ &&
      selectedOpt.some((item) => item.id === option.id) &&
      fetchQuestionsAns();
    hasSubQ &&
      selectedOpt.some((item) => item.id === option.id) &&
      fetchDocQuestionsAns();
  }, []);

  return (
    <>
      <div className="flex gap-3">
        <div className="w-48 mt-1 ">
          <Checkbox
            disabled={true}
            // type="check"
            defaultChecked={selectedOpt.some((item) => item.id === option.id)}
            id={option?.option_text}
            {...register(`options.${index}`)}
            label={<p className="">{option?.option_text}</p>}
            value={option?.option_text}
          />
        </div>
      </div>

      {!!subQ &&
        subQ?.map((item, key) => {
          return (
            <div className="my-6 ml-10  " key={key}>
              <AnsQuestion data={item} />
            </div>
          );
        })}

      {!!docAns &&
        docAns?.map((item, key) => {
          return (
            <div className="my-6 ml-10  " key={key}>
              <ViewDocuments data={item} />
              {/* {item?.question?.content} */}
            </div>
          );
        })}
    </>
  );
}

export default AnsQuestion;
