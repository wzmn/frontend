import Divider from "components/divider";
import { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import { EMPLOYEE_LISTING } from "constants/api";
import { PageProps } from "gatsby";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoCallOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import TimeFormat from "services/time-format";
import * as styles from "styles/pages/common.module.scss";
import { EmpResultT } from "type/employee";
import * as companyStyles from "../company/styles.module.scss";
import { StringInBetweenReg } from "constants/regex";
import { acceptedFileType } from "../../constants";
import Button from "components/button";
import MsgToast from "services/msg-toast";

const EmployeeDetails = (props: PageProps) => {
  const { location } = props;
  // const employee = location.state as EmployeeDataType;
  const params = new URLSearchParams(location.search);
  const employeeId = params.get("employee");

  const { control, setValue, handleSubmit } = useForm<any>({
    defaultValues: {
      attachments: [{ file: null }],
    },
  });

  const [data, setData] = useState<Partial<EmpResultT>>({});
  const [docVerifyStatus, setDocVerifyStatus] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments",
  });

  const [files, setFiles] = useState<DNDImageFileType[]>([]);

  async function fetchData() {
    try {
      const response = await request<EmpResultT>({
        url: EMPLOYEE_LISTING + employeeId,
      });
      setData(() => response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fieldworkerVerification() {
    try {
      setDocVerifyStatus((prev) => !prev);
      const resp = await request({
        url: EMPLOYEE_LISTING + data.id + "/",
        method: "patch",
        data: {
          is_verified: !data.is_verified,
        },
      });
      await fetchData();
    } catch (error) {
      MsgToast("Cant verify try later", "error");
    } finally {
      setDocVerifyStatus((prev) => !prev);
    }
  }

  function onSubmit(e: any) {
    console.log(e);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grow">
      <p className={styles.title}>Employee ID: {data?.id}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Employee Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={styles.name}>
                  <span className={styles.bold}>Employee name: &nbsp; </span>
                  {data?.user?.first_name} &nbsp;cccc
                  {/* <span className={styles.tag}>(Company Owner)</span> */}
                </p>

                <div className={styles.contactInfo}>
                  <div className="">
                    <span className={styles.icon}>
                      <TfiEmail className={styles.icon} />
                    </span>

                    <span className={styles.contact}>{data?.user?.email}</span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoCallOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>{data?.user?.phone}</span>
                  </div>
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Employee Created by: &nbsp;{" "}
                  </span>
                  {data.created_by} &nbsp;
                  <span className={styles.tag2}>
                    {TimeFormat(data?.user?.created_at!)}
                  </span>
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Employee Role</span>
                  </p>

                  <div className={styles.roles}>
                    <Radio label={data?.role?.toUpperCase()!} checked={true} />
                  </div>
                </div>

                <div className="mt-8">
                  {data.role?.toLowerCase() === "field worker" ? (
                    data.is_verified ? (
                      <Button
                        isLoading={docVerifyStatus}
                        disabled={docVerifyStatus}
                        onClick={() => fieldworkerVerification()}
                        color="red"
                        title="Documents Reject"
                      />
                    ) : (
                      <Button
                        isLoading={docVerifyStatus}
                        disabled={docVerifyStatus}
                        onClick={() => fieldworkerVerification()}
                        title="Documents Verify"
                      />
                    )
                  ) : null}
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>

        {data?.documents?.length !== 0 && (
          <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
            <>
              {data?.documents?.map((docs, index: number) => {
                return (
                  <FormSection
                    title={
                      docs.detail.priority +
                      " (Points " +
                      docs.detail.points +
                      ")"
                    }
                  >
                    <>
                      <FormWraper>
                        <>
                          <p className="mb-3 font-medium ">
                            {docs?.detail?.compliance_item}
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            {docs.documents?.map((doc) => {
                              return (
                                <div className={styles.attachments}>
                                  <aside className={companyStyles.preview}>
                                    <div className="">
                                      {acceptedFileType.includes(
                                        "." +
                                          doc.file.match(StringInBetweenReg)![0]
                                      ) ? (
                                        <div className="text-gray-700">
                                          <a href={doc.file} target="_blank">
                                            View Document
                                          </a>
                                        </div>
                                      ) : (
                                        <>
                                          <a
                                            href={doc.file}
                                            className="w-full h-full"
                                            target="_blank"
                                          >
                                            <img
                                              src={doc.file}
                                              alt="/assets/images/picture.svg"
                                            />
                                          </a>
                                        </>
                                      )}
                                    </div>
                                  </aside>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      </FormWraper>
                    </>
                  </FormSection>
                );
              })}
            </>
          </form>
        )}

        {/* <FormSection title="Comments">
          <div className="flex-1">
            <FormWraper>
              <>
                <div className={styles.commentBox}>
                  <div className={styles.user}>JJ</div>
                  <div className={styles.input}>
                    <Input
                      className={styles.input}
                      varient="regular"
                      placeholder="Add a comment..."
                    />
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection> */}
      </div>
    </div>
  );
};

export default EmployeeDetails;
