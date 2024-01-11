import { Disclosure } from "@headlessui/react";
import Button from "components/button";
import Divider from "components/divider";
import Radio from "components/radio";
import { APPOINTMENT_LISTING, JOB_LISTING } from "constants/api";
import { Link } from "gatsby-link";
import useQuickFetch from "hook/quick-fetch";
import moment from "moment";
import { useRightBarContext } from "providers/right-bar-provider";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { toast } from "react-toastify";
import { request } from "services/http-request";
import * as styles from "styles/pages/view.module.scss";
import { AppointmentDataType } from "type/appointment";
import { Result as JobResultT } from "type/job";

const ViewJob = ({ data }: { data: JobResultT }) => {
  const {
    response: apptResp,
    error: apptErr,
    lodaing: apptLoading,
  } = useQuickFetch<AppointmentDataType>(
    {
      url: APPOINTMENT_LISTING,
      params: {
        job__in: data.id,
      },
    },
    [JSON.stringify(data)]
  );

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
                    {/* {data?.customer?.user?.groups || "N/A"} */}
                    {`
                    ${
                      data.address?.building_number
                        ? data.address?.building_number
                        : ""
                    } ${
                      data.address?.street_number
                        ? data.address?.street_number
                        : ""
                    } ${
                      data.address?.street_name ? data.address?.street_name : ""
                    }
                    
                    ${data.address?.suburb ? data.address?.suburb : ""}

${data.address?.state ? data.address?.state : ""} ${
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

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Job Created by: &nbsp; </span>
        {data?.job_created_by} &nbsp;
        <p className={styles.tag}>
          {moment(data?.customer?.user?.created_at).format(
            "DD/MM/yyyy HH:MM a"
          )}
        </p>
      </p>

      <Divider />

      <div className={`${styles.status} mt-5`}>
        <p className={styles.bold}>Job Status</p>
        <Radio label={String(data?.job_status)} checked={true} />
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
                <p className={styles.bold}>
                  Appointments({apptResp?.results?.length})
                </p>
              </div>
              <FaChevronDown
                className={`${open ? "rotate-180 transform" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={`${styles.panel} mb-5`}>
              {apptResp.results?.map((item, idx, array) => {
                return (
                  <div className={styles.job}>
                    <p className={styles.jobTitle}>
                      {item?.job?.work_type?.title}
                    </p>
                    <p className="">
                      Appt ID : <span className={styles.tag}>{item.id}</span>
                    </p>
                    <LuClipboardList />
                  </div>
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Link to="create-appointment" state={data}>
        <Button
          width="full"
          title="Create Appointment"
          icon={<AiOutlinePlus />}
          className="flex-row-reverse justify-between  mt-5"
        />
      </Link>
    </div>
  );
};

export default ViewJob;
