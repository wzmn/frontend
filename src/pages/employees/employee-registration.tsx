import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import ButtonGroup from "components/button-group";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import TextField from "components/text-field";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CompanyRegistrationSchemaType,
  companyRegistrationSchema,
} from "schema/company-schema";
import { AiFillAlert } from "react-icons/ai";
import * as styles from "styles/pages/common.module.scss";
import Radio from "components/radio";

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

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(companyRegistrationSchema),
  });

  function onSubmit(data: CompanyRegistrationSchemaType) {
    console.log(data);
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
      <p className={styles.title}>Create Company</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-3">
        <FormSection title="Employee Details">
          <div className="flex-1">
            <FormWraper>
              <div className={styles.formGrid}>
                <div className="max-w-3xl">
                  <TextField
                    title="First Name"
                    asterisk
                    {...register("firstName")}
                    errorMessage={errors.firstName?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Last Name"
                    asterisk
                    {...register("lastName")}
                    errorMessage={errors.lastName?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Mobile Number"
                    asterisk
                    {...register("ownerMobileNo")}
                    errorMessage={errors.ownerMobileNo?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="E-mail ID"
                    asterisk
                    {...register("ownerEmail")}
                    errorMessage={errors.ownerEmail?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Status"
                    asterisk
                    {...register("state")}
                    errorMessage={errors.state?.message}
                  />
                </div>
              </div>
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
              <Button title="Submit" type="submit" />

              <Button title="Cancel" color="red" className="py-10" />
            </div>
          </div>
        </FormSection>
      </form>
    </>
  );
};

export default EmployeeRegistration;
