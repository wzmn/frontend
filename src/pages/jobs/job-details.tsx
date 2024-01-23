import Button from "components/button";
import Divider from "components/divider";
import { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import { APPOINTMENT_LISTING, JOB_LISTING } from "constants/api";
import { Link, PageProps } from "gatsby";
import useQuickFetch from "hook/quick-fetch";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { ImSpinner10 } from "react-icons/im";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import TimeFormat from "services/time-format";
import * as additionalStyles from "styles/pages/additional.module.scss";
import * as styles from "styles/pages/common.module.scss";
import { AppointmentDataType, ApptResultT } from "type/appointment";
import { Result } from "type/job";

const JobDetails = (props: PageProps) => {
  const { location } = props;
  // const employee = location.state as EmployeeDataType;
  const params = new URLSearchParams(location.search);
  const jobId = params.get("job");

  const { control, setValue, handleSubmit } = useForm<any>({
    defaultValues: {
      attachments: [{ file: null }],
    },
  });

  const [data, setData] = useState<Result>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments",
  });

  const [files, setFiles] = useState<DNDImageFileType[]>([]);

  const {
    response: apptResp,
    error: apptErr,
    lodaing: apptLoading,
  } = useQuickFetch<AppointmentDataType>(
    {
      url: APPOINTMENT_LISTING,
      params: {
        job__in: data?.id,
      },
    },
    [JSON.stringify(data)]
  );

  async function fetchData() {
    try {
      const response = await request<Result>({
        url: JOB_LISTING + jobId,
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
    <div className="grow">
      <p className={styles.title}>Job ID: {data?.id}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Customer Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={styles.name}>
                  <span className={styles.bold}>Customer name: &nbsp; </span>
                  {data?.customer?.user?.first_name} &nbsp;
                  <span className={styles.tag}></span>
                </p>

                <div className={styles.contactInfo}>
                  <div className="">
                    <span className={styles.icon}>
                      <TfiEmail className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.customer?.user?.email}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoCallOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.customer?.user?.phone}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoLocationOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {/* {data?.customer?.user?.groups || "N/A"} */}
                      {`
                    ${
                      data?.address.building_number
                        ? data.address?.building_number
                        : ""
                    } ${
                        data?.address?.street_number
                          ? data.address?.street_number
                          : ""
                      } ${
                        data?.address?.street_name
                          ? data.address?.street_name
                          : ""
                      }
                    
                    ${data?.address?.suburb ? data.address?.suburb : ""}

${data?.address?.state ? data?.address?.state : ""} ${
                        data?.address?.pincode ? data.address?.pincode : ""
                      }`}
                    </span>
                  </div>
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>Job Created by: &nbsp; </span>
                  {`${
                    data?.job_created_by?.first_name
                      ? data?.job_created_by?.first_name +
                        " " +
                        data?.job_created_by?.first_name
                      : "N/A"
                  }`}{" "}
                  &nbsp;
                  <span className={styles.tag2}>
                    {TimeFormat(data?.customer?.user?.created_at!)}
                  </span>
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Job Status</span>
                  </p>

                  <div className={styles.roles}>
                    <Radio
                      label={data?.job_status?.toUpperCase()!}
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

        <FormSection title="Appointments">
          <FormWraper>
            <>
              <div className={additionalStyles.cardCont + " relative"}>
                {apptResp?.results?.length! > 0 ? (
                  <>
                    {apptResp?.results?.map((item) => {
                      return (
                        <List key={item.id} data={item} index={1} loading />
                      );
                    })}
                    <div className="flex justify-between w-full items-center">
                      <Link to="/jobs/create-appointment" state={data}>
                        <Button
                          width="full"
                          title="Create Appointment"
                          icon={<AiOutlinePlus />}
                          className="flex-row-reverse justify-between"
                        />
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {apptLoading ? (
                      <>
                        <div className="absolute left-3 top-0 text-blue-500">
                          <ImSpinner10 className="animate-spin" />
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between w-full items-center">
                        No Appointment{" "}
                        <Link to="/jobs/create-appointment" state={data}>
                          <Button
                            width="full"
                            title="Create Appointment"
                            icon={<AiOutlinePlus />}
                            className="flex-row-reverse justify-between"
                          />
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          </FormWraper>
        </FormSection>

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
  data: ApptResultT;
  loading: boolean;
  index: number;
}) {
  // target="_blank" href={`customer-details/?customer=${data.id}`}

  return (
    <div>
      <div className={`${styles.card} ${additionalStyles.cardOther} w-56`}>
        <div className={styles.cardInfo}>
          <p className="title">
            {`${data?.job?.customer?.user?.first_name} ${data?.job?.customer?.user?.last_name}`}
          </p>
          <span className="">
            {" "}
            Created on: {TimeFormat(data?.created_at, "ddd, MM a")}
          </span>
        </div>
        <div className={`${styles.contactInfo} ${additionalStyles.contact}`}>
          <div className="">
            <span className={styles.icon}>
              <TfiEmail className={styles.icon} />
            </span>

            <span className={styles.contact}>
              {data?.job?.customer?.user?.email}
            </span>
          </div>

          <div className="">
            <span className={styles.icon}>
              <IoCallOutline className={styles.icon} />
            </span>

            <span className={styles.contact}>
              {data?.job?.customer?.user?.phone}
            </span>
          </div>

          <LuClipboardList className={additionalStyles.absIcon} />
          {/* <p className={additionalStyles.count}>3</p> */}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
