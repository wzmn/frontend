import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import SelectBox from "components/selectBox";
import TextField from "components/text-field";
import { CUSTOMER_LISTING } from "constants/api";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CustomerRegistrationSchemaType,
  customerRegistrationSchema,
} from "schema/customer-schema";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { States, StreetTypes, UnitTypes } from "../../constants";
import { IoLocationSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import * as customerStyles from "./styles.module.scss";
// https://visgl.github.io/react-google-map
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import Geolocation from "components/google-map";
import LocationAutocomplete from "components/location-autocomplete";
import Label from "components/label";
import { useAddressLabelContext } from "providers/address-labels";

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

const customerRegistration = () => {
  const [files, setFiles] = useState<FileProps[]>([]);
  const { open, toggle, setElement } = useRightBarContext();
  const { city, district, postcode } = useAddressLabelContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(customerRegistrationSchema),
  });

  const address = watch("address");

  async function onSubmit(data: CustomerRegistrationSchemaType) {
    try {
      const response = await request({
        url: CUSTOMER_LISTING,
        method: "post",
        data,
      });
      console.log(response);
      toast.success("Added Sucessfully");
    } catch (error) {
      console.log("error");
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <p className={styles.title}>Create Customer</p>

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
                    // errormessage={errors.abnNo?.message}
                  />
                </div>
                <div className="max-w-3xl">
                  <TextField
                    title="Company Name"
                    asterisk
                    // {...register("company_name")}
                    // errormessage={errors.company_name?.message}
                  />
                </div>
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
                    title="E-mail ID"
                    asterisk
                    {...register("user.email")}
                    errormessage={errors.user?.email?.message}
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
              </div>
            </>
          </FormWraper>
        </FormSection>

        <FormSection title="Address Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <div className="mb-10">
                  <LocationAutocomplete
                    onFocus={(e) => {
                      setElement(<Geolocation />, "Map");
                      !open && toggle();
                      console.log("focused");
                    }}
                    onBlur={(e) => {
                      // toggle();
                      // console.log("off focused");
                    }}
                    setFields={(val) => {
                      console.log(val);
                      setValue(
                        "address",
                        val as CustomerRegistrationSchemaType["address"]
                      );
                    }}
                  />
                </div>

                <div className={styles.formGrid}>
                  <div className="max-w-3xl">
                    <TextField
                      title="Building Name."
                      asterisk
                      {...register("address.building_number")}
                      errormessage={errors.address?.building_number?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="Level No"
                      asterisk
                      {...register("address.level_number")}
                      errormessage={errors.address?.level_number?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <SelectBox
                      color="full-white"
                      placeholder="Select Unit Type"
                      data={UnitTypes}
                      asterisk
                      value={address?.unit_type}
                      onChange={(e) => {
                        setValue("address.unit_type", e.label);
                      }}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="Unit No"
                      asterisk
                      {...register("address.unit_number")}
                      errormessage={errors.address?.unit_number?.message}
                    />
                  </div>

                  <div className="max-w-3xl">
                    <TextField
                      title="Lot No."
                      asterisk
                      {...register("address.lot_number")}
                      errormessage={errors.address?.lot_number?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <div className="max-w-3xl">
                      <SelectBox
                        color="full-white"
                        placeholder="Street No"
                        data={StreetTypes}
                        asterisk
                        value={address?.street_number}
                        onChange={(e) => {
                          setValue("address.street_number", e.label);
                        }}
                      />
                    </div>
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="Street Name"
                      asterisk
                      {...register("address.street_name")}
                      errormessage={errors.address?.street_name?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title="Street Type"
                      asterisk
                      {...register("address.street_type")}
                      errormessage={errors.address?.street_type?.message}
                    />
                  </div>

                  <div className="max-w-3xl">
                    <TextField
                      title="Suffix."
                      asterisk
                      {...register("address.suffix")}
                      errormessage={errors.address?.suffix?.message}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title={district()}
                      asterisk
                      {...register("address.suburb")}
                      errormessage={errors.address?.suburb?.message}
                    />
                  </div>

                  <div className="max-w-3xl">
                    <Label title="State" />
                    <SelectBox
                      color="full-white"
                      placeholder="State"
                      data={States}
                      asterisk
                      value={address?.state}
                      onChange={(e) => {
                        setValue("address.state", e.label);
                      }}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <TextField
                      title={postcode()}
                      asterisk
                      {...register("address.pincode")}
                      errormessage={errors.address?.pincode?.message}
                    />
                  </div>

                  <div className="max-w-3xl">
                    <TextField
                      title={city()}
                      asterisk
                      {...register("address.lga")}
                      errormessage={errors.address?.lga?.message}
                    />
                  </div>
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

export default customerRegistration;
