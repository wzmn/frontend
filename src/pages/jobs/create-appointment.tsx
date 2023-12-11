import Checkbox from "components/checkbox";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import React from "react";
import { useForm } from "react-hook-form";
import * as styles from "styles/pages/common.module.scss";
import Schedule from "./Schedule";
import * as jobStyles from "./styles.module.scss";
import Input from "components/input";

const CreateAppointment = () => {
  const { register, watch } = useForm();

  let workTypeList = watch("workType");

  return (
    <div className="grow">
      <p className={styles.title}>Create Appointment</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Customer Details">
          <FormWraper>
            <div className={jobStyles.wtGrid}>
              <Checkbox
                id="hws-c"
                label={<WorkTypeLabel text="HWS Assessment (Commercial)" />}
                {...register("workType")}
                value="HWS Assessment (Commercial)"
              />
              <Checkbox
                id="hws-r"
                label={<WorkTypeLabel text="HWS Assessment (Residential)" />}
                {...register("workType")}
                value="HWS Assessment (Residential)"
              />
              <Checkbox
                id="ac-c"
                label={<WorkTypeLabel text="AC Assessment (Commercial)" />}
                {...register("workType")}
                value="AC Assessment (Commercial)"
              />
              <Checkbox
                id="ac-r"
                label={<WorkTypeLabel text="AC Assessment (Residential)" />}
                {...register("workType")}
                value="AC Assessment (Residential)"
              />
              <Checkbox
                id="lg"
                label={<WorkTypeLabel text="Lighting Upgrade (Commercial)" />}
                {...register("workType")}
                value="Lighting Upgrade (Commercial)"
              />
              <Checkbox
                id="her"
                label={<WorkTypeLabel text="Home Energy Rating Assessment" />}
                {...register("workType")}
                value="Home Energy Rating Assessment"
              />
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
