import Divider from "components/divider";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Radio from "components/radio";
import { JOB_LISTING } from "constants/api";
import { Link, PageProps, navigate } from "gatsby";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ImAttachment } from "react-icons/im";
import { IoCallOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { JobDataType, Result } from "type/job";
import * as companyStyles from "../company/styles.module.scss";
import * as additionalStyles from "styles/pages/additional.module.scss";
import { LuClipboardList } from "react-icons/lu";
import TextButton from "components/text-button";
import { GoPlus } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "components/button";

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
                    {moment(data?.customer?.user?.created_at).format(
                      "DD/MM/yyyy hh:mm a"
                    )}
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
              {/* <div className={additionalStyles.cardCont}>
                {[1, 2, 3, 4].map((item) => {
                  return <List key={item} data={{}} index={1} loading />;
                })}
              </div>
              <TextButton
                className="mt-5"
                label="Create Appointment"
                icon={<GoPlus />}
                onClick={() => {
                  navigate("/jobs/create-appointment", {
                    state: data,
                  });
                }}
              /> */}
              <div className="flex justify-between w-full items-center">
                No Appointment{" "}
                {/* <Link to="#">
                  <Button
                    width="full"
                    title="Create Appointment"
                    icon={<AiOutlinePlus />}
                    className="flex-row-reverse justify-between"
                  />
                </Link> */}
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
  data: any;
  loading: boolean;
  index: number;
}) {
  // target="_blank" href={`customer-details/?customer=${data.id}`}

  return (
    <div>
      <div className={`${styles.card} ${additionalStyles.card}`}>
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
        <div className={`${styles.contactInfo} ${additionalStyles.contact}`}>
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

          <LuClipboardList className={additionalStyles.absIcon} />
          <p className={additionalStyles.count}>3</p>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
