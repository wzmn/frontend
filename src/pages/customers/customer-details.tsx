import Divider from "components/divider";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Radio from "components/radio";
import { CUSTOMER_LISTING } from "constants/api";
import { Link, PageProps } from "gatsby";
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
import * as companyStyles from "./styles.module.scss";
import { LuClipboardList } from "react-icons/lu";

const CustomerDetails = (props: PageProps) => {
  const { location } = props;
  // const employee = location.state as EmployeeDataType;
  const params = new URLSearchParams(location.search);
  const customerId = params.get("customer");

  //   const { control, setValue, handleSubmit } = useForm<any>({
  //     defaultValues: {
  //       attachments: [{ file: null }],
  //     },
  //   });

  const [data, setData] = useState<EmployeeDataType>({});

  //   const { fields, append, remove } = useFieldArray({
  //     control,
  //     name: "attachments",
  //   });

  //   const [files, setFiles] = useState<DNDImageFileType[]>([]);

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
      <p className={styles.title}>Customer ID: {data?.id}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Customer Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={styles.name}>
                  <span className={styles.bold}>Customer name: &nbsp; </span>
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
                    Customer Created by: &nbsp;{" "}
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
                    <span className={styles.bold}>Customer Role</span>
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

        {/* <FormSection title="Attachments">
          <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
            <FormWraper>
              <>
                <div className={styles.attachments}>
                  {fields.map((item, index: number) => {
                    return (
                      <>
                        
                        <DNDImage
                          setFiles={(e) => {
                            setValue(`attachments.${index}.file`, e);
                            const list = [...files];
                            list[index] = e[0];
                            setFiles(() => list);
                          }}
                        />
                        

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
        </FormSection> */}

        <FormSection title="Jobs with Appts">
          <FormWraper>
            <div className={companyStyles.cardCont}>
              {[1, 2, 3, 4].map((item) => {
                return <List key={item} data={{}} index={1} loading />;
              })}
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title="Reminders">
          <FormWraper>
            <div className={companyStyles.cardCont}>
              {[1, 2, 3, 4].map((item) => {
                return (
                  <Link to="/customers/reminder/" key={item}>
                    <List data={{}} index={1} loading />
                  </Link>
                );
              })}
            </div>
          </FormWraper>
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

function List({
  data,
  loading,
  index,
}: {
  data: any;
  loading: boolean;
  index: number;
}) {
  // target="_blank" href={`customer-details/?customer=${data.id}`}

  return (
    <div>
      <div className={`${styles.card} ${companyStyles.card}`}>
        <div className={styles.cardInfo}>
          <p className="title">
            {/* {data.user?.first_name} */}
            Jason Stone
          </p>
          <span className="">
            {" "}
            {/* Created on: {moment(data.user?.created_at).format("ddd, MM a")} */}
            created on: Mon,3.40 am
          </span>
        </div>
        <div className={`${styles.contactInfo} ${companyStyles.contact}`}>
          <div className="">
            <span className={styles.icon}>
              <TfiEmail className={styles.icon} />
            </span>

            <span className={styles.contact}>
              {/* {data.user?.email} */}
              jason@gmail.com
            </span>
          </div>

          <div className="">
            <span className={styles.icon}>
              <IoCallOutline className={styles.icon} />
            </span>

            <span className={styles.contact}>
              {/* {data.user?.phone} */}
              jason@gmail.com
            </span>
          </div>

          <LuClipboardList className={companyStyles.absIcon} />
          <p className={companyStyles.count}>3</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
