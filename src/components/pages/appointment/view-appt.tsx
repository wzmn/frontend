import { Disclosure } from "@headlessui/react";
import Button from "components/button";
import Divider from "components/divider";
import Radio from "components/radio";
import { Link } from "gatsby";
import moment from "moment";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import * as styles from "styles/pages/view.module.scss";
import { Result } from "type/appointment";

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
  data: Result;
  showAssessment: boolean;
  showSchedule: boolean;
}) => {
  return (
    <div className={styles.view}>
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button className={styles.details}>
              <div className="">
                <p className="">
                  <span className={styles.bold}>Appt Name:</span>{" "}
                  <span className={styles.normal}>
                    {data.job?.work_type?.title}
                  </span>
                </p>
                <p className={styles.tag}>
                  {moment(data?.created_at).format("DD-MM-yyyy HH:MM a")}
                </p>
              </div>
              <FaChevronDown
                className={`${open ? "rotate-180 transform" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={styles.panel}>
              <div className={styles.contactInfo}>
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

                <div className="">
                  <span className={styles.icon}>
                    <IoLocationOutline className={styles.icon} />
                  </span>

                  <span className={styles.contact}>
                    {`${data?.job?.address?.building_number} ${data?.job?.address?.lga} ${data?.job?.address?.pincode}` ||
                      "N/A"}
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
          {moment(data?.created_at).format("DD/MM/yyyy hh:mm a")}
        </span>
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
          className="mt-10"
        >
          <Button
            width="full"
            title="Schedule Appt"
            icon={<RiQuestionAnswerLine />}
            className="flex-row-reverse justify-between"
          />
        </Link>
      )}

      {/* {showAssessment && ( */}
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
          className="flex-row-reverse justify-between"
        />
      </Link>
      {/* )} */}
    </div>
  );
};

export default ViewAppt;
