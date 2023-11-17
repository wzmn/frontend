import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import ButtonGroup from "components/button-group";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import TextField from "components/text-field";
import { EMPLOYEE_LISTING } from "constants/api";
import { useAuthContext } from "providers/auth-provider";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  EmployeeRegistrationSchemaType,
  employeeRegistrationSchema,
} from "schema/employee-schema";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";

const pg = [
  { label: "100" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
];

interface FileProps extends File {
  preview: string;
}

const EmployeeRegistration = () => {
  const [OTP, setOTP] = useState<string>("");

  const [files, setFiles] = useState<FileProps[]>([]);

  const { toggle } = useRightBarContext();

  const { userAuth } = useAuthContext();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(employeeRegistrationSchema),
  });

  async function onSubmit(data: EmployeeRegistrationSchemaType) {
    try {
      const response = await request({
        url: EMPLOYEE_LISTING,
        method: "post",
        data,
      });
      console.log(response);
    } catch (error) {
      console.log("error");
    }
  }

  function handleChange(OTP: string) {
    setOTP(OTP);
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <p className={styles.title}>Create Employee</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-3">
        <FormSection title="Employee Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <div className={styles.formGrid}>
                  <div className="max-w-3xl">
                    <TextField
                      title="First Name"
                      asterisk
                      {...register("user.first_name")}
                      errorMessage={errors.user?.first_name?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="Last Name"
                      asterisk
                      {...register("user.last_name")}
                      errorMessage={errors.user?.last_name?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="Mobile Number"
                      asterisk
                      {...register("user.phone")}
                      errorMessage={errors.user?.phone?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="E-mail ID"
                      asterisk
                      {...register("user.email")}
                      errorMessage={errors.user?.email?.message}
                    />
                  </div>
                </div>
                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Employee Role</span>
                  </p>
                  <div className={styles.roles}>
                    <Radio label="ADMIN" value="Admin" {...register("role")} />
                    <Radio
                      label="MANAGER"
                      value="Manager"
                      {...register("role")}
                    />
                    <Radio
                      label="TEAM LEADER"
                      value="Team leader"
                      {...register("role")}
                    />
                    <Radio label="AGENT" value="Agent" {...register("role")} />
                    <Radio
                      label="FIELDWORKER"
                      value="	Field Worker"
                      {...register("role")}
                    />
                    <Radio
                      label="AUDITOR"
                      value="Auditor"
                      {...register("role")}
                    />
                  </div>
                </div>
                <p className={styles.error}>{errors.role?.message}</p>
              </>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title=" Upload Documents" note="(Only for Fieldworker)">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className="text-sm mb-10">
                  <span className="text-red-500 font-bold">Note: &nbsp;</span>
                  You must upload at least ONE Primary document. Foreign
                  documents mustr be accompanied by an official translation.
                </p>
                <div className={styles.formGrid}>
                  <ButtonGroup
                    onClick={toggle}
                    title="Primary Documents"
                    groupTitle="Upload"
                  />
                  <ButtonGroup
                    onClick={toggle}
                    title="Secondary Documents"
                    groupTitle="Upload"
                  />
                  <ButtonGroup
                    onClick={toggle}
                    title="Additional Documents"
                    groupTitle="Upload"
                  />
                </div>
              </>
            </FormWraper>
            <div className="flex justify-center gap-36 mt-10">
              <Button title="Submit" type="submit" isLoading={isSubmitting} />

              <Button title="Cancel" color="red" className="py-10" />
            </div>
          </div>
        </FormSection>
      </form>
    </>
  );
};

export default EmployeeRegistration;
