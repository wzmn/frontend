import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import ButtonGroup from "components/button-group";
import DNDImage from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import UploadDoc from "components/pages/company/upload-doc/upload-doc";
import SelectBox from "components/selectBox";
import TextField from "components/text-field";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  CompanyRegistrationSchemaType,
  companyRegistrationSchema,
} from "schema/company-schema";
import * as styles from "styles/pages/common.module.scss";
import { States, StreetTypes, UnitTypes } from "../../constants";
import * as companyStyles from "./styles.module.scss";
import AdditionalDocument from "layout/additional-document";

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

  const { open, toggle, setElement } = useRightBarContext();

  const {
    register,
    handleSubmit,
    setValue,
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
                  {...register("address.buildingName")}
                  errorMessage={errors.address?.buildingName?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Level No"
                  asterisk
                  {...register("address.levelNo")}
                  errorMessage={errors.address?.levelNo?.message}
                />
              </div>
              <div className="max-w-3xl">
                <SelectBox
                  placeholder="Select Unit Type"
                  data={UnitTypes}
                  asterisk
                  onChange={(e) => {
                    setValue("address.unitType", e.label);
                  }}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Unit No"
                  asterisk
                  {...register("address.unitNo")}
                  errorMessage={errors.address?.unitNo?.message}
                />
              </div>

              <div className="max-w-3xl">
                <TextField
                  title="Lot No."
                  asterisk
                  {...register("address.lotNo")}
                  errorMessage={errors.address?.lotNo?.message}
                />
              </div>
              <div className="max-w-3xl">
                <div className="max-w-3xl">
                  <SelectBox
                    placeholder="Street No"
                    data={StreetTypes}
                    asterisk
                    onChange={(e) => {
                      setValue("address.streetNo", e.label);
                    }}
                  />
                </div>
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Street Name"
                  asterisk
                  {...register("address.streetName")}
                  errorMessage={errors.address?.streetName?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Street Type"
                  asterisk
                  {...register("address.streetType")}
                  errorMessage={errors.address?.streetType?.message}
                />
              </div>

              <div className="max-w-3xl">
                <TextField
                  title="Suffix."
                  asterisk
                  {...register("address.suffix")}
                  errorMessage={errors.address?.suffix?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Suburb"
                  asterisk
                  {...register("address.suburb")}
                  errorMessage={errors.address?.suburb?.message}
                />
              </div>
              <div className="max-w-3xl">
                <SelectBox
                  placeholder="State"
                  data={States}
                  asterisk
                  onChange={(e) => {
                    setValue("state", e.label);
                  }}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Pincode"
                  asterisk
                  {...register("address.pincode")}
                  errorMessage={errors.address?.pincode?.message}
                />
              </div>

              <div className="max-w-3xl">
                <TextField
                  title="LGA"
                  asterisk
                  {...register("address.lga")}
                  errorMessage={errors.address?.lga?.message}
                />
              </div>
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title=" Upload Documents">
          <FormWraper>
            <>
              <p className="text-sm mb-10">
                <span className={companyStyles.note}>Note: &nbsp;</span>
                You must upload at least ONE Primary document. Foreign documents
                mustr be accompanied by an official translation.{" "}
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
                    setElement(<UploadDoc />, "Primary Documents");
                    !open && toggle();
                  }}
                  title="Primary Documents"
                  groupTitle="Upload"
                />
                <ButtonGroup
                  onClick={() => {
                    setElement(<>Secondary Documents</>, "Secondary Documents");
                    !open && toggle();
                  }}
                  title="Secondary Documents"
                  groupTitle="Upload"
                />
                <ButtonGroup
                  onClick={() => {
                    setElement(<AdditionalDocument />, "Additional Documents");
                    !open && toggle();
                  }}
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
                <label htmlFor="">Upload Profile Photo</label>
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
