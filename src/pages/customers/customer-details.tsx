import Divider from "components/divider";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Radio from "components/radio";
import { CUSTOMER_LISTING } from "constants/api";
import { PageProps } from "gatsby";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ImAttachment } from "react-icons/im";
import { IoCallOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { EmployeeDataType } from "type/employee";
import * as companyStyles from "../company/styles.module.scss";

const CustomerDetails = (props: PageProps) => {
  const { location } = props;
  // const employee = location.state as EmployeeDataType;
  const params = new URLSearchParams(location.search);
  const customerId = params.get("customer");

  const { control, setValue, handleSubmit } = useForm<any>({
    defaultValues: {
      attachments: [{ file: null }],
    },
  });

  const [data, setData] = useState<EmployeeDataType>({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments",
  });

  const [files, setFiles] = useState<DNDImageFileType[]>([]);

  async function fetchData() {
    try {
      const response = await request<EmployeeDataType>({
        url: CUSTOMER_LISTING + customerId,
      });
      setData(() => response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit(e: any) {
    console.log(e);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <p className={styles.title}>Employee ID: {data?.id}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Employee Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={styles.name}>
                  <span className={styles.bold}>Employee name: &nbsp; </span>
                  {data?.user?.first_name} &nbsp;
                  <span className={styles.tag}>(Company Owner)</span>
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
                  Superadmin/Jackson &nbsp;
                  <span className={styles.tag2}>
                    {moment(data?.user?.created_at).format(
                      "DD-MM-yyyy HH:MM a"
                    )}
                  </span>
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Employee Role</span>
                  </p>

                  <div className={styles.roles}>
                    <Radio label="ADMIN" checked={data?.role === "Admin"} />
                    <Radio label="MANAGER" checked={data?.role === "Manager"} />
                    <Radio
                      label="TEAM LEADER"
                      checked={data?.role === "Team Lead"}
                    />
                    <Radio label="AGENT" checked={data?.role === "Agent"} />
                    <Radio
                      label="FIELDWORKER"
                      checked={data?.role === "Fieldworker"}
                    />
                    <Radio label="AUDITOR" checked={data?.role === "Auditor"} />
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title="Attachments">
          <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
            <FormWraper>
              <>
                <div className={styles.attachments}>
                  {fields.map((item, index: number) => {
                    return (
                      <>
                        {/* <div className={styles.file}> */}
                        <DNDImage
                          setFiles={(e) => {
                            setValue(`attachments.${index}.file`, e);
                            const list = [...files];
                            list[index] = e[0];
                            setFiles(() => list);
                          }}
                        />
                        {/* </div> */}

                        <aside className={companyStyles.preview}>
                          {files[index] ? (
                            <div className="">
                              <img
                                src={files?.[index]?.preview}
                                alt="/assets/images/picture.svg"
                                // Revoke data uri after image is loaded
                                onLoad={() => {
                                  URL.revokeObjectURL(files?.[index]?.preview);
                                }}
                              />
                              <RiDeleteBin6Line
                                className="w-5 h-5 cursor-pointer absolute top-1 right-4"
                                onClick={() => {
                                  files.splice(index, 1);
                                  remove(index);
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
                              <RiDeleteBin6Line
                                className="w-5 h-5 cursor-pointer absolute top-1 right-4"
                                onClick={() => {
                                  files.splice(index, 1);
                                  remove(index);
                                }}
                              />
                            </div>
                          )}
                        </aside>
                      </>
                    );
                  })}
                </div>
                <p
                  className={styles.addAttachments}
                  onClick={() => append({ file: null })}
                >
                  Add Attachments
                  <span className="icon">
                    <ImAttachment />
                  </span>
                </p>
              </>
            </FormWraper>
          </form>
        </FormSection>

        <FormSection title="Comments">
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
        </FormSection>
      </div>
    </>
  );
};

export default CustomerDetails;
