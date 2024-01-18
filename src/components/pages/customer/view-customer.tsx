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
import { Result as CustomerResult, ReminderRespT } from "type/customer";
import useQuickFetch from "hook/quick-fetch";
import { JOB_LISTING, REMINDER_LISTING } from "constants/api";
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
        customer__id: data?.id,
      },
    },
    [JSON.stringify(data)]
  );
  const {
    response: reminderResp,
    error: reminderErr,
    lodaing: reminderLoading,
  } = useQuickFetch<ReminderRespT>(
    {
      url: REMINDER_LISTING,
      params: {
        customer: data?.user?.id,
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
                    {data?.user?.first_name}&nbsp;{data?.user?.last_name}
                  </span>
                </p>
                <p className={styles.tag}>
                  {moment(data.user?.created_at).format("DD/MM/yyyy hh:mm a")}
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

                <div className="user-address">
                  <span className={styles.icon}>
                    <IoLocationOutline className={styles.icon} />
                  </span>

                  <span className={styles.contact}>
                    {/* {data?.user?.groups || "N/A"} */}
                    {`
                    ${
                      data?.address?.building_number
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

                    ${data?.address?.state ? data.address?.state : ""} ${
                      data.address?.pincode ? data.address?.pincode : ""
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
        <p className={styles.additionalInfo}>
          <span className={styles.title}>Customer Type: &nbsp;</span>
          {data?.customer_type ? data?.customer_type : "No data available"}
        </p>

        <p className={styles.additionalInfo}>
          <span className={styles.title}>State: &nbsp;</span>
          {data?.address?.state}
        </p>

        <p className={styles.additionalInfo}>
          <span className={styles.title}>LGA: &nbsp;</span> {data.address?.lga}
        </p>
      </div>

      <div className="my-3">
        <Divider />
      </div>

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Customer Created by: &nbsp; </span>
        {`${
          data?.customer_created_by?.user.first_name
            ? data?.customer_created_by?.user.first_name
            : "N/A"
        } ${
          data?.customer_created_by?.user.last_name
            ? data?.customer_created_by?.user.last_name
            : "N/A"
        }`}{" "}
        <br />
        <span className={styles.tag}>
          Created on:{" "}
          {moment(data.user?.created_at).format("DD/MM/yyyy hh:mm a")}
        </span>
      </p>

      <div className="my-3">
        <Divider />
      </div>

      <div className="flex justify-between items-center">
        <p className={styles.bold}>Customer Status</p>
        <Radio
          label={data?.cust_status?.toUpperCase()?.replace("_", " ")}
          checked={true}
        />
      </div>

      <div className="my-3">
        <Divider />
      </div>
      <Disclosure>
        {({ open }) => (
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
              {jobResp?.results?.length! > 0 ? (
                jobResp?.results?.map((item, idx, array) => {
                  return (
                    <div
                      onClick={() => {
                        window.open(
                          `/jobs/job-details/?job=${item.id}`,
                          "_blank"
                        );
                      }}
                      className={styles.job + " mt-1"}
                    >
                      <p className={styles.jobTitle}>{item.work_type?.title}</p>
                      <p className="">
                        Job ID : <span className={styles.tag}>{item.id}</span>
                      </p>
                      <LuClipboardList />
                      {/* <p className={styles.count}>3</p> */}
                    </div>
                  );
                })
              ) : (
                <div className="mb-2">No Jobs</div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className={styles.divider}>
        <Divider />
      </div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${styles.details} ${open ? "" : "mb-5"}`}
            >
              <div className="">
                <p className={styles.bold}>
                  Reminders({reminderResp?.results?.length})
                </p>
              </div>
              <FaChevronDown
                className={`${open ? "rotate-180 transform" : ""} font-light`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={styles.panel}>
              {reminderResp?.results?.length! > 0 ? (
                reminderResp?.results?.map((item) => {
                  return (
                    <div key={item.id} className={styles.reminder}>
                      <div className="flex flex-col">
                        <p className={styles.reminderTitle}>
                          {item.description}
                        </p>
                        <p className={styles.reminderId}>
                          Status : <span>{item.status}</span>
                        </p>
                        <p className={styles.reminderId}>
                          Reminber By :{" "}
                          <span>
                            {moment(item.reminder_time).format(
                              "DD-MM-yyyy hh:mm a"
                            )}
                          </span>
                        </p>
                      </div>
                      <SlBell className={styles.reminderIcon} />
                    </div>
                  );
                })
              ) : (
                <div className="mb-2">No Reminders</div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Link to="create-reminder" state={{ custId: data.id }}>
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
