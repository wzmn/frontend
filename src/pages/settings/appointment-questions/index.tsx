import Checkbox from "components/checkbox";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import { WorkTypeLabel } from "pages/jobs/create-appointment";
import React, { useEffect, useState } from "react";
import * as styles from "styles/pages/common.module.scss";

import * as settingStyles from "../styles.module.scss";
import { useAppContext } from "providers/app-provider";
import { useFieldArray, useForm } from "react-hook-form";
import QuestionsType from "components/pages/settings/appointment-questions/questions-type";
import { request } from "services/http-request";
import { APPT_Q } from "constants/api";
import {
  Option,
  WorkTypeQuestionT,
  WorkTypeRespQuestionT,
  WorkTypeT,
} from "type/global";
import Question from "components/pages/settings/new-appointment-questions/question";
import Questions, {
  QuestionTabWrapper,
} from "components/pages/settings/new-appt-questions";
import TextButton from "components/text-button";
import { FaPlus } from "react-icons/fa";
import Modal from "components/modal";
import AddQuestion from "components/pages/settings/new-appt-questions/add-question";
import Button from "components/button";

export type AddQuestionsT = Partial<Omit<WorkTypeQuestionT, "options">> & {
  options: Partial<Option>[];
};

const AppointmentQuestions = () => {
  const [qData, setQData] = useState<WorkTypeQuestionT[]>([]);
  const [selectedWT, setSelectedWT] = useState<WorkTypeT>();
  const [viewModal, setViewModal] = useState(false);
  const [workType, setWorkType] = useState<string>();

  const { workTypes } = useAppContext();

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
      setQData(() => response.data.results!);
    } catch (error) {}
  }

  function onSubmit(data: any) {
    console.log(data);
  }

  useEffect(() => {
    fetchWTQ();
  }, [workType]);

  return (
    <div className="grow">
      <p className={styles.title}>Settings/Appointment Questions</p>
      <FormSection title="Select Work Type">
        <FormWraper>
          <div className={settingStyles.wtGrid}>
            {workTypes?.map((item) => {
              return (
                <Checkbox<WorkTypeT>
                  key={item.id}
                  id={item.title}
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
            setViewModal((prev) => !prev);
          }}
        />
      </div>
      {qData.map((item) => {
        return (
          <div className="mt-10 mb-5">
            <FormSection key={item.id} title="Input Questions">
              <FormWraper>
                <>
                  <QuestionTabWrapper data={[[item]]} />
                  {/* <Questions data={item} /> */}
                </>
              </FormWraper>
            </FormSection>
          </div>
        );
      })}
      <Modal
        options={{
          title: "Add Question",
          toggle: [viewModal, setViewModal],
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {useArray.fields.map((question, index) => (
            <AddQuestion
              index={index}
              register={register}
              setValue={setValue}
              watch={watch}
              useArray={useArray}
            />
          ))}
          <Button type="submit" title="Submit" className="mt-2" />
        </form>
      </Modal>
      {/* <QuestionsType
        workType={selectedWT?.id}
        title={selectedWT?.title}
        qAData={qData}
      /> */}
    </div>
  );
};

export default AppointmentQuestions;
