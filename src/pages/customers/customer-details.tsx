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
import { ImAttachment, ImSpinner10 } from "react-icons/im";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { EmployeeDataType } from "type/employee";
import * as additionalStyles from "styles/pages/additional.module.scss";
import { LuClipboardList } from "react-icons/lu";
import { JOB_LISTING, REMINDER_LISTING } from "constants/api";
import useQuickFetch from "hook/quick-fetch";
import Button from "components/button";
import { AiOutlinePlus } from "react-icons/ai";
import { CustomerDataType, Result } from "type/customer";
import { JobDataType, Result as JobResultT } from "type/job";

const CustomerDetails = (props: PageProps) => {
  const { location } = props;
  // const employee = location.state as EmployeeDataType;
  const params = new URLSearchParams(location.search);
  const customerId = params.get("customer");

  const {
    response: jobResp,
    error: jobErr,
    lodaing: jobLoading,
  } = useQuickFetch<JobDataType>(
    {
      url: JOB_LISTING,
      params: {
        search: customerId,
      },
    },
    []
  );

  const [loading, setLoading] = useState(false);

  const {
    response: reminderResp,
    error: reminderErr,
    lodaing: reminderLoading,
  } = useQuickFetch<any>(
    {
      url: REMINDER_LISTING,
      params: {
        id: customerId,
      },
    },
    []
  );

  const [status, setStaus] = useState({
    fresh: [],
    contacted: [],
    converted: [],
    "not interested": [],
  });
  //   const { control, setValue, handleSubmit } = useForm<any>({
  //     defaultValues: {
  //       attachments: [{ file: null }],
  //     },
  //   });

  const [data, setData] = useState<Result>();

  //   const { fields, append, remove } = useFieldArray({
  //     control,
  //     name: "attachments",
  //   });

  //   const [files, setFiles] = useState<DNDImageFileType[]>([]);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await request<Result>({
        url: CUSTOMER_LISTING + customerId,
      });
      setData(() => response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
      <p className={styles.title}>Customer ID: {data?.id}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Customer Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <div className="mb-2">
                  <p className={styles.name}>
                    <span className={styles.bold}>Customer name: &nbsp; </span>
                    {data?.user?.first_name}&nbsp;{data?.user?.last_name}&nbsp;
                    {/* <span className={styles.tag}>(Company Owner)</span> */}
                  </p>
                </div>
                <div className={styles.contactInfo}>
                  <div className="mb-2">
                    <span className={styles.icon}>
                      <TfiEmail className={styles.icon} />
                    </span>

                    <span className={styles.contact}>{data?.user?.email}</span>
                  </div>

                  <div className="mb-2">
                    <span className={styles.icon}>
                      <IoCallOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>{data?.user?.phone}</span>
                  </div>

                  <div className="user-address">
                    <span className={styles.icon}>
                      <IoLocationOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {/* {data?.user?.groups || "N/A"} */}
                      {`
                    ${
                      data?.address?.building_number
                        ? data?.address?.building_number
                        : ""
                    } ${
                        data?.address?.street_number
                          ? data?.address?.street_number
                          : ""
                      } ${
                        data?.address?.street_name
                          ? data.address?.street_name
                          : ""
                      }
                    
                    ${data?.address?.suburb ? data.address?.suburb : ""}

                    ${data?.address?.state ? data.address?.state : ""} ${
                        data?.address?.pincode ? data.address?.pincode : ""
                      }`}
                    </span>
                  </div>
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Customer Created by: &nbsp;{" "}
                  </span>
                  {`${
                    data?.customer_created_by?.user.first_name
                      ? data?.customer_created_by?.user.first_name
                      : "N/A"
                  } ${
                    data?.customer_created_by?.user.last_name
                      ? data?.customer_created_by?.user.last_name
                      : "N/A"
                  }`}{" "}
                  <span className={styles.tag2}>
                    {moment(data?.user?.created_at).format(
                      "DD/MM/yyyy hh:mm a"
                    )}
                  </span>
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Customer Status</span>
                  </p>

                  {/* <div className={styles.roles}>
                    {Object.keys(status).map((s) => (
                      <Radio
                        label={s.toUpperCase()}
                        checked={(data as any)?.cust_status === s}
                      />
                    ))}
                  </div> */}
                  <div className={styles.roles}>
                    <Radio
                      label={
                        data?.cust_status?.toUpperCase()?.replace("_", " ")!
                      }
                      checked={true}
                    />
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
                        

                        <aside className={additionalStyles.preview}>
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

        <FormSection title="Job">
          <FormWraper>
            <div className={additionalStyles.cardCont + " relative"}>
              {jobResp?.results?.length! > 0 ? (
                jobResp?.results?.map((item) => {
                  return <List key={item.id} data={item} index={1} loading />;
                })
              ) : (
                <>
                  {loading ? (
                    <>
                      <div className="absolute left-3 top-0 text-blue-500">
                        <ImSpinner10 className="animate-spin" />
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between w-full items-center">
                      No Job{" "}
                      {/* <Link to="#">
                  <Button
                    width="full"
                    title="Create Appointment"
                    icon={<AiOutlinePlus />}
                    className="flex-row-reverse justify-between"
                  />
                </Link> */}
                    </div>
                  )}
                </>
              )}
              {}
            </div>
          </FormWraper>
        </FormSection>

        {/* <FormSection title="Reminders">
          <FormWraper>
            <div className={additionalStyles.cardCont}>
              {reminderResp.results?.length > 0 ? (
                reminderResp.results.map((item: any) => {
                  return (
                    <Link to="/customers/reminder/" key={item}>
                      <List data={{}} index={1} loading />
                    </Link>
                  );
                })
              ) : (
                <div className="flex justify-between w-full items-center">
                  No Reminders{" "}
                  <Link to="/customers/create-reminder">
                    <Button
                      width="full"
                      title="Create Reminder"
                      icon={<AiOutlinePlus />}
                      className="flex-row-reverse justify-between"
                    />
                  </Link>
                </div>
              )}
            </div>
          </FormWraper>
        </FormSection> */}

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

function List({
  data,
  loading,
  index,
}: {
  data: JobResultT;
  loading: boolean;
  index: number;
}) {
  // target="_blank" href={`customer-details/?customer=${data.id}`}

  return (
    <div
      onClick={() => {
        window.open(`/jobs/job-details/?job=${data.id}`, "_blank");
      }}
      className={`${styles.card} ${additionalStyles.card}`}
    >
      <div className={styles.cardInfo}>
        <p className="title">
          {`${data.customer?.user?.first_name}  ${data.customer?.user?.first_name}`}
        </p>
        <span className="">
          {" "}
          Created on: {moment(data.created_at).format("ddd, MM hh:mm a")}
        </span>
      </div>
      <div className={`${styles.contactInfo} ${additionalStyles.contact}`}>
        <div className="flex">
          <span className={styles.icon}>
            <TfiEmail className={styles.icon} />
          </span>

          <span className={styles.contact}>{data.customer?.user?.email}</span>
        </div>

        <div className="">
          <span className={styles.icon}>
            <IoCallOutline className={styles.icon} />
          </span>

          <span className={styles.contact}>
            {/* {data.user?.phone} */}

            {data.customer?.user?.phone}
          </span>
        </div>

        <LuClipboardList className={additionalStyles.absIcon} />
        {/* <p className={additionalStyles.count}>3</p> */}
      </div>
    </div>
  );
}

export default CustomerDetails;
