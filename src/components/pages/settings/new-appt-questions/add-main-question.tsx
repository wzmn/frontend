import { Switch } from "@headlessui/react";
import Button from "components/button";
import Input from "components/input";
import SelectBox from "components/selectBox";
import { APPT_Q } from "constants/api";
import { AddQuestionsT } from "pages/settings/appointment-questions";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import companyIdFetcher from "services/company-id-fetcher";
import { request } from "services/http-request";
import UserIdentifyer from "services/user-identifyer";
import { checkforMultiChecker, questions } from "./helper";
import * as styles from "./styles.module.scss";

const AddMainQuestion = ({
  workType,
  refetch,
}: {
  workType: string;
  refetch: () => Promise<void>;
}) => {
  const [enabled, setEnabled] = useState(false);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AddQuestionsT>({
    defaultValues: {},
  });

  const uderRole = UserIdentifyer();

  const id = companyIdFetcher(uderRole);

  const qType = watch("question_type");
  const options = watch("options");

  async function onSubmit(data: AddQuestionsT) {
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
          work_type: workType,
          has_sub_question: enabled,
          is_sub_question: false,
        },
      });
      toast.success("added");
      await refetch();
    } catch (error) {
      console.log("inside error");
      toast.error("failed adding question");
    }
  }

  function addOptions() {
    const list = [...options];
    list.push({ option_text: "" });
    setValue("options", [...list]);
  }

  function deleteOptions(index: number) {
    const list = [...options];
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

      <div className="flex gap-3">
        <div className="w-80">
          <Input placeholder="Enter Text" {...register(`content`)} />
        </div>
        <div className="w-52">
          <SelectBox
            data={questions}
            placeholder="Select"
            onChange={(e) => {
              setValue(`question_type`, e.value);
            }}
          />
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
