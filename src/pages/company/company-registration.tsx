import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import ButtonGroup from "components/button-group";
import DNDImage from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import SelectBox from "components/selectBox";
import TextField from "components/text-field";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  CompanyRegistrationSchemaType,
  companyRegistrationSchema,
} from "schema/company-schema";
import * as styles from "styles/pages/common.module.scss";
import * as companyStyles from "./styles.module.scss";
import { States, StreetTypes, UnitTypes } from "../../constants";

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

const AddEditCompany = () => {
  const [OTP, setOTP] = useState<string>("");

  const [files, setFiles] = useState<FileProps[]>([]);

  const { toggle } = useRightBarContext();

  const {
    register,
    handleSubmit,
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
        {/* <SelectBox data={data} />

        <Input varient="regular" />
        <InputOtp
          onChange={handleChange}
          value={OTP}
          renderSeparator={<>-</>}
        /> */}
        {/* <Input varient="regular" /> */}

        <FormSection title="Company Details">
          <FormWraper>
            <div className={styles.formGrid}>
              <div className="max-w-3xl">
                <TextField
                  title="ABN No."
                  asterisk
                  {...register("abnNo")}
                  errorMessage={errors.abnNo?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Company Name"
                  asterisk
                  {...register("companyName")}
                  errorMessage={errors.companyName?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Mobile Number"
                  asterisk
                  {...register("mobileNo")}
                  errorMessage={errors.mobileNo?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Company E-mail ID"
                  asterisk
                  {...register("companyEmail")}
                  errorMessage={errors.companyEmail?.message}
                />
              </div>
              <label htmlFor="">Upload Logo</label>
              <label htmlFor="">Preview</label>
              <div className={styles.file}>
                <DNDImage setFiles={setFiles} />
              </div>

              <aside className={companyStyles.preview}>
                {files?.[0]?.preview ? (
                  <div className="">
                    <img
                      src={files?.[0]?.preview}
                      alt="/assets/images/picture.svg"
                      // Revoke data uri after image is loaded
                      onLoad={() => {
                        URL.revokeObjectURL(files?.[0]?.preview);
                      }}
                    />
                    <RiDeleteBin6Line
                      className="w-5 h-5 cursor-pointer absolute top-1 right-4"
                      onClick={() => {
                        setFiles(() => []);
                      }}
                    />
                  </div>
                ) : (
                  <div className="">
                    <img
                      src="/assets/images/picture.svg"

                      // alt="/assets/images/picture.svg"
                      // Revoke data uri after image is loaded
                    />
                  </div>
                )}
              </aside>
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title="Address Details">
          <FormWraper>
            <div className={styles.formGrid}>
              <div className="max-w-3xl">
                <TextField
                  title="Building Name."
                  asterisk
                  {...register("buildingName")}
                  errorMessage={errors.buildingName?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Level No"
                  asterisk
                  {...register("levelNo")}
                  errorMessage={errors.levelNo?.message}
                />
              </div>
              <div className="max-w-3xl">
                <SelectBox
                  placeholder="Select Unit Type"
                  data={UnitTypes}
                  asterisk
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Unit No"
                  asterisk
                  {...register("unitNo")}
                  errorMessage={errors.unitNo?.message}
                />
              </div>

              <div className="max-w-3xl">
                <TextField
                  title="Lot No."
                  asterisk
                  {...register("lotNo")}
                  errorMessage={errors.lotNo?.message}
                />
              </div>
              <div className="max-w-3xl">
                <div className="max-w-3xl">
                  <SelectBox
                    placeholder="Street No"
                    data={StreetTypes}
                    asterisk
                  />
                </div>
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Street Name"
                  asterisk
                  {...register("streetName")}
                  errorMessage={errors.streetName?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Street Type"
                  asterisk
                  {...register("streetType")}
                  errorMessage={errors.streetType?.message}
                />
              </div>

              <div className="max-w-3xl">
                <TextField
                  title="Suffix."
                  asterisk
                  {...register("suffix")}
                  errorMessage={errors.suffix?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Suburb"
                  asterisk
                  {...register("suburb")}
                  errorMessage={errors.suburb?.message}
                />
              </div>
              <div className="max-w-3xl">
                <SelectBox placeholder="State" data={States} asterisk />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Pincode"
                  asterisk
                  {...register("pincode")}
                  errorMessage={errors.pincode?.message}
                />
              </div>

              <div className="max-w-3xl">
                <TextField
                  title="LGA"
                  asterisk
                  {...register("lga")}
                  errorMessage={errors.lga?.message}
                />
              </div>
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title=" Upload Documents">
          <FormWraper>
            <>
              <p className="text-sm mb-10">
                <span className="text-red-500 font-bold">Note: &nbsp;</span>
                You must upload at least ONE Primary document. Foreign documents
                mustr be accompanied by an official translation.
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
        </FormSection>

        <FormSection title="Owner Details">
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

export default AddEditCompany;
