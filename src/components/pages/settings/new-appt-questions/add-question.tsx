import Input from "components/input";
import SelectBox from "components/selectBox";
import React, { useEffect } from "react";
import {
  UseFieldArrayReturn,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Option, WorkTypeQuestionT } from "type/global";
import { checkforMultiChecker, questions } from "./helper";
import { IoMdAdd } from "react-icons/io";
import * as settingStyles from "./styles.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AddQuestionsT } from "pages/settings/appointment-questions";

const AddQuestion = ({
  register,
  setValue,
  watch,
  index,
  useArray,
}: {
  index: number;
  watch: UseFormWatch<{
    questions: AddQuestionsT[];
  }>;
  setValue: UseFormSetValue<{
    questions: AddQuestionsT[];
  }>;
  register: UseFormRegister<{
    questions: AddQuestionsT[];
  }>;
  useArray: UseFieldArrayReturn<
    {
      questions: AddQuestionsT[];
    },
    "questions",
    "arrayId"
  >;
}) => {
  const {} = useArray;

  const qOptions = watch(`questions.${index}.options`);
  const qType = watch(`questions.${index}.question_type`);

  function deleteOptions(idx: number) {
    const list = [...qOptions];
    list.splice(idx, 1);
    console.log(list);
    setValue(`questions.${index}.options`, [...list]);
  }

  useEffect(() => {}, [qOptions]);

  return (
    <div>
      {index + " in"}
      <div className="flex gap-3">
        <div className="w-80">
          <Input
            placeholder="Enter Text"
            {...register(`questions.${index}.content`)}
          />
        </div>
        <div className="w-52">
          <SelectBox
            data={questions}
            placeholder="Select"
            onChange={(e) => {
              setValue(`questions.${index}.question_type`, e.value);
            }}
          />
        </div>

        {checkforMultiChecker.includes(qType!) && (
          <IoMdAdd
            className={`${settingStyles.svg}`}
            onClick={() => {
              console.log(qOptions);
              const list = [...qOptions];
              list.push({
                option_text: "",
              });

              setValue(`questions.${index}.options`, [...list]);
            }}
          />
        )}
      </div>

      {checkforMultiChecker.includes(qType!) && (
        <div className="mt-2">
          {qOptions?.map((item, idx: number) => {
            return (
              <div className="flex gap-3" key={idx}>
                {/* {JSON.stringify(option)} */}
                <div className="w-48 mt-2 flex gap-3">
                  <Input
                    placeholder="Add Opt Label"
                    {...register(
                      `questions.${index}.options.${idx}.option_text`
                    )}
                  />

                  <RiDeleteBin6Line
                    className={settingStyles.svg}
                    onClick={() => {
                      console.log(idx);
                      deleteOptions(idx);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AddQuestion;
