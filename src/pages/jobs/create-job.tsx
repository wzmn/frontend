import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import Checkbox from "components/checkbox";
import ComboBox, { ComboBoxDataT } from "components/combo-box";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Label from "components/label";
import Radio from "components/radio";
import TextField from "components/text-field";
import { APPOINTMENT_LISTING } from "constants/api";
import { PageProps, navigate } from "gatsby";
import { useAppContext } from "providers/app-provider";
import { useAuthContext } from "providers/auth-provider";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  JobRegistrationSchemaType,
  conditionalSchema,
} from "schema/job-schema";
import Address from "services/address";
import companyIdFetcher from "services/company-id-fetcher";
import employeeList from "services/employee-list";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import UserIdentifyer from "services/user-identifyer";
import * as styles from "styles/pages/common.module.scss";
import { CustResultT } from "type/customer";
import { EmpResultT } from "type/employee";
import { debounce } from "utility/debounce";
import { WorkTypeLabel } from "./create-appointment";
import * as jobStyles from "./styles.module.scss";
import PhoneInput from "react-phone-number-input";

const showEmpFieldFor = [
  "superadmin",
  "admin",
  "owner",
  "manager",
  "team lead",
];

const CreateJob = (props: PageProps) => {
  const [OTP, setOTP] = useState<string>("");
  const [empListData, setEmpListData] = useState<ComboBoxDataT[]>([]);
  const userRole = UserIdentifyer();
  const { workTypes } = useAppContext();
  const id = companyIdFetcher(userRole);
  const { userAuth } = useAuthContext();

  const { location } = props;

  const custData = (location?.state as any)?.custData as CustResultT;

  const prefillCustData = {
    customer: {
      user: {
        first_name: custData?.user?.first_name,
        last_name: custData?.user?.last_name,
        phone: custData?.user?.phone,
        email: custData?.user?.email,
      },
      customer_type: custData?.customer_type,
      abn: custData?.abn,
      company_name: custData?.company_name,
    },
  };

  const methods = useForm({
    resolver: yupResolver(conditionalSchema()),
    defaultValues: {
      customer: prefillCustData?.customer as any,
      billAddCheck: false,
      workType: [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const userPhone = watch("customer.user.phone");

  const customerType = watch("customer.customer_type");
  const billAddCheck = watch("billAddCheck");

  async function onSubmit(data: JobRegistrationSchemaType) {
    try {
      if (!id) {
        alert("Please Select Country");
        return;
      }
      const response = await request({
        url: APPOINTMENT_LISTING,
        method: "post",
        data: {
          job: {
            customer: {
              user: data.customer.user,
              company: id,
              customer_type: data.customer.customer_type,
            },
            address: data.address,
            job_assigned_to_id: data.job_assigned_to_id || userAuth.user_id,
            work_type_id: data.workType,
            ...(!billAddCheck
              ? { billing_address: data.address }
              : { billing_address: data.billing_address }),
          },
          self_assessment: false,

          appointment_status: "Waiting",
        },
      });
      MsgToast("Added Sucessfully", "success");
      navigate(-1);
    } catch (error) {
      console.log("error");
      MsgToast("Something went wrong", "error");
    }
  }

  function handleChange(OTP: string) {
    setOTP(OTP);
  }

  async function handleEmployeeList(e?: ChangeEvent<HTMLInputElement>) {
    try {
      // if (!id) {
      //   alert("Please Select Country");
      //   return;
      // }
      const res = await employeeList({
        search: e?.target?.value,
        license_id__company__id: id,
        role__title__in: ["Owner", "Manager", "Team Lead", "Agent"].toString(),
      });

      const empFilteredList = res.results?.map((item) => ({
        label:
          item.user?.first_name +
          " " +
          item.user?.last_name +
          " (" +
          item.role +
          ")",
        ...item,
      })) as ComboBoxDataT[];

      setEmpListData(() => empFilteredList);
    } catch (error) {}
  }

  useEffect(() => {
    handleEmployeeList();
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    // return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [JSON.stringify(id)]);

  // useEffect(() => {
  //   console.log(errors);
  // }),
  //   [errors];

  return (
    <>
      <p className={styles.title}>Create Job</p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-3">
          <FormSection title="Customer Details" style={{ zIndex: 3 }}>
            <div className="z-10 grow">
              <FormWraper>
                <>
                  <div className=" my-10">
                    <div className={`${styles.userRole} `}>
                      <p className={styles.name}>
                        <span className={styles.bold}>Customer Type</span>
                      </p>
                      <div
                        data-name="customer_type"
                        className={`${styles.roles}`}
                      >
                        <Radio
                          disabled={!!custData}
                          value="Business"
                          label="Business"
                          {...register("customer.customer_type")}
                        />
                        <Radio
                          disabled={!!custData}
                          value="Residential"
                          label="Residential"
                          {...register("customer.customer_type")}
                        />
                      </div>
                    </div>
                    <p className={styles.errorMessage}>
                      {errors.customer?.customer_type?.message}
                    </p>
                  </div>

                  <div className={styles.formGrid}>
                    <div className="max-w-3xl">
                      <TextField
                        disabled={!!custData}
                        title="First Name"
                        asterisk
                        {...register("customer.user.first_name")}
                        errormessage={
                          errors.customer?.user?.first_name?.message
                        }
                      />
                    </div>

                    <div className="max-w-3xl">
                      <TextField
                        disabled={!!custData}
                        title="Last Name"
                        asterisk
                        {...register("customer.user.last_name")}
                        errormessage={errors.customer?.user?.last_name?.message}
                      />
                    </div>
                    <div className="max-w-3xl">
                      <TextField
                        disabled={!!custData}
                        title="E-mail ID"
                        asterisk
                        {...register("customer.user.email")}
                        errormessage={errors.customer?.user?.email?.message}
                      />
                    </div>

                    <div className="max-w-3xl w-full">
                      <PhoneInput
                        style={{
                          width: "100%",
                        }}
                        defaultCountry="AU"
                        countryCallingCodeEditable={false}
                        international
                        className="w-full"
                        placeholder="Enter phone number"
                        value={userPhone}
                        onChange={(val) =>
                          setValue("customer.user.phone", val!)
                        }
                        inputComponent={TextField}
                      />
                      <p className={styles.errorMessage}>
                        {errors.customer?.user?.phone?.message}
                      </p>
                    </div>

                    {/* <div className="max-w-3xl">
                      <Label title="Employee" />
                      <ComboBox<EmpResultT>
                        data={empListData}
                        handleSelect={(e) => {
                          setValue("job_assigned_to_id", String(e?.id!));
                        }}
                        onChange={debounce(handleEmployeeList)}
                      />
                      <p className={styles.error}>
                        {errors.job_assigned_to_id?.message}
                      </p>
                    </div> */}

                    {customerType === "Business" && (
                      <>
                        <div className="max-w-3xl">
                          <TextField
                            disabled={!!custData}
                            title="Company ABN"
                            asterisk
                            {...register("customer.abn")}
                            errormessage={errors.customer?.abn?.message}
                          />
                        </div>
                        <div className="max-w-3xl">
                          <TextField
                            disabled={!!custData}
                            title="Company Name"
                            asterisk
                            {...register("customer.company_name")}
                            errormessage={
                              errors.customer?.company_name?.message
                            }
                          />
                        </div>
                      </>
                    )}

                    {showEmpFieldFor.includes(userRole) && (
                      <>
                        <div className="max-w-3xl">
                          <Label title="Job Assign To" />
                          <ComboBox<EmpResultT>
                            placeholder="Employee"
                            data={empListData}
                            handleSelect={(e) => {
                              setValue(
                                "job_assigned_to_id",
                                String(e?.user?.id)
                              );
                            }}
                            onChange={debounce(handleEmployeeList)}
                          />
                          <p className={styles.errorMessage}>
                            {errors.job_assigned_to_id?.message}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* <div className="flex gap-10">
                    <Checkbox />
                    <Checkbox />
                    <Checkbox />
                  </div> */}
                </>
              </FormWraper>
            </div>
          </FormSection>

          <FormSection title="Work Types">
            <FormWraper>
              <div className="">
                <div data-name="work_types" className={jobStyles.wtGrid}>
                  {workTypes?.map((item) => {
                    return (
                      <Checkbox
                        key={item.id}
                        id={item.title}
                        label={<WorkTypeLabel text={item.title} />}
                        {...register("workType")}
                        value={item.id}
                      />
                    );
                  })}
                </div>
                <p className={styles.errorMessage}>
                  {errors.workType?.message}
                </p>
              </div>
            </FormWraper>
          </FormSection>

          <FormSection title="Address Details">
            <div className="flex-1">
              <FormWraper>
                <>
                  <Address />
                  <div className="flex justify-center mt-5">
                    <Checkbox
                      id={"billAddCheck"}
                      {...register("billAddCheck")}
                      label={<p>Have Different Billing Address</p>}
                      value={"true"}
                    />
                  </div>
                </>
              </FormWraper>
              {/* <div className="flex justify-center gap-36 mt-10">
                <Button title="Submit" type="submit" isLoading={isSubmitting} />

                <Button
                  title="Cancel"
                  type="button"
                  color="red"
                  className="py-10"
                  onClick={() => {
                    navigate(-1);
                  }}
                />
              </div> */}
            </div>
          </FormSection>

          {billAddCheck && (
            <FormSection title="Billing Address">
              <div className="flex-1">
                <FormWraper>
                  <>
                    <Address wat="billing_address" />
                  </>
                </FormWraper>
              </div>
            </FormSection>
          )}
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
        </form>
      </FormProvider>
    </>
  );
};
export default CreateJob;
