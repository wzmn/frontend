import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import SelectBox from "components/selectBox";
import TextField from "components/text-field";
import { CUSTOMER_LISTING } from "constants/api";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CustomerRegistrationSchemaType,
  customerRegistrationSchema,
} from "schema/customer-schema";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { States, StreetTypes, UnitTypes } from "../../constants";

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

const location = {
  address: "1600 Amphitheatre Parkway, Mountain View, california.",
  lat: 37.42216,
  lng: -122.08427,
};

const CreateJob = () => {
  const [OTP, setOTP] = useState<string>("");

  const [files, setFiles] = useState<FileProps[]>([]);

  const { open, toggle, setElement } = useRightBarContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(customerRegistrationSchema),
  });

  async function onSubmit(data: CustomerRegistrationSchemaType) {
    try {
      const response = await request({
        url: CUSTOMER_LISTING,
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
      <p className={styles.title}>Create Job</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-3">
        <FormSection title="Customer Details">
          <FormWraper>
            <>
              <div className={`${styles.userRole}  my-10`}>
                <p className={styles.name}>
                  <span className={styles.bold}>Customer Type</span>
                </p>

                <div className={`${styles.roles}`}>
                  <Radio
                    label="Business"
                    name="status"
                    // checked={companyData.company_status === "document review"}
                  />
                  <Radio
                    label="Residential"
                    name="status"
                    // checked={companyData.company_status === "operational"}
                  />
                </div>
              </div>{" "}
              <div className={styles.formGrid}>
                <div className="max-w-3xl">
                  <TextField
                    title="ABN Number."
                    asterisk
                    // {...register("abnNo")}
                    // errorMessage={errors.abnNo?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Company Name"
                    asterisk
                    // {...register("company_name")}
                    // errorMessage={errors.company_name?.message}
                  />
                </div>
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
                    title="E-mail ID"
                    asterisk
                    {...register("user.email")}
                    errorMessage={errors.user?.email?.message}
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
              </div>
            </>
          </FormWraper>
        </FormSection>

        <FormSection title="Address Details">
          <div className="flex-1">
            <FormWraper>
              <div className={styles.formGrid}>
                <div className="max-w-3xl">
                  <TextField
                    title="Building Name."
                    asterisk
                    // {...register("address.buildingName")}
                    // errorMessage={errors.address?.buildingName?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Level No"
                    asterisk
                    // {...register("address.levelNo")}
                    // errorMessage={errors.address?.levelNo?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <SelectBox
                    placeholder="Select Unit Type"
                    data={UnitTypes}
                    asterisk
                    onChange={(e) => {
                      // setValue("address.unitType", e.label);
                    }}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Unit No"
                    asterisk
                    // {...register("address.unitNo")}
                    // errorMessage={errors.address?.unitNo?.message}
                  />
                </div>

                <div className="max-w-3xl">
                  <TextField
                    title="Lot No."
                    asterisk
                    // {...register("address.lotNo")}
                    // errorMessage={errors.address?.lotNo?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <div className="max-w-3xl">
                    <SelectBox
                      placeholder="Street No"
                      data={StreetTypes}
                      asterisk
                      onChange={(e) => {
                        // setValue("address.streetNo", e.label);
                      }}
                    />
                  </div>
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Street Name"
                    asterisk
                    // {...register("address.streetName")}
                    // errorMessage={errors.address?.streetName?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Street Type"
                    asterisk
                    // {...register("address.streetType")}
                    // errorMessage={errors.address?.streetType?.message}
                  />
                </div>

                <div className="max-w-3xl">
                  <TextField
                    title="Suffix."
                    asterisk
                    // {...register("address.suffix")}
                    // errorMessage={errors.address?.suffix?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Suburb"
                    asterisk
                    // {...register("address.suburb")}
                    // errorMessage={errors.address?.suburb?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <SelectBox
                    placeholder="State"
                    data={States}
                    asterisk
                    onChange={(e) => {
                      // setValue("state", e.label);
                    }}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Pincode"
                    asterisk
                    // {...register("address.pincode")}
                    // errorMessage={errors.address?.pincode?.message}
                  />
                </div>

                <div className="max-w-3xl">
                  <TextField
                    title="LGA"
                    asterisk
                    // {...register("address.lga")}
                    // errorMessage={errors.address?.lga?.message}
                  />
                </div>
              </div>
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
export default CreateJob;
