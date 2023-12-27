import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import SelectBox from "components/selectBox";
import React, { useEffect, useState } from "react";
import * as styles from "styles/pages/common.module.scss";
import * as settingStyles from "./styles.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { Option, WorkTypeQuestionT } from "type/global";
import TextButton from "components/text-button";
import Button from "components/button";
import { request } from "services/http-request";
import { APPT_Q, APPT_Q_OPT } from "constants/api";
import companyIdFetcher from "services/company-id-fetcher";
import UserIdentifyer from "services/user-identifyer";
import { toast } from "react-toastify";
import { ImSpinner10 } from "react-icons/im";

const questions = [
  { label: "Image", value: "image" },
  { label: "Text", value: "text" },
  { label: "Video", value: "video" },
  { label: "Signature", value: "signature" },
  { label: "File", value: "file" },
  { label: "Multi choice ss", value: "multi_choice_ss" },
  { label: "Multi choice ms", value: "multi_choice_ms" },
];

const QuestionsType = ({
  qAData,
  title,
  workType,
}: {
  qAData: WorkTypeQuestionT[];
  title?: string;
  workType?: number;
}) => {
  const { control, register, setValue } = useForm<{
    questions: Partial<WorkTypeQuestionT>[];
  }>({
    // defaultValues: {
    //   questions: qAData,
    // },
  });
  const { fields, append, remove } = useFieldArray({
    keyName: "arrayId",
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "questions", // unique name for your Field Array
  });

  useEffect(() => {
    setValue("questions", qAData);
  }, [qAData]);

  return (
    <div>
      <p className={settingStyles.title}>
        {title}
        <TextButton
          label="Add Question"
          icon={<FaPlus />}
          onClick={() => {
            append({
              content: "",
              question_type: "",
              work_type: workType,
            });
          }}
        />
      </p>
      <div className="space-y-16 mb-3">
        {fields?.map((item, index, array) => {
          return (
            <FormSection
              title="Input Questions"
              style={{ zIndex: Math.abs(index - array.length) }}
            >
              <div className="grow">
                <Question item={item} removeField={remove} index={index} />
              </div>
            </FormSection>
          );
        })}
      </div>
    </div>
  );
};

function Question({
  item,
  removeField,
  index,
}: {
  item: Partial<WorkTypeQuestionT>;
  removeField: any;
  index: number;
}) {
  const { handleSubmit, register, watch, setValue } = useForm<{
    content: string;
    question_type: string;
  }>({
    defaultValues: {
      content: item?.content,
    },
  });

  const {
    control,
    handleSubmit: handleOptionsSubmit,
    register: registerOptions,
    watch: watchOptions,
  } = useForm<{
    options: Option[];
  }>({
    defaultValues: {
      options: item.options,
    },
  });

  const { fields, append, remove } = useFieldArray({
    keyName: "otpId",
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "options", // unique name for your Field Array
  });

  const uderRole = UserIdentifyer();

  const id = companyIdFetcher(uderRole);

  async function onSubmit(data: any) {
    try {
      if (!id) {
        alert("Please Select Country");
        return;
      }
      const response = await request({
        url: APPT_Q,
        method: "post",
        data: {
          ...data,
          company: id,
          work_type: item.work_type,
        },
      });
      toast.success("added");
    } catch (error) {
      toast.error("failed adding question");
    }
  }

  return (
    <FormWraper>
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <div className={settingStyles.questionGrid}>
            <div className="w-52">
              <Input {...register("content")} className="text-sm" />
            </div>
            <div className="w-52">
              <SelectBox
                data={questions}
                placeholder={item?.question_type}
                onChange={(e) => {
                  setValue("question_type", e.value);
                }}
              />
            </div>
            <RiDeleteBin6Line
              className={settingStyles.svg}
              onClick={() => {
                removeField(index);
              }}
            />

            <Button
              title="send"
              type="submit"
              className={settingStyles.button}
            />
            {item.options?.length! > 0 && (
              <TextButton
                label="add"
                type="button"
                className={settingStyles.button}
                onClick={() => {
                  append({
                    option_text: "",
                  } as Option);
                }}
              />
            )}
          </div>
        </form>

        <div className="mt-5 ml-3">
          {item.question_type?.includes("multi")
            ? fields?.map((optionItem, index, array) => {
                return (
                  <>
                    <Options
                      qId={item.id!}
                      option={optionItem}
                      index={index}
                      remove={remove}
                    />
                  </>
                );
              })
            : null}
        </div>
      </>
    </FormWraper>
  );
}

function Options({
  option,
  index,
  remove,
  qId,
}: {
  option: Option;
  index: number;
  remove: any;
  qId: number;
}) {
  const { control, register, handleSubmit, setValue } = useForm<{
    option_text: string;
    question_type: string;
  }>({
    defaultValues: {
      option_text: option?.option_text,
    },
  });

  const [deleteLoad, setDeleteLoad] = useState(false);

  async function deleteOption() {
    try {
      setDeleteLoad((prev) => !prev);
      const response = await request({
        url: APPT_Q_OPT + option.id,
        method: "delete",
      });
      toast.success("deleted sucessfully");
      remove(index);
    } catch (error) {
      toast.error("failed adding question");
    } finally {
      setDeleteLoad((prev) => !prev);
    }
  }

  async function onSubmit(data: any) {
    try {
      const response = await request({
        url: APPT_Q_OPT,
        method: "post",
        data: {
          ...data,
          question: qId,
        },
      });
      toast.success("added");
    } catch (error) {
      toast.error("failed adding question");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`mb-2 ${settingStyles.questionGrid}`}>
        <div className="w-52">
          <Input {...register(`option_text`)} className="text-sm" />
        </div>
        <div className="w-52">
          <SelectBox
            data={questions}
            onChange={(e) => {
              setValue("question_type", e.value);
            }}
          />
        </div>
        {!deleteLoad ? (
          <RiDeleteBin6Line
            className={settingStyles.svg}
            onClick={() => {
              if (!option.id) remove(index);

              deleteOption();
            }}
          />
        ) : (
          <ImSpinner10 className={`animate-spin ${settingStyles.svg}`} />
        )}
        <span>
          <Button title="send" className={settingStyles.button} />
        </span>
      </div>
    </form>
  );
}

export default QuestionsType;
