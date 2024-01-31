import Divider from "components/divider";
import { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import { APPOINTMENT_LISTING } from "constants/api";
import { PageProps } from "gatsby";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import TimeFormat from "services/time-format";
import * as styles from "styles/pages/common.module.scss";
import { ApptResultT } from "type/appointment";

const AppointmentDetails = (props: PageProps) => {
  const { location } = props;
  // const employee = location.state as EmployeeDataType;
  const params = new URLSearchParams(location.search);
  const apptId = params.get("appointment");

  const { control, setValue, handleSubmit } = useForm<any>({
    defaultValues: {
      attachments: [{ file: null }],
    },
  });

  const [data, setData] = useState<Partial<ApptResultT>>({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments",
  });

  const [files, setFiles] = useState<DNDImageFileType[]>([]);

  async function fetchData() {
    try {
      const response = await request<ApptResultT>({
        url: APPOINTMENT_LISTING + apptId,
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
      <p className={styles.title}>Appointment ID: {data?.id}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Appointment Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>WorkType: &nbsp; </span>
                  {data?.job?.work_type?.title}
                </p>

                <Divider />
                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>Assigned to : &nbsp; </span>
                  {`${data?.assessment_assigned_to?.first_name || "N/A"} ${
                    data?.assessment_assigned_to?.last_name || "N/A"
                  }`}
                </p>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Scheduled Date & Time : &nbsp;{" "}
                  </span>
                  {` ${
                    data?.assessment_scheduled_on
                      ? TimeFormat(data?.assessment_scheduled_on!)
                      : "N/A"
                  } `}
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Appt Status</span>
                  </p>

                  <div className={styles.roles}>
                    <Radio label={data?.appointment_status!} checked={true} />
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title="Job Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={`${styles.name}`}>
                  <span className={styles.bold}>Job ID: &nbsp; </span>
                  {data?.job?.id} &nbsp;
                  <span className={styles.tag}></span>
                </p>

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>Customer name: &nbsp; </span>
                  {data?.job?.customer.user?.first_name} &nbsp;
                  <span className={styles.tag}></span>
                </p>

                <div className={styles.contactInfo}>
                  <div className="mb-3">
                    <span className={styles.icon}>
                      <TfiEmail className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.job?.customer?.user?.email}
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className={styles.icon}>
                      <IoCallOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.job?.customer?.user?.phone}
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
                      data?.job?.address?.building_number
                        ? data?.job?.address?.building_number
                        : ""
                    } ${
                        data?.job?.address?.street_number
                          ? data?.job?.address?.street_number
                          : ""
                      } ${
                        data?.job?.address?.street_name
                          ? data?.job?.address?.street_name
                          : ""
                      }
                    
                    ${
                      data?.job?.address?.suburb
                        ? data?.job?.address?.suburb
                        : ""
                    }

${data?.job?.address?.state ? data?.job?.address?.state : ""} ${
                        data?.job?.address?.pincode
                          ? data?.job?.address?.pincode
                          : ""
                      }`}
                    </span>
                  </div>
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Customer Created by: &nbsp;{" "}
                  </span>

                  <span className={styles.tag2}>
                    {TimeFormat(data?.job?.customer?.user?.created_at!)}
                  </span>
                </p>

                <Divider />
              </>
            </FormWraper>
          </div>
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

export default AppointmentDetails;
