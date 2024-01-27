import DNDImage from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Label from "components/label";
import SelectBox from "components/selectBox";
import TextField from "components/text-field";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as styles from "styles/pages/common.module.scss";
import PhoneInput from "react-phone-number-input";
import * as companyStyles from "pages/company/styles.module.scss";
import Button from "components/button";
import Address from "services/address";
import { InferType, object } from "yup";
import { addressSchema } from "schema/address-schema";
import { companyDetailsSchema } from "schema/company-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import { COMPANY_LISTING } from "constants/api";
import { useAuthContext } from "providers/auth-provider";
import { ComResultT } from "type/company";

interface FileProps extends File {
  preview: string;
}

const schema = object({
  address: addressSchema,
}).concat(companyDetailsSchema);

type SchemaT = InferType<typeof schema>;

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

const CompanyDetails = () => {
  const { userAuth } = useAuthContext();
  const methods = useForm<SchemaT>({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const companyLandline = watch("company_landline");
  const phoneNumber = watch("company_mobile_phone");

  // const [files, setFiles] = useState<FileProps[]>([]);
  const country = watch("address.country");

  async function onSubmit(data: SchemaT) {
    try {
      console.log(data);
      const resp = await request({
        url: COMPANY_LISTING + userAuth?.emp_license_info?.company?.id + "/",
        method: "patch",
        data,
      });
      MsgToast("Details Added", "success");
    } catch (error: any) {
      if (error?.response?.data?.company_owner?.hasOwnProperty("email")) {
        MsgToast(error?.response?.data?.company_owner?.email?.[0], "error");
      } else if (
        error?.response?.data?.company_owner?.hasOwnProperty("phone")
      ) {
        MsgToast(error?.response?.data?.company_owner?.phone?.[0], "error");
      } else {
        MsgToast("Try Again Later", "error");
      }
    }
  }

  async function fetchDetails() {
    try {
      const resp = await request<ComResultT>({
        url: COMPANY_LISTING + userAuth?.emp_license_info?.company?.id + "/",
      });
      console.log(resp);

      let defaultData: SchemaT = {
        abn: resp?.data?.company_abn!,
        company_country: resp?.data?.company_country,
        company_mobile_phone: resp?.data?.company_mobile_phone,
        company_name: resp?.data?.company_name,
        company_type: resp?.data?.company_type,
        company_email: resp?.data?.company_email,
        company_landline: resp?.data?.company_landline,
        address: resp?.data?.company_address! as any,
      };

      reset(defaultData);

      console.log("default val");
    } catch (error) {}
  }

  useEffect(() => {
    setValue("company_country", country!);
  }, [country]);

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="px-56">
        <FormSection title="Company Details">
          <FormWraper>
            <div className="flex-1">
              <div className={styles.formGrid}>
                <div className="max-w-3xl">
                  <TextField
                    title="ABN"
                    asterisk
                    {...register("abn")}
                    errormessage={errors.abn?.message}
                  />
                </div>

                <div className="max-w-3xl">
                  <TextField
                    title="Company Name"
                    asterisk
                    {...register("company_name")}
                    errormessage={errors.company_name?.message}
                  />
                </div>

                <div className="max-w-3xl">
                  <Label title="Phone No." />
                  <div className="">
                    <PhoneInput
                      defaultCountry="AU"
                      countryCallingCodeEditable={false}
                      international
                      className="w-full"
                      placeholder="Enter phone number"
                      value={phoneNumber!}
                      onChange={(val) => setValue("company_mobile_phone", val!)}
                      inputComponent={TextField}
                    />
                    <p className={styles.errorMessage}>
                      {errors.company_mobile_phone?.message}
                    </p>
                  </div>
                </div>

                <div className="max-w-3xl">
                  <Label title="Landline No." />
                  <div className="">
                    <PhoneInput
                      defaultCountry="AU"
                      countryCallingCodeEditable={false}
                      international
                      className="w-full"
                      placeholder="Enter phone number"
                      value={companyLandline!}
                      onChange={(val) => setValue("company_landline", val!)}
                      inputComponent={TextField}
                    />
                    <p className={styles.errorMessage}>
                      {errors.company_landline?.message}
                    </p>
                  </div>
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
                  <TextField
                    disabled
                    title="Company Country"
                    asterisk
                    {...register("company_country")}
                    errormessage={errors.company_country?.message}
                  />
                  {/* <SelectBox
                    disabled
                    placeholder="Company Country"
                    data={countries}
                    asterisk
                    onChange={(e) => {
                      setValue("company_country", e.label);
                    }}
                  />
                  <p className={styles.error + " text-xs"}>
                    {errors.company_country?.message}
                  </p> */}
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
                  <p className={styles.error + " text-xs"}>
                    {errors.company_type?.message}
                  </p>
                </div>
              </div>

              {/* <div className={styles.formGrid + " mt-5"}>
                <div className="">
                  <Label title="Upload Logo" htmlFor="" />
                  &nbsp;
                  <Label
                    title="(specifying the required image range 300-400 pixels)"
                    htmlFor=""
                    className={styles.error}
                  />
                </div>

                <Label title="Preview" htmlFor="" />

                <div className={styles.file}>
                  <DNDImage
                    setFiles={(files) => {
                      setFiles(files);
                      setValue("logoImg", files[0]);
                    }}
                  />
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
              </div> */}

              {/* <p className={styles.error + " text-xs"}>
                  {errors.logoImg?.message}
                </p> */}
            </div>
          </FormWraper>
        </FormSection>
        <FormSection title="Address Details">
          <FormWraper>
            <div className="flex-1">
              <Address />
              <div className="flex justify-center gap-36 mt-10">
                <Button
                  title="Submit"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </FormWraper>
        </FormSection>
      </form>
    </FormProvider>
  );
};

export default CompanyDetails;
