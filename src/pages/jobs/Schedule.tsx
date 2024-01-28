import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import ComboBox, { ComboBoxDataT } from "components/combo-box";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Label from "components/label";
import Radio from "components/radio";
import { APPOINTMENT_LISTING } from "constants/api";
import { navigate } from "gatsby";
import moment from "moment";
import { useAppContext } from "providers/app-provider";
import { useAuthContext } from "providers/auth-provider";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateApptSchemaT,
  createApptSchema,
} from "schema/create-schedule-appt";
import employeeList from "services/employee-list";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import TimeFormat from "services/time-format";
import UserIdentifyer from "services/user-identifyer";
import * as styles from "styles/pages/common.module.scss";
import { EmpResultT } from "type/employee";
import { Result } from "type/job";
import { debounce } from "utility/debounce";

type Props = {
  item: Result;
  companyId: number;
  apptId?: string;
};

const Schedule = ({ item, companyId, apptId }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateApptSchemaT>({
    resolver: yupResolver(createApptSchema),
    defaultValues: {
      self_assessment: "false",
    },
  });
  const [empListData, setEmpListData] = useState<ComboBoxDataT[]>([]);
  const selfAssessment = watch("self_assessment");
  const {
    appointment: { status, statusData },
  } = useAppContext();

  const { userAuth } = useAuthContext();

  const userRole = UserIdentifyer();

  async function onSubmit(data: CreateApptSchemaT) {
    try {
      let exData = {};
      if (apptId) {
        const statueChangeFrom = statusData?.filter((item) => {
          return item.title === "Confirmed";
        });
        exData = {
          appointment_status_id: statueChangeFrom![0].id,
        };
      } else {
        exData = {
          job_id: item.id,
          appointment_status: "Confirmed",
        };
      }

      const url = apptId
        ? APPOINTMENT_LISTING + apptId + "/"
        : APPOINTMENT_LISTING;
      const response = await request({
        url: url,
        method: apptId ? "patch" : "post",
        data: {
          ...data,
          ...exData,
          self_assessment: JSON.parse(selfAssessment),
        },
      });
      MsgToast("Appt is created", "success");
      navigate(-1);
    } catch (error) {
      MsgToast("could`t create appt try later", "error");
    }
  }
  async function handleEmployeeList(e?: ChangeEvent<HTMLInputElement>) {
    try {
      const res = await employeeList({
        search: e?.target?.value,
        role__title: "Field Worker",
        license_id__company__id: companyId,
      });

      const empFilteredList = res.results?.map((item) => ({
        label: item.user?.first_name + " " + item.user?.last_name,
        ...item,
      })) as ComboBoxDataT[];

      setEmpListData(() => empFilteredList);
    } catch (error) {}
  }

  useEffect(() => {
    handleEmployeeList();
    if (userRole === "agent") {
      setValue("assessment_assigned_to_id", userAuth.user_id);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection
        title={`Schedule Appt${apptId && "(" + apptId + ")"}`}
        style={{ zIndex: "1" }}
      >
        <div className="flex-1 z-10">
          <FormWraper>
            <>
              <p className="mb-6">{item.work_type?.title}</p>

              <div className="">
                <div className={`${styles.userRole} `}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Assessment by</span>
                  </p>

                  <div className="">
                    <div className={`${styles.roles}`}>
                      <Radio
                        label="Fieldworker"
                        {...register(`self_assessment`)}
                        value={"false"}
                      />
                      <Radio
                        label="Customer"
                        {...register(`self_assessment`)}
                        value={"true"}
                      />
                    </div>
                    <p className={styles.error + " text-xs"}>
                      {errors.self_assessment?.message as string}
                    </p>
                  </div>
                </div>{" "}
                <div className="flex items-start gap-5 mt-8">
                  <div className="w-72">
                    <Label title="assessment scheduled" />
                    <Input
                      type="datetime-local"
                      className={styles.input}
                      varient="regular"
                      placeholder="Subject"
                      {...register(`assessment_scheduled_on`)}
                      errormessage={
                        errors.assessment_scheduled_on?.message as string
                      }
                      min={TimeFormat(new Date(), "yyyy-MM-DD") + "T00:00"}
                    />
                  </div>

                  {JSON.parse(selfAssessment.toString()) === false &&
                    userRole !== "agent" && (
                      <div className="w-64 ">
                        <Label title="Assign To" />
                        <ComboBox<EmpResultT>
                          data={empListData}
                          handleSelect={(e) => {
                            setValue(
                              "assessment_assigned_to_id",
                              Number(e?.user?.id)
                            );
                          }}
                          onChange={debounce(handleEmployeeList)}
                        />
                        <p className={styles.error + " text-xs"}>
                          {errors.assessment_assigned_to_id?.message as string}
                        </p>
                      </div>
                    )}
                  {/* <p className="font-bold">TO</p>
                <div className="w-72">
                  <Input
                    type="datetime-local"
                    className={styles.input}
                    varient="regular"
                    placeholder="Subject"
                    {...register(`${item.title}.endDate`)}
                    min={startDate}
                  />
                </div> */}
                </div>
                <div className="flex gap-5">
                  <Button
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    className={` mt-5`}
                    color={"blue"}
                    title="Confirm"
                    type="submit"
                  />
                  <Button
                    disabled={isSubmitting}
                    className={` mt-5`}
                    color={"red"}
                    title="Cancel"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1);
                    }}
                  />
                </div>
              </div>
            </>
          </FormWraper>
        </div>
      </FormSection>
    </form>
  );
};

export default Schedule;
