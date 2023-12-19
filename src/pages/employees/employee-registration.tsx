import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import ButtonGroup from "components/button-group";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import TextField from "components/text-field";
import { EMPLOYEE_LISTING } from "constants/api";
import { useAuthContext } from "providers/auth-provider";
import { useCompanyContext } from "providers/company-provider";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  EmployeeRegistrationSchemaType,
  employeeRegistrationSchema,
} from "schema/employee-schema";
import { request } from "services/http-request";
import UserIdentifyer from "services/user-identifyer";
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
  const { company } = useCompanyContext();
  const { userAuth } = useAuthContext();
  const userRole = UserIdentifyer();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(employeeRegistrationSchema),
  });

  function companyIdFetcher(role: string) {
    switch (role) {
      case "superadmin":
        if (JSON.stringify(company) === "{}") {
          alert("please select the company");
          return null;
        }
        return company.id;
      case "admin":
        return userAuth.emp_license_info.company.id;
      default:
        return userAuth.emp_license_info.company.id;
    }
  }

  async function onSubmit(data: EmployeeRegistrationSchemaType) {
    const id = companyIdFetcher(userRole);
    try {
      const response = await request({
        url: EMPLOYEE_LISTING,
        method: "post",
        data: { ...data, company: id },
      });
      console.log(response);
      toast.success("Added Sucessfully");
    } catch (error) {
      console.log("error");
      toast.error("Something went wrong");
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
                      errormessage={errors.user?.first_name?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="Last Name"
                      asterisk
                      {...register("user.last_name")}
                      errormessage={errors.user?.last_name?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="Mobile Number"
                      asterisk
                      {...register("user.phone")}
                      errormessage={errors.user?.phone?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="E-mail ID"
                      asterisk
                      {...register("user.email")}
                      errormessage={errors.user?.email?.message}
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
                  documents must be accompanied by an official translation.
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
