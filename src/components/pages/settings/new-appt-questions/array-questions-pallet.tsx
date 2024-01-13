import Input from "components/input";
import SelectBox from "components/selectBox";
import React, { useEffect, useState } from "react";
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
import { AddQuestionsT } from "type/settings/questions";
import { Switch } from "@headlessui/react";

//AddQuestion is a pattern of form which doest have onSubmit, which will trigger by form which wrapped  AddQuestion
// all the form controlers will be pass as params in AddQuestion
const ArrayQuestionsPallet = ({
  register,
  setValue,
  watch,
  index,
  setEnabled,
  enabled,
}: // useArray,
{
  index: number;
  watch: UseFormWatch<{
    next_questions: AddQuestionsT[];
  }>;
  setValue: UseFormSetValue<{
    next_questions: AddQuestionsT[];
  }>;
  register: UseFormRegister<{
    next_questions: AddQuestionsT[];
  }>;
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  // useArray: UseFieldArrayReturn<
  //   {
  //     questions: AddQuestionsT[];
  //   },
  //   "questions",
  //   "arrayId"
  // >;
}) => {
  // const {} = useArray;

  const qOptions = watch(`next_questions.${index}.options`);
  const qType = watch(`next_questions.${index}.question_type`);

  function deleteOptions(idx: number) {
    const list = [...qOptions];
    list.splice(idx, 1);
    console.log(list);
    setValue(`next_questions.${index}.options`, [...list]);
  }

  useEffect(() => {
    if (checkforMultiChecker.includes(qType!))
      setValue(`next_questions.${index}.options`, [
        { option_text: "Yes" },
        { option_text: "No" },
      ]);
    else setValue(`next_questions.${index}.options`, []);
  }, [qType]);

  return (
    <div>
      {checkforMultiChecker.includes(qType!) && (
        <div className="flex gap-3 items-center mb-4">
          <p className="text-xs">Will have sub questions</p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? "bg-blue-500" : "bg-gray-500"}
          relative inline-flex h-[20px] w-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? "translate-x-3" : "translate-x-0"}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      )}
      <div className="flex gap-3 mt-4">
        <div className="w-80">
          <Input
            placeholder="Enter Text"
            {...register(`next_questions.${index}.content`)}
          />
        </div>
        <div className="w-52">
          <SelectBox
            data={questions}
            placeholder="Select"
            onChange={(e) => {
              setValue(`next_questions.${index}.question_type`, e.value);
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

              setValue(`next_questions.${index}.options`, [...list]);
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
                      `next_questions.${index}.options.${idx}.option_text`
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

export default ArrayQuestionsPallet;
