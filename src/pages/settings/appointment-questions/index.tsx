import Checkbox from "components/checkbox";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import { WorkTypeLabel } from "pages/jobs/create-appointment";
import React, { useEffect, useState } from "react";
import * as styles from "styles/pages/common.module.scss";

import { QuestionTabWrapper } from "components/pages/settings/new-appt-questions";
import AddMainQuestion from "components/pages/settings/new-appt-questions/add-main-question";
import TextButton from "components/text-button";
import { APPT_Q } from "constants/api";
import { useAppContext } from "providers/app-provider";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { request } from "services/http-request";
import {
  Option,
  WorkTypeQuestionT,
  WorkTypeRespQuestionT,
  WorkTypeT,
} from "type/global";
import * as settingStyles from "../styles.module.scss";
import { AddQuestionsT } from "type/settings/questions";

const AppointmentQuestions = () => {
  const [qData, setQData] = useState<WorkTypeQuestionT[]>([]);
  const { workTypes } = useAppContext();
  const [workType, setWorkType] = useState<string>();

  const [mainQList, setMainQList] = useState<any[]>([]);

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

  async function fetchWTQ() {
    try {
      const response = await request<WorkTypeRespQuestionT>({
        url: APPT_Q,
        params: {
          work_type__id: workType,
        },
      });
      setQData(() => response.data.results!.reverse());
    } catch (error) {}
  }

  function onSubmit(data: any) {
    console.log(data);
  }

  function addNewQ() {
    const list = [...mainQList];
    list.push(1);
    setMainQList(() => [...list]);
  }

  function deleteQ(index: number) {
    const list = [...mainQList];
    list.splice(index, 1);
    setMainQList(() => [...list]);
  }

  useEffect(() => {
    fetchWTQ();
  }, [workType]);

  useEffect(() => {
    setWorkType(() => String(workTypes?.[0]?.id));
  }, [workTypes]);

  return (
    <div className="grow">
      <p className={styles.title}>Settings/Appointment Questions</p>
      <FormSection title="Select Work Type">
        <FormWraper>
          <div className={settingStyles.wtGrid}>
            {workTypes?.map((item, index) => {
              return (
                <Checkbox<WorkTypeT>
                  key={item.id}
                  id={item.title}
                  defaultChecked={index == 0 && true}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    setWorkType(e.target.value);
                  }}
                  label={<WorkTypeLabel text={item.title} />}
                  name="workType"
                  storeData={item}
                  getStoredData={(data) => {
                    // setSelectedWT(data);
                  }}
                  type="radio"
                  value={item.id}
                />
              );
            })}
          </div>
        </FormWraper>
      </FormSection>
      <div className="mt-5 flex justify-end">
        <TextButton
          label="Add Question"
          icon={<FaPlus />}
          onClick={() => {
            addNewQ();
            // setViewModal((prev) => !prev);
          }}
        />
      </div>

      {mainQList.map((newQ, index, arr) => {
        return (
          <div
            className="mt-10 mb-5 relative"
            style={{ zIndex: arr.length - index + "" + 1 }}
          >
            <FormSection title="Input Questions" style={{ zIndex: "inherit" }}>
              <FormWraper>
                <>
                  <AddMainQuestion workType={workType!} refetch={fetchWTQ} />
                </>
              </FormWraper>
            </FormSection>
            <RiDeleteBin6Line
              onClick={() => {
                deleteQ(index);
              }}
              className="absolute top-3 right-4 z-50 text-rose-600"
            />
          </div>
        );
      })}

      {qData.map((item, index, arr) => {
        return (
          <div
            className="mt-10 mb-5 "
            key={item.id}
            style={{ zIndex: arr.length - index }}
          >
            <FormSection
              key={item.id}
              title="Input Questions"
              style={{ zIndex: "inherit" }}
            >
              <FormWraper>
                <>
                  <QuestionTabWrapper qIndex={index} data={[[item]]} />
                  {/* <Questions data={item} /> */}
                </>
              </FormWraper>
            </FormSection>
          </div>
        );
      })}
      {/* <Modal
        options={{
          title: "Add Question",
          toggle: [viewModal, setViewModal],
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {useArray.fields.map((question, index) => (
            <AddQuestion
              key={index}
              index={index}
              register={register}
              setValue={setValue}
              watch={watch}
              useArray={useArray}
            />
          ))}
          <Button type="submit" title="Submit" className="mt-2" />
        </form>
      </Modal> */}
      {/* <QuestionsType
        workType={selectedWT?.id}
        title={selectedWT?.title}
        qAData={qData}
      /> */}
    </div>
  );
};

export default AppointmentQuestions;
