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
  superAndAdminSchema,
} from "schema/customer-schema";
import * as styles from "styles/pages/common.module.scss";
// https://visgl.github.io/react-google-map
import ComboBox, { ComboBoxDataT } from "components/combo-box";
import Label from "components/label";
import SelectBox from "components/selectBox";
import { CUSTOMER_LISTING } from "constants/api";
import { useAuthContext } from "providers/auth-provider";
import { useCompanyContext } from "providers/company-provider";
import { toast } from "react-toastify";
import Address from "services/address";
import employeeList from "services/employee-list";
import { request } from "services/http-request";
import UserIdentifyer from "services/user-identifyer";
import { Result } from "type/company";
import { debounce } from "utility/debounce";
import { navigate } from "gatsby";

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

function dynamicSchema(role: string) {
  if (role === "superadmin") {
    return customerRegistrationSchema.concat(superAndAdminSchema);
  } else if (role === "admin") {
    return customerRegistrationSchema.concat(superAndAdminSchema);
  }

  return customerRegistrationSchema;
}

const customerRegistration = () => {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [empListData, setEmpListData] = useState<ComboBoxDataT[]>([]);
  const { company } = useCompanyContext();
  const { userAuth } = useAuthContext();
  const userRole = UserIdentifyer();
  const [empInput, setEmpInput] = useState("");
  const methods = useForm<CustomerRegistrationSchemaType>({
    resolver: yupResolver(dynamicSchema(userRole)),
  });

  const companyListRef = useRef<HTMLInputElement>();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  function companyIdFetcher(role: string) {
    switch (role) {
      case "superadmin":
        if (JSON.stringify(company) === "{}") {
          alert("please select the company");
          return null;
        }
        return company.id;
      case "admin":
        return userAuth.emp_license_info.company.id;
      default:
        return userAuth.emp_license_info.company.id;
    }
  }

  async function onSubmit(data: CustomerRegistrationSchemaType) {
    try {
      const id = companyIdFetcher(userRole);
      if (id === null) return;
      const dt = {
        user: data.user,
        assigned_to: data.assigned_to,
        company: id,
      };

      const response = await request({
        url: CUSTOMER_LISTING,
        method: "post",
        data: dt,
      });
      toast.success("Added Sucessfully");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function handleEmployeeList(e: ChangeEvent<HTMLInputElement>) {
    try {
      const id = companyIdFetcher(userRole);
      if (id === null) return;
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
    // handleEmployeeList();
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {}, [companyListRef]);

  return (
    <>
      <p className={styles.title}>Create Customer</p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-3">
          <FormSection title="Customer Details">
            <div className="z-10 grow">
              <FormWraper>
                <>
                  <div className="my-10">
                    <div className={`${styles.userRole}`}>
                      <p className={styles.name}>
                        <span className={styles.bold}>Customer Type</span>
                      </p>

                      <div className={`${styles.roles}`}>
                        <Radio
                          value="Business"
                          label="Business"
                          {...register("customer_type")}
                        />
                        <Radio
                          value="Residential"
                          label="Residential"
                          {...register("customer_type")}
                        />
                      </div>
                    </div>
                    <p className={styles.error}>
                      {errors.customer_type?.message}
                    </p>
                  </div>
                  <div className={styles.formGrid}>
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

                    {showEmpFieldFor.includes(userRole) && (
                      <>
                        <div className="max-w-3xl">
                          <Label title="Employee Role" />
                          <SelectBox
                            color="full-white"
                            data={countries}
                            // asterisk
                            onChange={(e) => {
                              setValue("emp_role", e.label);
                            }}
                          />
                          <p className={styles.error}>
                            {errors.emp_role?.message}
                          </p>
                        </div>

                        <div className="max-w-3xl">
                          <Label title="Employee" />
                          <ComboBox<Result>
                            data={empListData}
                            handleSelect={(e) => {
                              setValue("assigned_to", String(e?.id!));
                            }}
                            onChange={debounce(handleEmployeeList)}
                          />
                          <p className={styles.error}>
                            {errors.assigned_to?.message}
                          </p>
                        </div>
                      </>
                    )}
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
                </>
              </FormWraper>
              <div className="flex justify-center gap-36 mt-10">
                <Button title="Submit" type="submit" isLoading={isSubmitting} />

                <Button title="Cancel" color="red" className="py-10" />
              </div>
            </div>
          </FormSection>
        </form>
      </FormProvider>
    </>
  );
};

export default customerRegistration;
