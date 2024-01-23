import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import ComboBox, { ComboBoxDataT } from "components/combo-box";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Label from "components/label";
import SelectBox from "components/selectBox";
import { REMINDER_LISTING } from "constants/api";
import { PageProps, navigate } from "gatsby";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import companyIdFetcher from "services/company-id-fetcher";
import employeeList from "services/employee-list";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import UserIdentifyer from "services/user-identifyer";
import * as styles from "styles/pages/common.module.scss";
import { EmpResultT } from "type/employee";
import { debounce } from "utility/debounce";
import { InferType, object, string } from "yup";
const showAssignToFieldFor = ["superadmin", "admin"];

const reminder = [
  { label: "15 mins Before", value: { minutes: 15 } },
  { label: "25 mins Before", value: { minutes: 25 } },
  { label: "30 mins Before", value: { minutes: 30 } },
  { label: "35 mins Before", value: { minutes: 35 } },
  { label: "40 mins Before", value: { minutes: 40 } },
  { label: "45 mins Before", value: { minutes: 45 } },
  { label: "50 mins Before", value: { minutes: 50 } },
  { label: "1 Hour Before", value: { hours: 1 } },
];

const ReminderSchema = object({
  task_name: string().trim().required("required"),
  description: string().trim().required("required"),
  reminder_time: string().trim().required("required"),
  due_date: string().trim().required("required"),
  assigned_to_id: string().trim(),
  // priority:string().trim().required('required'),
  // status:string().trim().required('required'),
  // task_user:string().trim().required('required'),
});

const ReminderSchemaSomeRoles = object({
  assigned_to_id: string().trim().required("required"),
});

function roleBaseSchema(user: string) {
  switch (user.toLowerCase()) {
    case "superadmin":
    case "admin":
      return ReminderSchema.concat(ReminderSchemaSomeRoles);
    default:
      return ReminderSchema;
  }
}

type ReminderSchemaT = InferType<typeof ReminderSchema>;

const CreateReminder = (props: PageProps) => {
  const { location } = props;
  // const params = new URLSearchParams(location.search);
  const customerId = (location.state as any).custId;
  const userRole = UserIdentifyer();

  const methods = useForm<ReminderSchemaT>({
    resolver: yupResolver(roleBaseSchema(userRole)),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const [empListData, setEmpListData] = useState<ComboBoxDataT[]>([]);

  const id = companyIdFetcher(userRole);

  async function onSubmit(data: ReminderSchemaT) {
    try {
      const response = await request({
        url: REMINDER_LISTING,
        method: "post",
        data: {
          task_user: customerId,
          priority: "medium",
          status: "pending",
          ...data,
        },
      });
      MsgToast("Reminder Created", "success");
    } catch (error) {
      MsgToast("Cant Create Reminder at this time try again later ", "error");
    }
  }

  async function handleEmployeeList(e?: ChangeEvent<HTMLInputElement>) {
    try {
      // if (!id) {
      //   alert("Please Select Country");
      //   return;
      // }
      const res = await employeeList({
        search: e?.target?.value,
        license_id__company__id: id,
        role__title: "Agent",
      });

      const empFilteredList = res.results?.map((item) => ({
        label: item.user?.first_name + " " + item.user?.last_name,
        ...item,
      })) as ComboBoxDataT[];

      setEmpListData(() => empFilteredList);
    } catch (error) {}
  }

  const reminderTime = watch("reminder_time");

  useEffect(() => {
    handleEmployeeList();
  }, []);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="grow">
      <p className={styles.title}>Create Reminder</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-3">
        <FormSection title="Title">
          <div className="flex-1">
            <FormWraper>
              <>
                <div className={styles.input}>
                  <Input
                    {...register("task_name")}
                    className={styles.input}
                    varient="regular"
                    placeholder="Subject"
                    errormessage={errors.task_name?.message}
                  />
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title="Schedule" style={{ zIndex: 2 }}>
          <div className="flex-1 z-10">
            <FormWraper>
              <>
                {showAssignToFieldFor.includes(userRole) && (
                  <>
                    <div className="w-64 mb-5">
                      <Label title="Reminder Assign To" />
                      <ComboBox<EmpResultT>
                        data={empListData}
                        handleSelect={(e) => {
                          setValue("assigned_to_id", String(e?.id));
                        }}
                        onChange={debounce(handleEmployeeList)}
                      />
                      <p className={styles.errorMessage}>
                        {errors.assigned_to_id?.message}
                      </p>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between">
                  <div className="w-72">
                    <Input
                      {...register("reminder_time")}
                      type="datetime-local"
                      className={styles.input}
                      varient="regular"
                      placeholder="Subject"
                      errormessage={errors.reminder_time?.message}
                    />
                  </div>
                  {/* <p className="font-bold">TO</p> */}
                  {/* <div className="w-72">
                    <Input
                      type="datetime-local"
                      className={styles.input}
                      varient="regular"
                      placeholder="Subject"
                    />
                  </div> */}

                  <div className="w-72">
                    <SelectBox
                      disabled={
                        reminderTime === undefined || reminderTime === ""
                      }
                      placeholder="Reminder Timer"
                      data={reminder}
                      asterisk
                      onChange={(e) => {
                        const dueDate = TimeFormat(reminderTime)
                          .subtract(e.value)
                          .toString();

                        setValue("due_date", dueDate);
                      }}
                    />
                    <p className={styles.errorMessage}>
                      {errors?.due_date?.message}
                    </p>
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title="Description">
          <div className="flex-1">
            <FormWraper>
              <>
                {/* <div className={styles.input}> */}
                <Input
                  {...register("description")}
                  className={styles.input}
                  varient="regular"
                  placeholder="Subject"
                  errormessage={errors.description?.message}
                />
                {/* </div> */}
              </>
            </FormWraper>
            <div className="flex justify-center gap-36 mt-10">
              <Button title="Submit" type="submit" isLoading={isSubmitting} />

              <Button
                title="Cancel"
                type="button"
                color="red"
                className="py-10"
                onClick={() => {
                  navigate(-1);
                }}
              />
            </div>
          </div>
        </FormSection>
      </form>
    </div>
  );
};

export default CreateReminder;
