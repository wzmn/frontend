import React, { useEffect } from "react";
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
import { Result as CustomerResult } from "type/customer";
import useQuickFetch from "hook/quick-fetch";
import { JOB_LISTING } from "constants/api";
import { JobDataType } from "type/job";

import { Link } from "gatsby";
import Button from "components/button";
import { AiOutlinePlus } from "react-icons/ai";

const ViewCustomer = ({ data }: { data: CustomerResult }) => {
  const {
    response: jobResp,
    error: jobErr,
    lodaing: jobLoading,
  } = useQuickFetch<JobDataType>(
    {
      url: JOB_LISTING,
      params: {
        search: data?.user?.email,
      },
    },
    [JSON.stringify(data)]
  );

  return (
    <div className={styles.view}>
      {/* {JSON.stringify(data)} */}
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button className={styles.details}>
              <div className="">
                <p className="mb-1">
                  <span className={styles.bold}>Customer Name:</span>{" "}
                  <span className={styles.normal}>
                    {data?.user.last_name} &nbsp; {data?.user.last_name}
                    {/* {data?.user?.first_name + " " + data?.user?.last_name} */}
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
      <div className="my-3">
        <Divider />
      </div>

      <div className="">
        <p className={styles.additionalInfo}>
          <span className={styles.title}>Customer Type: &nbsp;</span>
          {data.customer_type}
        </p>

        <p className={styles.additionalInfo}>
          <span className={styles.title}>State: &nbsp;</span>State: New South
          Wales (NSW)
        </p>

        <p className={styles.additionalInfo}>
          <span className={styles.title}>LGA: &nbsp;</span> City of Swan
        </p>
      </div>

      <div className="my-3">
        <Divider />
      </div>

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Customer Created by: &nbsp; </span>
        {data?.created_at || "N/A"} &nbsp;
        <span className={styles.tag}>
          {moment(data.user?.created_at).format("DD-MM-yyyy HH:MM a")}
        </span>
      </p>
      <div className="my-3">
        <Divider />
      </div>

      <div className="flex justify-between">
        <p className={styles.bold}>Customer Status</p>
        <Radio label="New" checked={true} />
      </div>

      <div className="my-3">
        <Divider />
      </div>
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button
              className={`${styles.details} ${open ? "" : "mb-1"}`}
            >
              <div className="">
                <p className={styles.bold}>Jobs({jobResp?.results?.length})</p>
              </div>
              <FaChevronDown
                className={`${open ? "rotate-180 transform" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={`${styles.panel} mb-5`}>
              {jobResp.results?.map((item, idx, array) => {
                return (
                  <div className={styles.job}>
                    <p className={styles.jobTitle}>{item.work_type?.title}</p>
                    <p className="">
                      Job ID : <span className={styles.tag}>{item.id}</span>
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
      <div className={styles.divider}>
        <Divider />
      </div>
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button
              className={`${styles.details} ${open ? "" : "mb-5"}`}
            >
              <div className="">
                <p className={styles.bold}>Reminders(03)</p>
              </div>
              <FaChevronDown
                className={`${open ? "rotate-180 transform" : ""} font-light`}
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
      <Link to="customer-registration">
        <Button
          width="full"
          title="Create Reminder"
          icon={<AiOutlinePlus />}
          className="flex-row-reverse justify-between"
        />
      </Link>
    </div>
  );
};

export default ViewCustomer;
