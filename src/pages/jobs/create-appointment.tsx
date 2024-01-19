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
import { useLocation } from "@reach/router";
import { Result, WorkType } from "type/job";

const CreateAppointment = () => {
  const { register, watch } = useForm();

  const { workTypes } = useAppContext();
  let workTypeList = watch("workType");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const apptId = params.get("apptId");

  // useEffect

  return (
    <div className="grow">
      {/* <pre>{JSON.stringify(location, null, 4)}</pre> */}
      <p className={styles.title}>Schedule Appointment</p>

      <div className="space-y-16 mb-3">
        {/* <FormSection title="Work Types">
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
        </FormSection> */}

        {/* {workTypeList?.map((_: any, key: number) => ( */}
        <Schedule
          item={location.state as Result}
          companyId={(location.state as Result).customer?.company?.id!}
          apptId={apptId!}
        />
        {/* ))} */}

        {/* <FormSection title="Comments">
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
        </FormSection> */}
      </div>
    </div>
  );
};

export function WorkTypeLabel({ text }: { text: string }) {
  return <p className={jobStyles.wt}>{text}</p>;
}

export default CreateAppointment;
