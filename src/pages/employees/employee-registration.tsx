import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import Button from "components/button";
import ButtonGroup from "components/button-group";
import ComboBox, { ComboBoxDataT } from "components/combo-box";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Label from "components/label";
import UploadDoc from "components/pages/company/upload-doc/upload-doc";
import Radio from "components/radio";
import TextField from "components/text-field";
import { COUNTRY_COMPLIANCE, EMPLOYEE_LISTING } from "constants/api";
import { navigate } from "gatsby";
import * as companyStyles from "pages/company/styles.module.scss";
import { fetchEmpStatus } from "providers/app-provider/emp";
import { useAuthContext } from "providers/auth-provider";
import { useCompanyContext } from "providers/company-provider";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { ChangeEvent, useEffect, useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import {
  EmployeeRegistrationSchemaType,
  employeeRegistrationSchema,
} from "schema/employee-schema";
import employeeList from "services/employee-list";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import UserIdentifyer from "services/user-identifyer";
import * as styles from "styles/pages/common.module.scss";
import { EmpResultT, EmpStatusT } from "type/employee";
import { ComplianceRespT, ComplianceResultT } from "type/global";
import { debounce } from "utility/debounce";

interface FileProps extends File {
  preview: string;
}

type ComplianceState = {
  primary: ComplianceResultT[];
  secondary: ComplianceResultT[];
  additional: ComplianceResultT[];
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

const roleBaseList: Record<any, string[]> = {
  Manager: ["Admin"],
  "Team Lead": ["Admin", "Manager"],
};

const empRoleList = [
  {
    label: "ADMIN",
    value: "Admin",
  },
  {
    label: "MANAGER",
    value: "Manager",
  },
  {
    label: "TEAM LEAD",
    value: "Team Lead",
  },
  {
    label: "FIELDWORKER",
    value: "Field Worker",
  },
  {
    label: "AUDITOR",
    value: "Auditor",
  },
  {
    label: "AGENT",
    value: "Agent",
  },
];

const showEmpFieldFor = [
  "superadmin",
  "admin",
  "owner",
  "manager",
  "team lead",
];

const EmployeeRegistration = () => {
  const [OTP, setOTP] = useState<string>("");
  const [files, setFiles] = useState<FileProps[]>([]);
  const { toggle, open, setElement } = useRightBarContext();
  const userRole = UserIdentifyer();

  const [compliance, setCompliance] = useState<ComplianceState>(initialState());
  const [empListData, setEmpListData] = useState<ComboBoxDataT[]>([]);
  const [empRoleData, setEmpRoleData] = useState<EmpStatusT[]>([]);
  const params = new URLSearchParams(location.search);
  const companyId = params.get("companyId");

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<EmployeeRegistrationSchemaType>({
    resolver: yupResolver(employeeRegistrationSchema),
  });

  const userPhone = watch("user.phone");

  const empRole = watch("role");
  const { company } = useCompanyContext();

  async function fetchEmpRoles() {
    const statusData = await fetchEmpStatus({
      company_type: company.company_type,
    });
    setEmpRoleData(() => statusData.statusData!);
  }

  async function onSubmit(data: EmployeeRegistrationSchemaType) {
    try {
      const response = await request({
        url: EMPLOYEE_LISTING,
        method: "post",
        data: { ...data, company: companyId },
      });
      console.log(response);
      MsgToast("Added Sucessfully", "success");
      navigate(-1);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          MsgToast("Server Error!!!", "error");
          return;
        }
        MsgToast(error?.response?.data?.error, "error");
      } else {
        MsgToast("Something Went Wrong", "error");
      }
    }
  }

  function handleChange(OTP: string) {
    setOTP(OTP);
  }

  async function fetchCountryCompliance() {
    try {
      const response = await request<ComplianceRespT>({
        url: COUNTRY_COMPLIANCE,
        params: {
          company_country: "Australia",
        },
      });
      const list = initialState();

      response?.data?.results?.forEach((item) => {
        list[item?.priority?.toLowerCase()!].push(item);
      });

      setCompliance(() => list);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEmployeeList(e?: ChangeEvent<HTMLInputElement>) {
    try {
      // if (!id) {
      //   alert("Please Select Country");
      //   return;
      // }
      const res = await employeeList({
        search: e?.target?.value,
        license_id__company__id: companyId,
        role__title__in: ["Admin", "Manager", "Team Lead"].toString(),
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
    fetchCountryCompliance();
    handleEmployeeList();

    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {
    fetchEmpRoles();
  }, [JSON.stringify(company)]);

  return (
    <div className="grow">
      <p className={styles.title}>Create Employee</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-3">
        <FormSection title="Employee Details">
          <div className="flex-1">
            <FormWraper>
              <>
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
                  <div className="max-w-3xl">
                    <TextField
                      title="E-mail ID"
                      asterisk
                      {...register("user.email")}
                      errormessage={errors.user?.email?.message}
                    />
                  </div>
                </div>
                {showEmpFieldFor.includes(userRole) && (
                  <div className={styles.formGrid}>
                    <div className="max-w-3xl mt-4">
                      <Label title="Report To" />
                      <ComboBox<EmpResultT>
                        placeholder="Employee"
                        data={empListData}
                        handleSelect={(e) => {
                          setValue("reports_to", String(e?.id));
                        }}
                        onChange={debounce(handleEmployeeList)}
                      />
                      <p className={styles.errorMessage}>
                        {errors.reports_to?.message}
                      </p>
                    </div>
                  </div>
                )}

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Employee Role</span>
                  </p>
                  <div className={styles.roles}>
                    {empRoleData?.map((role) => {
                      // if (roleBaseList?.[role?.value]?.includes(role.value)) {
                      //   return null;
                      // }

                      return <RoleHandler register={register} role={role} />;
                    })}
                  </div>
                </div>
                <p className={styles.errorMessage}>{errors.role?.message}</p>
              </>
            </FormWraper>
          </div>
        </FormSection>

        {empRole === "Field Worker" && (
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
                        <UploadDoc
                          title="Primary Documents"
                          data={compliance.primary}
                        />,
                        "Upload Primary Documents"
                      );
                      !open && toggle();
                    }}
                    title="Upload Primary Documents"
                    groupTitle="Upload"
                  />
                  <ButtonGroup
                    onClick={() => {
                      setElement(
                        <UploadDoc
                          title="Secondary Documents"
                          data={compliance.secondary}
                        />,
                        "Upload Secondary Documents"
                      );
                      !open && toggle();
                    }}
                    title="Upload Secondary Documents"
                    groupTitle="Upload"
                  />
                  <ButtonGroup
                    onClick={() => {
                      setElement(
                        <UploadDoc
                          title="Additional Documents"
                          data={compliance.additional}
                        />,
                        "Upload Additional Documents"
                      );
                      !open && toggle();
                    }}
                    title="Upload Additional Documents"
                    groupTitle="Upload"
                  />
                </div>
              </div>
            </FormWraper>
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
            type="button"
            title="Cancel"
            color="red"
            className="py-10"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
      </form>
    </div>
  );
};

function RoleHandler({
  role,
  register,
}: {
  role: EmpStatusT;
  register: UseFormRegister<EmployeeRegistrationSchemaType>;
}) {
  const { userAuth } = useAuthContext();
  if (role?.title.toLowerCase() === "owner") return null;
  return (
    <>
      {(role?.is_snippit_only && userAuth.staff === "true") ||
      (role?.is_snippit_only &&
        userAuth.emp_license_info.company.company_name ===
          "Snippit Central") ? (
        <Radio
          label={role?.title?.toUpperCase()}
          value={role?.title}
          {...register("role")}
        />
      ) : (
        <Radio
          label={role?.title?.toUpperCase()}
          value={role?.title}
          {...register("role")}
        />
      )}
    </>
  );
}

export default EmployeeRegistration;
