import { Disclosure } from "@headlessui/react";
import Divider from "components/divider";
import Radio from "components/radio";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import TimeFormat from "services/time-format";
import * as styles from "styles/pages/view.module.scss";
import { EmpResultT } from "type/employee";

const ViewEmp = ({ data }: { data: EmpResultT }) => {
  return (
    <div className={styles.view}>
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button className={styles.details}>
              <div className="">
                <p className="text-left">
                  <span className={styles.bold}>Employee Name:</span>{" "}
                  <span className={styles.normal}>
                    {data?.user?.first_name + " " + data?.user?.last_name}
                  </span>
                </p>
                <p className={styles.tag}>{TimeFormat(data?.created_at!)}</p>
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

                  <span className={styles.contact}>{data?.user?.email}</span>
                </div>

                <div className="">
                  <span className={styles.icon}>
                    <IoCallOutline className={styles.icon} />
                  </span>

                  <span className={styles.contact}>{data?.user?.phone}</span>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="mt-3">
        <Divider />
      </div>

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Employee Created by: &nbsp; </span>
        {data?.created_by} &nbsp;
        <p className={styles.tag}>{TimeFormat(data?.user?.created_at!)}</p>
      </p>
      <div className="mt-3">
        <Divider />
      </div>

      <div className={styles.status}>
        <p className={styles.bold}>Employee Status</p>
        <Radio label={String(data?.role)} checked={true} />
      </div>
    </div>
  );
};

export default ViewEmp;
