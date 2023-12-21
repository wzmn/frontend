import Checkbox from "components/checkbox";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import { WorkTypeLabel } from "pages/jobs/create-appointment";
import React, { useEffect, useState } from "react";
import * as styles from "styles/pages/common.module.scss";

import * as settingStyles from "../styles.module.scss";
import { useAppContext } from "providers/app-provider";
import { useForm } from "react-hook-form";
import QuestionsType from "components/pages/settings/appointment-questions/questions-type";
import { request } from "services/http-request";
import { APPT_Q } from "constants/api";
import {
  WorkTypeQuestionT,
  WorkTypeRespQuestionT,
  WorkTypeT,
} from "type/global";

const AppointmentQuestions = () => {
  const [qData, setQData] = useState<WorkTypeQuestionT[]>([]);
  const [selectedWT, setSelectedWT] = useState<WorkTypeT>();

  const { workTypes } = useAppContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  const wt: string = watch("workType");

  async function fetchWTQ() {
    try {
      const response = await request<WorkTypeRespQuestionT>({
        url: APPT_Q,
        params: {
          work_type__id: wt,
        },
      });
      setQData(() => response.data.results!);
    } catch (error) {}
  }

  useEffect(() => {
    fetchWTQ();
  }, [wt]);

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
                  label={<WorkTypeLabel text={item.title} />}
                  {...register("workType")}
                  storeData={item}
                  getStoredData={(data) => {
                    setSelectedWT(data);
                  }}
                  type="radio"
                  value={item.id}
                />
              );
            })}
          </div>
        </FormWraper>
      </FormSection>

      <QuestionsType title={selectedWT?.title} qAData={qData} />
    </div>
  );
};

export default AppointmentQuestions;
