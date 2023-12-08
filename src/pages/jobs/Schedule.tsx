import Button from "components/button";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Radio from "components/radio";
import React from "react";
import { useForm } from "react-hook-form";
import * as styles from "styles/pages/common.module.scss";
import * as jobStyles from "./styles.module.scss";
import moment from "moment";

type Props = {
  label: string;
};

const Schedule = ({ label }: Props) => {
  const { register, handleSubmit, watch } = useForm();

  const startDate = watch(`${label}.startDate`);

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="Schedule Appt(s)">
        <div className="flex-1 z-10">
          <FormWraper>
            <>
              <p className="mb-6">{label}</p>
              <div className="flex items-center justify-between">
                <div className="w-72">
                  <Input
                    type="datetime-local"
                    className={styles.input}
                    varient="regular"
                    placeholder="Subject"
                    {...register(`${label}.startDate`)}
                    min={moment(new Date()).format("yyyy-MM-DD") + "T00:00"}
                  />
                </div>
                <p className="font-bold">TO</p>
                <div className="w-72">
                  <Input
                    type="datetime-local"
                    className={styles.input}
                    varient="regular"
                    placeholder="Subject"
                    {...register(`${label}.endDate`)}
                    min={startDate}
                  />
                </div>
              </div>
              <div className="flex items-end gap-6 mt-10">
                <div className={`${styles.userRole} `}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Assessment by</span>
                  </p>

                  <div className={`${styles.roles}`}>
                    <Radio
                      label="Fieldworker"
                      {...register(`${label}.assessmentby`)}
                      value="Fieldworker"
                    />
                    <Radio
                      label="Customer"
                      {...register(`${label}.assessmentby`)}
                      value="Customer"
                    />
                  </div>
                </div>{" "}
                <Button
                  className={`${jobStyles.borderRing}`}
                  color="white"
                  title="Schedule"
                  type="submit"
                />
              </div>
            </>
          </FormWraper>
        </div>
      </FormSection>
    </form>
  );
};

export default Schedule;
