import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import SelectBox from "components/selectBox";
import React from "react";
import * as styles from "styles/pages/common.module.scss";
import * as settingStyles from "./styles.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { WorkTypeQuestionT } from "type/global";
import TextButton from "components/text-button";

const questions = [
  { label: "Image", value: "image" },
  { label: "Text", value: "text" },
  { label: "Video", value: "video" },
  { label: "Signature", value: "signature" },
  { label: "File", value: "file" },
  { label: "Multi choice ss", value: "multi_choice_ss" },
  { label: "Multi choice ms", value: "multi_choice_ms" },
];

const QuestionsType = ({ qAData }: { qAData: WorkTypeQuestionT[] }) => {
  const { control, register } = useForm<{
    questions: Partial<WorkTypeQuestionT>[];
  }>({
    defaultValues: {
      questions: qAData,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "questions", // unique name for your Field Array
  });

  return (
    <div>
      <p className={settingStyles.title}>
        Settings/Appointment Questions
        <TextButton
          label="Add Question"
          icon={<FaPlus />}
          onClick={() => {
            append({
              content: "Choose from below",
              question_type: "multi_choice_ss",
            });
          }}
        />
      </p>
      <div className="space-y-16 mb-3">
        {qAData?.map((item, index, array) => {
          return (
            <FormSection
              title="Input Questions"
              style={{ zIndex: Math.abs(index - array.length) }}
            >
              <div className="grow">
                <FormWraper>
                  <div className="relative">
                    {/* <div className={settingStyles.plus}>
              <FaPlus />
            </div> */}

                    <div className={settingStyles.questionGrid}>
                      <Input
                        className="text-sm"
                        placeholder={item?.content || "Type in your Question"}
                      />
                      <SelectBox data={questions} />
                      <RiDeleteBin6Line className={settingStyles.svg} />
                    </div>
                  </div>
                </FormWraper>
              </div>
            </FormSection>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionsType;
