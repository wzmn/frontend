import Checkbox from "components/checkbox";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as styles from "styles/pages/common.module.scss";
import Schedule from "./Schedule";
import * as jobStyles from "./styles.module.scss";
import Input from "components/input";
import { useAppContext } from "providers/app-provider";

const CreateAppointment = () => {
  const { register, watch } = useForm();

  const { workTypes } = useAppContext();
  let workTypeList = watch("workType");

  // useEffect

  return (
    <div className="grow">
      {/* <pre>{JSON.stringify(workTypes, null, 4)}</pre> */}
      <p className={styles.title}>Create Appointment</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Customer Details">
          <FormWraper>
            <div className={jobStyles.wtGrid}>
              {workTypes?.map((item) => {
                return (
                  <Checkbox
                    key={item.id}
                    id={item.title}
                    label={<WorkTypeLabel text={item.title} />}
                    {...register("workType")}
                    value={item.title}
                  />
                );
              })}
            </div>
          </FormWraper>
        </FormSection>

        {workTypeList?.map((_: any, key: number) => (
          <Schedule key={key} label={_} />
        ))}

        <FormSection title="Comments">
          <div className="flex-1">
            <FormWraper>
              <>
                <div className={styles.commentBox}>
                  <div className={styles.user}>JJ</div>
                  <div className={styles.input}>
                    <Input
                      className={styles.input}
                      varient="regular"
                      placeholder="Add a comment..."
                    />
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>
      </div>
    </div>
  );
};

function WorkTypeLabel({ text }: { text: string }) {
  return <p className={jobStyles.wt}>{text}</p>;
}

export default CreateAppointment;
