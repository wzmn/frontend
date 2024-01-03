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
import { IoIosSend, IoMdAdd } from "react-icons/io";
import { useAppContext } from "providers/app-provider";
import ComboBox, { ComboBoxDataT } from "components/combo-box";
import { Questions, QuestionsT } from "providers/app-provider/questions";

const questions = [
  { label: "Image", value: "image" },
  { label: "Text", value: "text" },
  { label: "Video", value: "video" },
  { label: "Signature", value: "signature" },
  { label: "File", value: "file" },
  { label: "Multi choice ss", value: "multi_choice_ss" },
  { label: "Multi choice ms", value: "multi_choice_ms" },
];

const notToInclude = ["image", "video", "signature", "file"];

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
  const [question, setQuestion] = useState<Partial<WorkTypeQuestionT>>(item);

  const { handleSubmit, register, watch, setValue } = useForm<{
    content: string;
    question_type: string;
  }>({
    defaultValues: {
      content: question?.content,
    },
  });

  const {
    control,
    handleSubmit: handleOptionsSubmit,
    register: registerOptions,
    watch: watchOptions,
    setValue: setOptValue,
  } = useForm<{
    options: Option[];
  }>({
    defaultValues: {
      options: question.options,
    },
  });

  const { fields, append, remove } = useFieldArray({
    keyName: "otpId",
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "options", // unique name for your Field Array
  });

  const [deleteLoad, setDeleteLoad] = useState(false);

  const uderRole = UserIdentifyer();

  const id = companyIdFetcher(uderRole);

  const fetchOtps = async () => {
    try {
      const res = await request<WorkTypeQuestionT>({
        url: APPT_Q + question.id,
      });
      setOptValue("options", res.data.options);
      res.data;
    } catch (error) {}
  };

  async function onSubmit(data: any) {
    try {
      if (!id) {
        alert("Please Select Country");
        return;
      }
      const response = await request<WorkTypeQuestionT>({
        url: APPT_Q + (question.id ? question.id + "/" : ""),
        method: question.id ? "patch" : "post",
        data: {
          ...data,
          company: id,
          work_type: question.work_type,
        },
      });
      setQuestion(() => response.data);
      toast.success("added");
    } catch (error) {
      toast.error("failed adding question");
    }
  }

  async function deleteQuestion() {
    try {
      setDeleteLoad((prev) => !prev);
      const response = await request({
        url: APPT_Q + question.id,
        method: "delete",
      });
      toast.success("deleted sucessfully");
      removeField(index);
      console.log(index);
    } catch (error) {
      toast.error("failed adding question");
    } finally {
      setDeleteLoad((prev) => !prev);
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
                placeholder={question?.question_type}
                onChange={(e) => {
                  setValue("question_type", e.value);
                }}
              />
            </div>
            {!deleteLoad ? (
              <RiDeleteBin6Line
                className={settingStyles.svg}
                onClick={() => {
                  if (!!item.id) {
                    deleteQuestion();
                    return;
                  }
                  removeField(index);
                }}
              />
            ) : (
              <ImSpinner10 className={`animate-spin ${settingStyles.svg}`} />
            )}
            <button type="submit">
              <IoIosSend className={`${settingStyles.svg}`} />
            </button>

            {question.question_type === "multi_choice_ss" && (
              <IoMdAdd
                className={`${settingStyles.svg}`}
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
          {question.question_type?.includes("multi")
            ? fields?.map((optionItem, index, array) => {
                return (
                  <>
                    <Options
                      fetchOtps={fetchOtps}
                      qId={question.id!}
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
  fetchOtps,
  option,
  index,
  remove,
  qId,
}: {
  fetchOtps: () => Promise<void>;
  option: Option;
  index: number;
  remove: any;
  qId: number;
}) {
  const { questions: QList } = useAppContext();

  const filteredQlist = QList.questions?.filter(
    (item) => item.id !== qId && !notToInclude.includes(item?.question_type!)
  );

  const { control, register, handleSubmit, setValue } = useForm<{
    option_text: string;
    next_question_id: string;
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
      console.log(data);
      // return;
      const response = await request({
        url: APPT_Q_OPT + `${option.id ? String(option.id) + "/" : ""}`,
        method: option.id ? "patch" : "post",
        data: {
          ...data,
          question: qId,
        },
      });
      await fetchOtps();
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
          <ComboBox<Questions>
            placeholder={
              filteredQlist?.find(
                (item) => item.id === Number(option?.next_question?.id)
              )?.content
            }
            data={filteredQlist!}
            handleSelect={(e) => {
              console.log(e.id);

              setValue("next_question_id", String(e.id));
            }}
            // onChange={debounce(handleEmployeeList)}
          />
        </div>
        {!deleteLoad ? (
          <RiDeleteBin6Line
            className={settingStyles.svg}
            onClick={() => {
              if (!!option.id) {
                deleteOption();
                return;
              }
              remove(index);
            }}
          />
        ) : (
          <ImSpinner10 className={`animate-spin ${settingStyles.svg}`} />
        )}

        <button type="submit">
          <IoIosSend className={`${settingStyles.svg}`} />
        </button>
      </div>
    </form>
  );
}

export default QuestionsType;
