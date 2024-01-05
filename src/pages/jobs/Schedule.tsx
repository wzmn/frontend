import Button from "components/button";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Radio from "components/radio";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as styles from "styles/pages/common.module.scss";
import * as jobStyles from "./styles.module.scss";
import moment from "moment";
import { Result, WorkType } from "type/job";
import Label from "components/label";
import ComboBox, { ComboBoxDataT } from "components/combo-box";
import { Result as EmpResult } from "type/employee";
import companyIdFetcher from "services/company-id-fetcher";
import UserIdentifyer from "services/user-identifyer";
import employeeList from "services/employee-list";
import { debounce } from "utility/debounce";
import { request } from "services/http-request";
import { APPOINTMENT_LISTING } from "constants/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, boolean, object, string } from "yup";
import { toast } from "react-toastify";
import {
  CreateApptSchemaT,
  createApptSchema,
} from "schema/create-schedule-appt";

type Props = {
  item: Result;
};

const Schedule = ({ item }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateApptSchemaT>({
    resolver: yupResolver(createApptSchema),
  });
  const [empListData, setEmpListData] = useState<ComboBoxDataT[]>([]);

  const userRole = UserIdentifyer();

  const id = companyIdFetcher(userRole);

  // const startDate = watch(`startDate`);

  async function onSubmit(data: CreateApptSchemaT) {
    console.log(data);
    return;
    try {
      const response = await request({
        url: APPOINTMENT_LISTING,
        method: "post",
        data: { ...data, job_id: item.id },
      });
      toast.success("Appt is created");
    } catch (error) {
      toast.error("could`t create appt try later");
    }
  }
  async function handleEmployeeList(e: ChangeEvent<HTMLInputElement>) {
    try {
      if (!id) {
        alert("Please Select Country");
        return;
      }
      if (id === null) return;
      const res = await employeeList({
        search: e?.target?.value,
        role__title: "Field Worker",
        company: id,
      });

      const empFilteredList = res.results?.map((item) => ({
        label: item.user?.first_name + " " + item.user?.last_name,
        ...item,
      })) as ComboBoxDataT[];

      setEmpListData(() => empFilteredList);
    } catch (error) {}
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="Schedule Appt(s)" style={{ zIndex: "1" }}>
        <div className="flex-1 z-10">
          <FormWraper>
            <>
              <p className="mb-6">{item.work_type?.title}</p>
              <div className="flex items-start gap-5">
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
                    // min={moment(new Date()).format("yyyy-MM-DD") + "T00:00"}
                  />
                </div>

                <div className="w-64 ">
                  <Label title="Assign To" />
                  <ComboBox<EmpResult>
                    data={empListData}
                    handleSelect={(e) => {
                      setValue("assessment_assigned_to", String(e?.id!));
                    }}
                    onChange={debounce(handleEmployeeList)}
                  />
                  <p className={styles.error + " text-xs"}>
                    {errors.assessment_assigned_to?.message as string}
                  </p>
                </div>
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
                        value="false"
                      />
                      <Radio
                        label="Customer"
                        {...register(`self_assessment`)}
                        value="true"
                      />
                    </div>
                    <p className={styles.error + " text-xs"}>
                      {errors.self_assessment?.message as string}
                    </p>
                  </div>
                </div>{" "}
                <Button
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className={`${jobStyles.borderRing} mt-5`}
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
