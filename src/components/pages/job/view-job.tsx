import { Disclosure } from "@headlessui/react";
import Divider from "components/divider";
import Radio from "components/radio";
import moment from "moment";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import * as styles from "styles/pages/view.module.scss";
import { JobDataStateType, Result } from "type/job";

const ViewJob = ({ data }: { data: Result }) => {
  return (
    <div className={styles.view}>
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button className={styles.details}>
              <div className="">
                <p className="">
                  <span className={styles.bold}>Customer Name:</span>{" "}
                  <span className={styles.normal}>
                    {data?.customer?.user?.first_name +
                      " " +
                      data?.customer?.user?.last_name}
                  </span>
                </p>
                <p className={styles.tag}>
                  {moment(data?.customer?.user?.created_at).format(
                    "DD-MM-yyyy HH:MM a"
                  )}
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
                    {data?.customer?.user?.groups || "N/A"}
                  </span>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className={styles.divider}>
        <Divider />
      </div>

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Job Created by: &nbsp; </span>
        {data?.job_created_by} &nbsp;
        <p className={styles.tag}>
          {moment(data?.customer?.user?.created_at).format(
            "DD-MM-yyyy HH:MM a"
          )}
        </p>
      </p>

      <Divider />

      <div className={`${styles.status} mt-5`}>
        <p className={styles.bold}>Job Status</p>
        <Radio label={String(data?.job_status)} checked={true} />
      </div>
    </div>
  );
};

export default ViewJob;
