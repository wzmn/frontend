import Divider from "components/divider";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Radio from "components/radio";
import { APPOINTMENT_LISTING } from "constants/api";
import { PageProps } from "gatsby";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ImAttachment } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { Result } from "type/appointment";
import * as companyStyles from "../company/styles.module.scss";
import { TfiEmail } from "react-icons/tfi";
import { IoCallOutline } from "react-icons/io5";

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

  const [data, setData] = useState<Partial<Result>>({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments",
  });

  const [files, setFiles] = useState<DNDImageFileType[]>([]);

  async function fetchData() {
    try {
      const response = await request<Result>({
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
      <p className={styles.title}>Appointmnet ID: {data?.id}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Appointmnet Details">
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
                  {` ${data?.job?.job_assigned_to?.role}/${data?.job?.job_assigned_to?.user.first_name} ${data?.job?.job_assigned_to?.user.last_name}`}
                </p>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Scheduled Date & Time : &nbsp;{" "}
                  </span>
                  {` ${data?.assessment_scheduled_on}`}
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Employee Role</span>
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
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Customer Created by: &nbsp;{" "}
                  </span>

                  <span className={styles.tag2}>
                    {moment(data?.job?.customer?.user?.created_at).format(
                      "DD-MM-yyyy HH:MM a"
                    )}
                  </span>
                </p>

                <Divider />
              </>
            </FormWraper>
          </div>
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
    </div>
  );
};

export default AppointmentDetails;
