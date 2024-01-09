import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AddQuestionsT } from "type/settings/questions";

const AddSubQuestions = () => {
  const { control, handleSubmit, register, setValue, watch } = useForm<{
    questions: AddQuestionsT[];
  }>({
    defaultValues: {
      questions: [
        {
          content: "",
          question_type: "text",
          options: [{ option_text: "add" }, { option_text: "add" }],
        },

        {
          content: "",
          question_type: "text",
          options: [{ option_text: "add" }, { option_text: "add" }],
        },
      ],
    },
  });

  const useArray = useFieldArray({
    keyName: "arrayId",
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "questions", // unique name for your Field Array
  });

  const qOptions = watch(`questions.${index}.options`);
  const qType = watch(`questions.${index}.question_type`);

  return <div>AddSubQuestions</div>;
};

export default AddSubQuestions;
