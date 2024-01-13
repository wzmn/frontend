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

const AddSubQuestions = ({ company, work_type, qId, qText }: any) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<{
    next_questions: AddQuestionsT[];
  }>({
    defaultValues: {
      next_questions: [
        {
          has_sub_question: false,
          is_sub_question: true,
          content: "",
          question_type: "text",
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

  const [enabled, setEnabled] = useState(false);

  async function onSubmit(data: AddQuestionsT) {
    try {
      const response = await request({
        url: SUB_Q_CONDITIONS,
        method: "post",
        data: {
          question_id: qId,
          answer: qText,
          ...data,
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
      <div className="mt-5 flex justify-end">
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
              setEnabled={setEnabled}
              enabled={enabled}
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
