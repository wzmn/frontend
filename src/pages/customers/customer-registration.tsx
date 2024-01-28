import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import TextField from "components/text-field";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  CustomerRegistrationSchemaType,
  // companyFieldSchema,
  customerRegistrationSchema,
} from "schema/customer-schema";
import * as styles from "styles/pages/common.module.scss";
// https://visgl.github.io/react-google-map
import { ComboBoxDataT } from "components/combo-box";
import { CUSTOMER_LISTING } from "constants/api";
import { navigate } from "gatsby";
import Address from "services/address";
import companyIdFetcher from "services/company-id-fetcher";
import employeeList from "services/employee-list";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import UserIdentifyer from "services/user-identifyer";
import PhoneInput from "react-phone-number-input";

const countries = [
  { label: "ADMIN" },
  { label: "AGENT" },
  { label: "AUDITOR" },
  { label: "MANAGER" },
];

interface FileProps extends File {
  preview: string;
}

const showEmpFieldFor = ["superadmin", "admin"];

// function dynamicSchema(role: string) {
//   if (role === "superadmin") {
//     return customerRegistrationSchema.concat(superAndAdminSchema);
//   } else if (role === "admin") {
//     return customerRegistrationSchema.concat(superAndAdminSchema);
//   }

//   return customerRegistrationSchema;
// }

const customerRegistration = () => {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [empListData, setEmpListData] = useState<ComboBoxDataT[]>([]);
  const userRole = UserIdentifyer();
  const id = companyIdFetcher(userRole);
  const methods = useForm<CustomerRegistrationSchemaType>({
    shouldUseNativeValidation: false,
    resolver: yupResolver(customerRegistrationSchema),
  });

  const companyListRef = useRef<HTMLInputElement>();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const customerType = watch("customer_type");
  const userPhone = watch("user.phone");

  async function onSubmit(data: CustomerRegistrationSchemaType) {
    try {
      if (!id) {
        alert("Please Select Country");
        return;
      }

      const dt = {
        ...data,
        user: data.user,
        // assigned_to: data.assigned_to,
        company: id,
      };

      console.log(data);

      const response = await request({
        url: CUSTOMER_LISTING,
        method: "post",
        data: dt,
      });
      MsgToast("Customer Created Sucessfully!", "success");
      navigate(-1);
    } catch (error: any) {
      console.log(error.response.data.message);
      MsgToast(error.response.data.message, "error");
    }
  }

  async function handleEmployeeList(e?: ChangeEvent<HTMLInputElement>) {
    try {
      const res = await employeeList({
        search: typeof e === "string" ? "" : e?.target?.value,
        license_id__company__id: id,
      });

      const empFilteredList = res.results?.map((item) => ({
        label:
          item.user?.first_name +
          " " +
          item.user?.last_name +
          " (" +
          item.role +
          " )",
        ...item,
      })) as ComboBoxDataT[];

      setEmpListData(() => empFilteredList);
    } catch (error) {}
  }

  useEffect(() => {
    handleEmployeeList();
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [id]);

  function toLoc(arrOfObj: Array<any>) {
    console.log("track toLoc");
    for (let i of arrOfObj) {
      if (Array.isArray(i)) {
        return toLoc(i);
      }
      if (typeof i === "object") {
        if (i.hasOwnProperty("ref")) {
          return i.ref.name;
        }
        return toLoc(Object.entries(i));
      }
    }
  }

  useEffect(() => {}, [companyListRef]);

  useEffect(() => {
    // console.log(errors[Object.keys(errors)[0]], Object.entries(errors)[0]);
    // Autofocus on the first input field with an error
    // const firstErrorField = Object.keys(errors)[0];
    // if (firstErrorField) {
    //   setError(firstErrorField as any, {});
    //   const inputElement = document.getElementById(firstErrorField);
    //   if (inputElement) {
    //     inputElement.focus();
    //   }
    // }
    // const tagName = toLoc(Object.entries(errors));
    // if (tagName) {
    //   console.log(document.getElementsByName(tagName)[0]);
    //   (document.getElementsByName(tagName)[0] as HTMLElement).scrollIntoView();
    //   // (
    //   //   document.getElementsByTagName(tagName) as unknown as HTMLDivElement
    //   // ).scrollIntoView({ behavior: "smooth" });
    // }
  }, [errors]);

  return (
    <>
      <p className={styles.title}>Create Customer</p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-3">
          <FormSection title="Customer Details" style={{ zIndex: 3 }}>
            <div className="z-10 grow">
              <FormWraper>
                <>
                  <div className="my-10">
                    <div className={`${styles.userRole}`}>
                      <p className={styles.name}>
                        <span className={styles.bold}>Customer Type</span>
                      </p>

                      <div
                        data-name="customer_type"
                        className={`${styles.roles}`}
                      >
                        <Radio
                          value="commercial"
                          label="Business"
                          {...register("customer_type")}
                        />
                        <Radio
                          value="residential"
                          label="Residential"
                          {...register("customer_type")}
                        />
                      </div>
                    </div>
                    <p className={styles.errorMessage}>
                      {errors.customer_type?.message}
                    </p>
                  </div>
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
                        title="E-mail ID"
                        asterisk
                        {...register("user.email")}
                        errormessage={errors.user?.email?.message}
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

                    {customerType === "Business" && (
                      <>
                        <div className="max-w-3xl">
                          <TextField
                            title="Company ABN"
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
                      </>
                    )}

                    {/* {showEmpFieldFor.includes(userRole) && (
                      <>
                        <div className="max-w-3xl">
                          <Label title="Assign To" />
                          <ComboBox<Result>
                            data={empListData}
                            handleSelect={(e) => {
                              setValue("assigned_to", String(e?.id!));
                            }}
                            onChange={debounce(handleEmployeeList)}
                          />
                          <p className={styles.errorMessage}>
                            {errors.assigned_to?.message}
                          </p>
                        </div>
                      </>
                    )} */}
                  </div>
                </>
              </FormWraper>
            </div>
          </FormSection>

          <FormSection title="Address Details">
            <div className="flex-1">
              <FormWraper>
                <>
                  <Address />

                  {/* <Checkbox
                    label={
                      <p className={styles.wtFilters}>
                        Do you have seperate address for billing
                      </p>
                    }
                    // value={item.title}
                    checked={checkBillingAdd}
                    onChange={(e) => {
                      // setValue(e.target.value);
                    }}
                  /> */}
                </>
              </FormWraper>
              <div className="flex justify-center gap-36 mt-10">
                <Button
                  title="Submit"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                />

                <Button
                  title="Cancel"
                  type="button"
                  color="red"
                  className="py-10"
                  onClick={() => {
                    navigate(-1);
                  }}
                />
              </div>
            </div>
          </FormSection>
        </form>
      </FormProvider>
    </>
  );
};

export default customerRegistration;
