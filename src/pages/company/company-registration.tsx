import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import ButtonGroup from "components/button-group";
import DNDImage from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import InputOtp from "components/otp";
import UploadDoc from "components/pages/company/upload-doc/upload-doc";
import SelectBox from "components/selectBox";
import TextField from "components/text-field";
import { COMPANY_LISTING, COUNTRY_COMPLIANCE, OTP_API } from "constants/api";
import AdditionalDocument from "layout/additional-document";
import { useRightBarContext } from "providers/right-bar-provider";
import { KeyType, useUploadContext } from "providers/upload-doc-provider";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import {
  CompanyRegistrationSchemaType,
  companyRegistrationSchema,
} from "schema/company-schema";
import Address from "services/address";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { CompanyDataType } from "type/company";
import { CountryComplianceType } from "type/global";
import * as companyStyles from "./styles.module.scss";
import { navigate } from "gatsby";
import { AddressSchemaT } from "schema/address-schema";

let countryComplianceData: CountryComplianceType[];

function objectToFormData(
  obj: Record<any, any>,
  formData?: FormData,
  parentKey = ""
) {
  formData = formData || new FormData();

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let propName = parentKey ? `${parentKey}[${key}]` : key;
      if (typeof obj[key] === "object" && !(obj[key] instanceof File)) {
        objectToFormData(obj[key], formData, propName);
      } else {
        formData.append(propName, obj[key]);
      }
    }
  }

  return formData;
}

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

type ComplianceState = {
  primary: CountryComplianceType[];
  secondary: CountryComplianceType[];
  additional: CountryComplianceType[];
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

const CompanyRegistration = () => {
  const [mobileOTP, setMobileOTP] = useState<string>("");
  const [emailOTP, setEmailOTP] = useState<string>("");

  const [files, setFiles] = useState<FileProps[]>([]);

  const [compliance, setCompliance] = useState<ComplianceState>(initialState());

  const { open, toggle, setElement } = useRightBarContext();

  const { files: documents } = useUploadContext();

  const methods = useForm<
    CompanyRegistrationSchemaType & {
      address?: AddressSchemaT;
    }
  >({
    resolver: yupResolver(companyRegistrationSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

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

  async function onSubmit(
    data: CompanyRegistrationSchemaType & {
      address?: AddressSchemaT;
    }
  ) {
    const dt = {
      ...data,
      company_address: { ...data.address, lat: 0, long: 0 },
    };
    delete dt["address"];
    // console.log(dt);

    try {
      const formData = objectToFormData({
        company: dt,
      });
      Object.keys(documents).forEach((item) => {
        Object.entries(documents[item as KeyType]).forEach((item, index) => {
          formData.append(
            `company_compliance[${index}][detail]`,
            item[1].detail as any
          );
          item[1].documents.forEach((doc, idx) => {
            formData.append(
              `company_compliance[${index}][documents][${idx}]`,
              doc as any
            );
          });
        });
      });
      formData.append("company[company_logo]", files[0]);
      // formData.append("files", documents.primary[0].documents[0] as any);
      // formData.append("company", data as any);

      // console.log(dt);
      // return;
      const response = await request<CompanyDataType>({
        // url: COMPANY_LISTING,
        url: COMPANY_LISTING + "admin_create_company/",
        // url: "http://127.0.0.1:3000/",
        method: "post",
        data: formData,
        // data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      toast.success("Added Sucessfully");
      navigate(-1);

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
      console.log(error);
      toast.error("Something went wrong");
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
      const list = initialState();
      response?.data?.forEach((item) => {
        list[item.item_type?.toLocaleLowerCase()!].push(item);
      });

      setCompliance(() => list);
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
      {/* {JSON.stringify(com)} */}
      <p className={styles.title}>Create Company</p>
      <FormProvider {...methods}>
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
                      errormessage={errors.company_owner?.first_name?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="Last Name"
                      asterisk
                      {...register("company_owner.last_name")}
                      errormessage={errors.company_owner?.last_name?.message}
                    />
                  </div>

                  {/* <label htmlFor="">Upload Profile Photo</label>
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
                  </aside> */}

                  <div className="max-w-3xl flex gap-2">
                    <TextField
                      title="Mobile Number"
                      asterisk
                      {...register("company_owner.phone")}
                      errormessage={errors.company_owner?.phone?.message}
                    />

                    <Button
                      type="button"
                      title="Send"
                      height="fit"
                      onClick={async () => {
                        const ifValidated = await trigger(
                          "company_owner.phone"
                        );
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
                      errormessage={errors.company_owner?.email?.message}
                    />
                    <Button
                      type="button"
                      title="Send"
                      height="fit"
                      onClick={async () => {
                        const ifValidated = await trigger(
                          "company_owner.email"
                        );
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
                  errormessage={errors.abnNo?.message}
                />
              </div> */}
                <div className="max-w-3xl">
                  <TextField
                    title="Company Name"
                    asterisk
                    {...register("company_owner.first_name")}
                    errormessage={errors.company_owner?.first_name?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Mobile Number"
                    asterisk
                    {...register("company_owner.last_name")}
                    errormessage={errors.company_owner?.last_name?.message}
                  />
                </div>

                <div className="max-w-3xl">
                  <TextField
                    title="Landline Number"
                    asterisk
                    {...register("company_landline")}
                    errormessage={errors.company_landline?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Company E-mail ID"
                    asterisk
                    {...register("company_email")}
                    errormessage={errors.company_email?.message}
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
              <>
                <Address />
              </>
            </FormWraper>
          </FormSection>

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
                        <UploadDoc data={compliance.primary} />,
                        "Primary Documents"
                      );
                      !open && toggle();
                    }}
                    title="Primary Documents"
                    groupTitle="Upload"
                  />
                  <ButtonGroup
                    onClick={() => {
                      setElement(
                        <UploadDoc data={compliance.secondary} />,
                        "Secondary Documents"
                      );
                      !open && toggle();
                    }}
                    title="Secondary Documents"
                    groupTitle="Upload"
                  />
                  <ButtonGroup
                    onClick={() => {
                      setElement(
                        <AdditionalDocument />,
                        "Additional Documents"
                      );
                      !open && toggle();
                    }}
                    title="Additional Documents"
                    groupTitle="Upload"
                  />
                </div>
                <div className="flex justify-center gap-36 mt-10">
                  <Button
                    title="Submit"
                    type="submit"
                    isLoading={isSubmitting}
                  />

                  <Button
                    type="button"
                    title="Cancel"
                    color="red"
                    className="py-10"
                  />
                </div>
              </div>
            </FormWraper>
          </FormSection>
        </form>
      </FormProvider>
    </>
  );
};

export default CompanyRegistration;
