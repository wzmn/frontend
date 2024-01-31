import { Disclosure } from "@headlessui/react";
import Button from "components/button";
import Divider from "components/divider";
import Radio from "components/radio";
import { Link } from "gatsby";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import TimeFormat from "services/time-format";
import * as styles from "styles/pages/view.module.scss";
import { ApptResultT } from "type/appointment";

const apptStatsuBtn = {
  waiting: ["schedule"],
  confirm: [],
  assessed: [],
  audited: [],
  "snippit audited": [],
  Rescheduled: [],
  Reassessment: [],
  installed: [],
  rejected: [],
  Cancelled: [],
};

const ViewAppt = ({
  data,
  showAssessment,
  showSchedule,
}: {
  data: ApptResultT;
  showAssessment: boolean;
  showSchedule: boolean;
}) => {
  console.log(data);
  return (
    <div className={styles.view}>
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button className={styles.details}>
              <div className="">
                <div className="flex mb-2">
                  <span className={styles.bold}>Appt. Name:</span>
                  <span className={`${styles.normal} text-left`}>
                    {data.job?.work_type?.title}
                  </span>
                </div>
                <div className={styles.tag}>
                  Created on: {TimeFormat(data?.created_at)}
                </div>
              </div>
              <FaChevronDown
                className={`${open ? "rotate-180 transform" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={styles.panel}>
              <div className={styles.contactInfo}>
                <div className="mb-2">
                  <span className={styles.icon}>
                    <TfiEmail className={styles.icon} />
                  </span>

                  <span className={styles.contact}>
                    {data?.job?.customer?.user?.email}
                  </span>
                </div>

                <div className="mb-2">
                  <span className={styles.icon}>
                    <IoCallOutline className={styles.icon} />
                  </span>

                  <span className={styles.contact}>
                    {data?.job?.customer?.user?.phone}
                  </span>
                </div>

                <div className="mb-2">
                  <span className={styles.icon}>
                    <IoLocationOutline className={styles.icon} />
                  </span>

                  <span className={styles.contact}>
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

                    ${
                      data?.job?.address?.state ? data?.job?.address?.state : ""
                    } ${
                      data?.job?.address?.pincode
                        ? data?.job?.address?.pincode
                        : ""
                    }`}
                  </span>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="my-3">
        <Divider />
      </div>

      <div className="">
        {/* <p className={styles.additionalInfo}>
          <span className={styles.title}>Appt Type: &nbsp;</span>
          {data?.company_type}
        </p> */}

        <p className={styles.additionalInfo}>
          <span className={styles.title}>State: &nbsp;</span>{" "}
          {data?.job?.address?.state || "N/A"}
        </p>

        <p className={styles.additionalInfo}>
          <span className={styles.title}>LGA: &nbsp;</span>{" "}
          {data?.job?.address?.lga}
        </p>
      </div>

      <div className="my-3">
        <Divider />
      </div>

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Appt Created by: &nbsp; </span>
        {/* {data?.company_owner?.first_name} &nbsp; */}
        <span className={styles.tag}>
          {data?.job?.job_created_by?.first_name +
            " " +
            data?.job?.job_created_by?.last_name}
        </span>
      </p>

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Appt Assigned To: &nbsp; </span>
        {/* {data?.company_owner?.first_name} &nbsp; */}
        <span className={styles.tag}>
          {`${data?.assessment_assigned_to?.first_name || "N/A"} ${
            data?.assessment_assigned_to?.last_name || "N/A"
          }`}
        </span>
      </p>

      {data.appointment_status === "Confirmed" && (
        <p className={`${styles.name} ${styles.createBy}`}>
          <span className={styles.bold}>Appt Schedule Date: &nbsp; </span>
          {/* {data?.company_owner?.first_name} &nbsp; */}
          <span className={styles.tag}>
            {TimeFormat(data?.assessment_scheduled_on!)}
          </span>
        </p>
      )}

      {data.appointment_status !== "Confirmed" &&
        data.appointment_status !== "Waiting" && (
          <p className={`${styles.name} ${styles.createBy}`}>
            <span className={styles.bold}>Appt Assessed Date: &nbsp; </span>
            {/* {data?.company_owner?.first_name} &nbsp; */}
            <span className={styles.tag}>
              {TimeFormat(data?.assessment_completed_on!)}
            </span>
          </p>
        )}

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Job ID: &nbsp; </span>
        {/* {data?.company_owner?.first_name} &nbsp; */}
        <span className={styles.tag}>{data.job.id}</span>
      </p>
      <div className={styles.divider}>
        <Divider />
      </div>

      <div className={styles.status}>
        <p className={styles.bold}>Appt Status</p>
        <Radio label={data?.appointment_status ?? ""} checked={true} />
      </div>

      {showSchedule && (
        <Link
          to={`/jobs/create-appointment/?apptId=${data?.id}`}
          state={data?.job}
          className="mt-10 "
        >
          <Button
            width="full"
            title="Schedule Appt"
            icon={<RiQuestionAnswerLine />}
            className="flex-row-reverse justify-between mt-5"
          />
        </Link>
      )}

      {showAssessment && (
        <Link
          to="assessment"
          state={{
            wtId: data?.job?.work_type?.id,
            apptId: data?.id,
          }}
          className="mt-10"
        >
          <Button
            width="full"
            title="View Assessment"
            icon={<RiQuestionAnswerLine />}
            className="flex-row-reverse justify-between mt-5"
          />
        </Link>
      )}
    </div>
  );
};

export default ViewAppt;
