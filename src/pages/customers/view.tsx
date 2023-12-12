import React from "react";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import * as styles from "styles/pages/view.module.scss";
import { TfiEmail } from "react-icons/tfi";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import Divider from "components/divider";
import moment from "moment";
import Radio from "components/radio";
import { LuClipboardList } from "react-icons/lu";
import { SlBell } from "react-icons/sl";

const View = ({ data }: { data: any }) => {
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
                    {data?.user?.first_name + " " + data?.user?.last_name}
                  </span>
                </p>
                <p className={styles.tag}>
                  {moment(data.user?.created_at).format("DD-MM-yyyy HH:MM a")}
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

                  <span className={styles.contact}>{data?.user?.email}</span>
                </div>

                <div className="">
                  <span className={styles.icon}>
                    <IoCallOutline className={styles.icon} />
                  </span>

                  <span className={styles.contact}>{data?.user?.phone}</span>
                </div>

                <div className="">
                  <span className={styles.icon}>
                    <IoLocationOutline className={styles.icon} />
                  </span>

                  <span className={styles.contact}>
                    {data.user?.groups || "N/A"}
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

      <div className="">
        <p className={styles.additionalInfo}>
          <span className={styles.title}>Customer Type: &nbsp;</span>Residential
        </p>

        <p className={styles.additionalInfo}>
          <span className={styles.title}>State: &nbsp;</span>State: New South
          Wales (NSW)
        </p>

        <p className={styles.additionalInfo}>
          <span className={styles.title}>LGA: &nbsp;</span> City of Swan
        </p>
      </div>

      <div className={styles.divider}>
        <Divider />
      </div>

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Company Created by: &nbsp; </span>
        {data?.created_by?.created_by || "N/A"} &nbsp;
        <span className={styles.tag}>
          {moment(data.user?.created_at).format("DD-MM-yyyy HH:MM a")}
        </span>
      </p>
      <div className={styles.divider}>
        <Divider />
      </div>

      <div className={styles.status}>
        <p className={styles.bold}>Customer Status</p>
        <Radio label="New" checked={true} />
      </div>

      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button
              className={`${styles.details} ${open ? "" : "mb-5"}`}
            >
              <div className="">
                <p className={styles.bold}>Jobs(03)</p>
              </div>
              <FaChevronDown
                className={`${open ? "rotate-180 transform" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={`${styles.panel} mb-5`}>
              {[1, 2, 3].map((item: number) => {
                return (
                  <div className={styles.job}>
                    <p className={styles.jobTitle}>Heat Pump Assessment</p>
                    <p className="">
                      Job ID : <span className={styles.tag}>789689</span>
                    </p>
                    <LuClipboardList />
                    <p className={styles.count}>3</p>
                  </div>
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button className={styles.details}>
              <div className="">
                <p className={styles.bold}>Reminders(03)</p>
              </div>
              <FaChevronDown
                className={`${open ? "rotate-180 transform" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={styles.panel}>
              {[1, 2, 3, 4, 5].map((item: number) => {
                return (
                  <div key={item} className={styles.job}>
                    <p className={styles.jobTitle}>
                      Document Validation(Customers)-CALL
                    </p>
                    <p className="">
                      Reminder ID : <span className={styles.tag}>789689</span>
                    </p>
                    <SlBell />
                  </div>
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default View;
