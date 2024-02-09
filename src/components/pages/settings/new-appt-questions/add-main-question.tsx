import { Switch } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import Input from "components/input";
import SelectBox from "components/selectBox";
import { APPT_Q } from "constants/api";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import * as commonStyles from "styles/pages/common.module.scss";
import { InferType, array, boolean, object, string } from "yup";
import { checkforMultiChecker, questions } from "./helper";
import * as styles from "./styles.module.scss";

// this component to create just to handle adding main question
//single question at a time

const schemaMainQ = object({
  content: string().trim().required("required"),
  question_type: string().trim().required("required"),
  is_required: boolean(),
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
});

type SchemaMainQ = InferType<typeof schemaMainQ>;

const AddMainQuestion = ({
  workType,
  refetch,
  index,
  deleteQ,
}: {
  workType: string;
  refetch: () => Promise<void>;
  index: number;
  deleteQ: (e: number) => void;
}) => {
  const [enabled, setEnabled] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SchemaMainQ>({
    resolver: yupResolver(schemaMainQ),
    defaultValues: {},
  });

  const params = new URLSearchParams(location.search);
  const companyId = params.get("companyId");

  const qType = watch("question_type");
  const options = watch("options");

  async function onSubmit(data: SchemaMainQ) {
    try {
      const response = await request({
        url: APPT_Q,
        method: "post",
        data: {
          ...data,
          company: companyId,
          work_type: workType,
          has_sub_question: enabled,
          is_sub_question: false,
          is_required: isRequired,
        },
      });
      MsgToast("Question added successfully", "success");
      await refetch();
      deleteQ(index);
    } catch (error) {
      console.log("inside error");
      MsgToast("failed adding question", "error");
    }
  }

  function addOptions() {
    const list = [...options!];
    list.push({ option_text: "" });
    setValue("options", [...list]);
  }

  function deleteOptions(index: number) {
    const list = [...options!];
    list.splice(index, 1);
    setValue("options", [...list]);
  }

  useEffect(() => {
    if (checkforMultiChecker.includes(qType!))
      setValue("options", [{ option_text: "Yes" }, { option_text: "No" }]);
    else setValue("options", []);
  }, [qType]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

      <div className="flex gap-3 items-center mb-4">
        <p className="text-xs">is requires</p>
        <Switch
          checked={isRequired}
          onChange={setIsRequired}
          className={`${isRequired ? "bg-blue-500" : "bg-gray-500"}
          relative inline-flex h-[20px] w-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${isRequired ? "translate-x-3" : "translate-x-0"}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>

      <div className="flex gap-3">
        <div className="w-80">
          <Input
            placeholder="Enter Text"
            {...register(`content`)}
            errormessage={errors.content?.message}
          />
        </div>
        <div className="w-52">
          <SelectBox
            data={questions}
            placeholder="Select"
            onChange={(e) => {
              setValue(`question_type`, e.value);
            }}
          />

          <p className={commonStyles.errorMessage}>
            {errors.question_type?.message}
          </p>
        </div>

        {checkforMultiChecker.includes(qType!) && (
          <IoMdAdd
            className={`${styles.svg}`}
            onClick={() => {
              addOptions();
            }}
          />
        )}
      </div>

      {checkforMultiChecker.includes(qType!) && (
        <div className="mt-2">
          {options?.map((item, idx: number) => {
            return (
              <div className="flex gap-3" key={idx}>
                {/* {JSON.stringify(option)} */}
                <div className="w-48 mt-2 flex gap-3">
                  <Input
                    placeholder="Add Opt Label"
                    {...register(`options.${idx}.option_text`)}
                    errormessage={
                      (errors.options?.[idx] as any)?.option_text?.message
                    }
                  />

                  <RiDeleteBin6Line
                    className={styles.svg}
                    onClick={() => {
                      console.log(idx);
                      deleteOptions(idx);
                    }}
                  />
                </div>
              </div>
            );
          })}
          <p className={commonStyles.errorMessage}>
            {errors.options?.root?.message}
          </p>
        </div>
      )}
      <div className={styles.submitBtn + " mt-2"}>
        <Button
          type="submit"
          title="Submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default AddMainQuestion;
