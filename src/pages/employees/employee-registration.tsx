import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import ButtonGroup from "components/button-group";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import UploadDoc from "components/pages/company/upload-doc/upload-doc";
import Radio from "components/radio";
import TextField from "components/text-field";
import { COUNTRY_COMPLIANCE, EMPLOYEE_LISTING } from "constants/api";
import { navigate } from "gatsby";
import * as companyStyles from "pages/company/styles.module.scss";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  EmployeeRegistrationSchemaType,
  employeeRegistrationSchema,
} from "schema/employee-schema";
import companyIdFetcher from "services/company-id-fetcher";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import UserIdentifyer from "services/user-identifyer";
import * as styles from "styles/pages/common.module.scss";
import { ComplianceRespT, ComplianceResultT } from "type/global";
import PhoneInput from "react-phone-number-input";

interface FileProps extends File {
  preview: string;
}

type ComplianceState = {
  primary: ComplianceResultT[];
  secondary: ComplianceResultT[];
  additional: ComplianceResultT[];
};

function initialState() {
  return JSON.parse(
    JSON.stringify({
      primary: [],
      secondary: [],
      additional: [],
    })
  );
}

const EmployeeRegistration = () => {
  const [OTP, setOTP] = useState<string>("");
  const [files, setFiles] = useState<FileProps[]>([]);
  const { toggle, open, setElement } = useRightBarContext();
  const userRole = UserIdentifyer();

  const [compliance, setCompliance] = useState<ComplianceState>(initialState());

  const id = companyIdFetcher(userRole);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<EmployeeRegistrationSchemaType>({
    resolver: yupResolver(employeeRegistrationSchema),
  });

  const userPhone = watch("user.phone");

  const empRole = watch("role");

  async function onSubmit(data: EmployeeRegistrationSchemaType) {
    try {
      if (!id) {
        alert("Please Select Country");
        return;
      }
      const response = await request({
        url: EMPLOYEE_LISTING,
        method: "post",
        data: { ...data, company: id },
      });
      console.log(response);
      MsgToast("Added Sucessfully", "success");
    } catch (error: any) {
      console.log("error");
      MsgToast(error.response.data.error, "error");
    }
  }

  function handleChange(OTP: string) {
    setOTP(OTP);
  }

  async function fetchCountryCompliance() {
    try {
      const response = await request<ComplianceRespT>({
        url: COUNTRY_COMPLIANCE,
        params: {
          company_country: "Australia",
        },
      });
      const list = initialState();

      response?.data?.results?.forEach((item) => {
        list[item?.priority?.toLowerCase()!].push(item);
      });

      console.log(list, " listtttttt");

      setCompliance(() => list);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCountryCompliance();

    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className="grow">
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
                    <PhoneInput
                      defaultCountry="AU"
                      countryCallingCodeEditable={false}
                      international
                      className="w-full"
                      placeholder="Enter phone number"
                      value={userPhone}
                      onChange={(val) => setValue("user.phone", val!)}
                      inputComponent={TextField}
                    />
                    <p className={styles.errorMessage}>
                      {errors.user?.phone?.message}
                    </p>
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
                      label="TEAM LEAD"
                      value="Team Lead"
                      {...register("role")}
                    />
                    <Radio label="AGENT" value="Agent" {...register("role")} />
                    <Radio
                      label="FIELDWORKER"
                      value="Field Worker"
                      {...register("role")}
                    />
                    <Radio
                      label="AUDITOR"
                      value="Auditor"
                      {...register("role")}
                    />
                  </div>
                </div>
                <p className={styles.errorMessage}>{errors.role?.message}</p>
              </>
            </FormWraper>
          </div>
        </FormSection>

        {empRole === "Field Worker" && (
          <FormSection title=" Upload Documents">
            <FormWraper>
              <div className="flex-1">
                <p className="text-sm mb-10">
                  <span className={companyStyles.note}>Note: &nbsp;</span>
                  You must upload at least ONE Primary document. Foreign
                  documents must be accompanied by an official translation.{" "}
                  <a
                    href="https://www.google.com"
                    className={companyStyles.moreInfo}
                  >
                    Click for more info
                  </a>
                </p>
                <div className={styles.formGrid}>
                  <ButtonGroup
                    onClick={() => {
                      setElement(
                        <UploadDoc
                          title="Primary Documents"
                          data={compliance.primary}
                        />,
                        "Upload Primary Documents"
                      );
                      !open && toggle();
                    }}
                    title="Upload Primary Documents"
                    groupTitle="Upload"
                  />
                  <ButtonGroup
                    onClick={() => {
                      setElement(
                        <UploadDoc
                          title="Secondary Documents"
                          data={compliance.secondary}
                        />,
                        "Upload Secondary Documents"
                      );
                      !open && toggle();
                    }}
                    title="Upload Secondary Documents"
                    groupTitle="Upload"
                  />
                  <ButtonGroup
                    onClick={() => {
                      setElement(
                        <UploadDoc
                          title="Additional Documents"
                          data={compliance.additional}
                        />,
                        "Upload Additional Documents"
                      );
                      !open && toggle();
                    }}
                    title="Upload Additional Documents"
                    groupTitle="Upload"
                  />
                </div>
              </div>
            </FormWraper>
          </FormSection>
        )}
        <div className="flex justify-center gap-36 mt-10">
          <Button title="Submit" type="submit" isLoading={isSubmitting} />

          <Button
            type="button"
            title="Cancel"
            color="red"
            className="py-10"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegistration;
