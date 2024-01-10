import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import Checkbox from "components/checkbox";
import { ComboBoxDataT } from "components/combo-box";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import TextField from "components/text-field";
import { JOB_LISTING } from "constants/api";
import { navigate } from "gatsby";
import { useAppContext } from "providers/app-provider";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  JobRegistrationSchemaType,
  jobRegistrationSchema,
} from "schema/job-schema";
import Address from "services/address";
import companyIdFetcher from "services/company-id-fetcher";
import employeeList from "services/employee-list";
import { request } from "services/http-request";
import UserIdentifyer from "services/user-identifyer";
import * as styles from "styles/pages/common.module.scss";
import { WorkTypeLabel } from "./create-appointment";
import * as jobStyles from "./styles.module.scss";

const CreateJob = () => {
  const [OTP, setOTP] = useState<string>("");
  const [empListData, setEmpListData] = useState<ComboBoxDataT[]>([]);
  const userRole = UserIdentifyer();
  const { workTypes } = useAppContext();

  const id = companyIdFetcher(userRole);

  const methods = useForm({
    resolver: yupResolver(jobRegistrationSchema),
    defaultValues: {
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

  const customerType = watch("customer.customer_type");

  async function onSubmit(data: JobRegistrationSchemaType) {
    try {
      if (!id) {
        alert("Please Select Country");
        return;
      }
      const response = await request({
        url: JOB_LISTING,
        method: "post",
        data: {
          customer: {
            user: data.customer.user,
            company: id,
            assigned_to: data.job_assigned_to_id,
            customer_type: data.customer.customer_type,
          },
          address: data.address,
          job_assigned_to_id: data.job_assigned_to_id,
          work_type_id: data.workType,
        },
      });
      toast.success("Added Sucessfully");
      navigate(-1);
    } catch (error: any) {
      console.log("error");
      toast.error(error.response.data.message);
    }
  }

  function handleChange(OTP: string) {
    setOTP(OTP);
  }

  async function handleEmployeeList(e: ChangeEvent<HTMLInputElement>) {
    try {
      if (!id) {
        alert("Please Select Country");
        return;
      }
      const res = await employeeList({
        search: e?.target?.value,
        company: id,
      });

      const empFilteredList = res.results?.map((item) => ({
        label: item.user?.first_name + " " + item.user?.last_name,
        ...item,
      })) as ComboBoxDataT[];

      setEmpListData(() => empFilteredList);
    } catch (error) {}
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    // return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      {/* {JSON.stringify(errors)} */}
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
                      <div className={`${styles.roles}`}>
                        <Radio
                          value="Business"
                          label="Business"
                          {...register("customer.customer_type")}
                        />
                        <Radio
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
                        title="Last Name"
                        asterisk
                        {...register("customer.user.last_name")}
                        errormessage={errors.customer?.user?.last_name?.message}
                      />
                    </div>
                    <div className="max-w-3xl">
                      <TextField
                        title="E-mail ID"
                        asterisk
                        {...register("customer.user.email")}
                        errormessage={errors.customer?.user?.email?.message}
                      />
                    </div>

                    <div className="max-w-3xl">
                      <TextField
                        title="Mobile Number"
                        asterisk
                        {...register("customer.user.phone")}
                        errormessage={errors.customer?.user?.phone?.message}
                      />
                    </div>

                    {/* <div className="max-w-3xl">
                      <Label title="Employee" />
                      <ComboBox<Result>
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
                            title="Company ABN"
                            asterisk
                            {...register("customer.abn")}
                            errormessage={errors.customer?.abn?.message}
                          />
                        </div>
                        <div className="max-w-3xl">
                          <TextField
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
                  </div>
                </>
              </FormWraper>
            </div>
          </FormSection>

          <FormSection title="Work Types">
            <FormWraper>
              <div className="">
                <div className={jobStyles.wtGrid}>
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
                </>
              </FormWraper>
              <div className="flex justify-center gap-36 mt-10">
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
              </div>
            </div>
          </FormSection>
        </form>
      </FormProvider>
    </>
  );
};
export default CreateJob;
