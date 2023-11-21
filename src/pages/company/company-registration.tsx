import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import ButtonGroup from "components/button-group";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
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
import { request } from "services/http-request";
import {
  COMPANY_LISTING,
  CONPAMY_UPLOAD_DOCS,
  COUNTRY_COMPLIANCE,
  OTP_API,
} from "constants/api";
import { CountryComplianceType } from "type/global";
import { useUploadContext } from "providers/upload-doc-provider";
import InputOtp from "components/otp";
import { toast } from "react-toastify";
import { CompanyDataType } from "type/company";

let countryComplianceData: CountryComplianceType[];

const countries = [
  { label: "UK" },
  { label: "USA" },
  { label: "IND" },
  { label: "CAD" },
  { label: "RUS" },
  { label: "JAP" },
  { label: "AUS" },
  { label: "NZL" },
];

const type = [{ label: "buyer" }, { label: "seller" }];

interface FileProps extends File {
  preview: string;
}

const AddEditCompany = () => {
  const [mobileOTP, setMobileOTP] = useState<string>("");
  const [emailOTP, setEmailOTP] = useState<string>("");

  const [files, setFiles] = useState<FileProps[]>([]);

  const { open, toggle, setElement } = useRightBarContext();

  const { files: primaryDoc } = useUploadContext();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(companyRegistrationSchema),
  });

  async function sendOtp(value: string) {
    try {
      const response = await request<CountryComplianceType[]>({
        url: OTP_API,
        method: "post",
        data: {
          username: value,
        },
      });
      toast("OTP Sent Sucessfully");
    } catch (error) {
      toast("Something Went Wrong");
    }
  }

  async function onSubmit(data: CompanyRegistrationSchemaType) {
    try {
      const response = await request<CompanyDataType>({
        url: COMPANY_LISTING,
        method: "post",
        data,
      });
      console.log(response);
      // if (response.status === 201) {
      //   const uploadDoc = await request({
      //     url: CONPAMY_UPLOAD_DOCS,
      //     method: "post",
      //     data: {
      //       documents: primaryDoc,
      //     },
      //   });
      // }
    } catch (error) {
      console.log("error");
    }
  }

  async function fetchCountryCompliance() {
    try {
      const response = await request<CountryComplianceType[]>({
        url: COUNTRY_COMPLIANCE,
        params: {
          company_country: "UK",
        },
      });
      countryComplianceData = response.data;
    } catch (error) {}
  }

  useEffect(() => {
    setValue("mobile_otp", mobileOTP);
  }, [mobileOTP]);

  useEffect(() => {
    setValue("email_otp", emailOTP);
  }, [emailOTP]);

  useEffect(() => {
    fetchCountryCompliance();
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <p className={styles.title}>Create Company</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-3">
        <FormSection title="Owner Details">
          <div className="flex-1">
            <FormWraper>
              <div className={styles.formGrid}>
                <div className="max-w-3xl">
                  <TextField
                    title="First Name"
                    asterisk
                    {...register("company_owner.first_name")}
                    errorMessage={errors.company_owner?.first_name?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Last Name"
                    asterisk
                    {...register("company_owner.last_name")}
                    errorMessage={errors.company_owner?.last_name?.message}
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

                <div className="max-w-3xl flex gap-2">
                  <TextField
                    title="Mobile Number"
                    asterisk
                    {...register("company_owner.phone")}
                    errorMessage={errors.company_owner?.phone?.message}
                  />

                  <Button
                    type="button"
                    title="Send"
                    height="fit"
                    onClick={async () => {
                      const ifValidated = await trigger("company_owner.phone");
                      if (!ifValidated) return;
                      const value = getValues("company_owner.phone");
                      sendOtp(value);
                    }}
                  />
                </div>
                <div className="max-w-3xl">
                  <InputOtp
                    numInputs={6}
                    error={!!errors.mobile_otp}
                    value={mobileOTP}
                    onChange={setMobileOTP}
                  />
                  <span>
                    <span className="blue">0:27</span> to resend the code
                  </span>
                </div>
                <div className="max-w-3xl flex gap-2">
                  <TextField
                    title="E-mail ID"
                    asterisk
                    {...register("company_owner.email")}
                    errorMessage={errors.company_owner?.email?.message}
                  />
                  <Button
                    type="button"
                    title="Send"
                    height="fit"
                    onClick={async () => {
                      const ifValidated = await trigger("company_owner.email");
                      if (!ifValidated) return;
                      const value = getValues("company_owner.email");
                      sendOtp(value!);
                    }}
                  />
                </div>
                <div className="max-w-3xl">
                  <InputOtp
                    numInputs={6}
                    error={!!errors.email_otp}
                    onChange={setEmailOTP}
                    value={emailOTP}
                  />
                  <span>
                    <span className="blue">0:27</span> to resend the code
                  </span>
                </div>
              </div>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title="Company Details">
          <FormWraper>
            <div className={styles.formGrid}>
              {/* <div className="max-w-3xl">
                <TextField
                  title="ABN No."
                  asterisk
                  {...register("abnNo")}
                  errorMessage={errors.abnNo?.message}
                />
              </div> */}
              <div className="max-w-3xl">
                <TextField
                  title="Company Name"
                  asterisk
                  {...register("company_name")}
                  errorMessage={errors.company_name?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Mobile Number"
                  asterisk
                  {...register("company_mobile_phone")}
                  errorMessage={errors.company_mobile_phone?.message}
                />
              </div>

              <div className="max-w-3xl">
                <TextField
                  title="landline Number"
                  asterisk
                  {...register("company_landline")}
                  errorMessage={errors.company_landline?.message}
                />
              </div>
              <div className="max-w-3xl">
                <TextField
                  title="Company E-mail ID"
                  asterisk
                  {...register("company_email")}
                  errorMessage={errors.company_email?.message}
                />
              </div>
              <div className="max-w-3xl">
                <SelectBox
                  placeholder="Company Country"
                  data={countries}
                  asterisk
                  onChange={(e) => {
                    setValue("company_country", e.label);
                  }}
                />
                <p className={styles.error}>
                  {errors.company_country?.message}
                </p>
              </div>

              <div className="max-w-3xl">
                <SelectBox
                  placeholder="Company Type"
                  data={type}
                  asterisk
                  onChange={(e) => {
                    setValue("company_type", e.label);
                  }}
                />
                <p className={styles.error}>{errors.company_type?.message}</p>
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
            <div className="flex-1">
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
                    setElement(
                      <UploadDoc data={countryComplianceData} />,
                      "Primary Documents"
                    );
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
              <div className="flex justify-center gap-36 mt-10">
                <Button title="Submit" type="submit" isLoading={isSubmitting} />

                <Button title="Cancel" color="red" className="py-10" />
              </div>
            </div>
          </FormWraper>
        </FormSection>
      </form>
    </>
  );
};

export default AddEditCompany;
