import Button from "components/button";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AddQuestionsT } from "type/settings/questions";
import ArrayQuestionsPallet from "./array-questions-pallet";
import * as settingStyles from "./styles.module.scss";
import TextButton from "components/text-button";
import { FaPlus } from "react-icons/fa";
import * as styles from "./styles.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { request } from "services/http-request";
import { toast } from "react-toastify";
import { APPT_Q, SUB_Q_CONDITIONS } from "constants/api";
import { InferType, array, boolean, mixed, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkforMultiChecker } from "./helper";

const schemaNestQuestion = object({
  next_questions: array()
    .of(
      object({
        has_sub_question: boolean(),
        is_sub_question: boolean(),
        content: string().trim().required("required"),
        question_type: string().trim().required("required"),
        company: number(),
        work_type: number(),
        options: array().when("question_type", ([question_type], schema) => {
          if (checkforMultiChecker.includes(question_type))
            return schema
              .of(
                object({
                  option_text: string().trim().required("required"),
                })
              )
              .min(1, "You need at least 1 option tag")
              .required("options required");
          return schema.of(
            object({
              option_text: string().trim(),
            })
          );
        }),
        // options: array()
        // .of(
        //   object({
        //     option_text: string().trim(),
        //   })
        // )
        //   .min(1, "You need at least 1 question")
        //   .required("options required"),
      })
    )
    .min(1, "You need at least 1 question")
    .required("question required"),
});

export type SchemaNestQuestionT = InferType<typeof schemaNestQuestion>;

const AddSubQuestions = ({
  company,
  work_type,
  qId,
  qText,
  parentQId,
}: any) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<SchemaNestQuestionT>({
    resolver: yupResolver(schemaNestQuestion),
    defaultValues: {
      next_questions: [
        {
          has_sub_question: false,
          is_sub_question: true,
          content: "",
          question_type: "",
          options: [],
          company,
          work_type,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    keyName: "arrayId",
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "next_questions", // unique name for your Field Array
  });

  async function onSubmit(data: AddQuestionsT) {
    console.log(data, "dataaaa");
    return;
    try {
      const response = await request({
        url: SUB_Q_CONDITIONS,
        method: "post",
        data: {
          ...data,
          question_id: parentQId,
          answer: qText,
        },
      });
      toast.success("added");
      // await refetch();
    } catch (error) {
      toast.error("failed adding question");
    }
  }

  return (
    <div className="">
      <div className=" flex justify-end">
        <TextButton
          label="Add Question"
          icon={<FaPlus />}
          onClick={() => {
            append({
              content: "",
              question_type: "text",
              options: [],
            });
            // addNewQ();
            // setViewModal((prev) => !prev);
          }}
        />
      </div>

      <form>
        {fields.map((question, index) => (
          <div className="flex gap-2" key={index}>
            <ArrayQuestionsPallet
              key={index}
              index={index}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              // useArray={useArray}
            />

            <RiDeleteBin6Line
              className={styles.subOptSvg}
              onClick={() => {
                // deleteOptions(idx);
                remove(index);
              }}
            />
          </div>
        ))}

        <div className={settingStyles.submitBtn}>
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit as any)}
            form="nest"
            type="submit"
            title="send"
            className="mt-2"
          />
        </div>
      </form>
    </div>
  );
};

export default AddSubQuestions;
