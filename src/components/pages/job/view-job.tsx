import { Disclosure } from "@headlessui/react";
import Button from "components/button";
import Divider from "components/divider";
import Radio from "components/radio";
import { APPOINTMENT_LISTING } from "constants/api";
import { Link } from "gatsby-link";
import useQuickFetch from "hook/quick-fetch";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import TimeFormat from "services/time-format";
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
                <p className="text-left">
                  <span className={styles.bold}>Customer Name:</span>{" "}
                  <span className={styles.normal}>
                    {data?.customer?.user?.first_name +
                      " " +
                      data?.customer?.user?.last_name}
                  </span>
                </p>
                <p className={styles.tag}>
                  {TimeFormat(data?.created_at || "")}
                </p>
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
                    {data?.customer?.user?.email}
                  </span>
                </div>

                <div className="mb-2">
                  <span className={styles.icon}>
                    <IoCallOutline className={styles.icon} />
                  </span>

                  <span className={styles.contact}>
                    {data?.customer?.user?.phone}
                  </span>
                </div>

                <div className="mb-2">
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

      <div className="">
        {/* <p className={styles.additionalInfo}>
          <span className={styles.title}>Appt Type: &nbsp;</span>
          {data?.company_type}
        </p> */}

        <p className={styles.additionalInfo}>
          <span className={styles.title}>State: &nbsp;</span>{" "}
          {data?.address?.state || "N/A"}
        </p>

        <p className={styles.additionalInfo}>
          <span className={styles.title}>LGA: &nbsp;</span> {data?.address?.lga}
        </p>
      </div>

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Job Created by: &nbsp; </span>
        {`${
          data?.job_created_by?.first_name
            ? data?.job_created_by?.first_name +
              " " +
              data?.job_created_by?.last_name
            : "N/A"
        }`}{" "}
        &nbsp;
        <p className={styles.tag}>
          Last Updated on: {TimeFormat(data?.customer?.user?.last_login)}
        </p>
      </p>

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Work Type: &nbsp; </span>

        <p className={styles.tag}>{data?.work_type?.title}</p>
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
              <div className="py-1">
                <p className={styles.bold}>
                  Appointments ({apptResp?.results?.length})
                </p>
              </div>
              <FaChevronDown
                className={`${open ? "rotate-180 transform" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={`${styles.panel} mb-5`}>
              {apptResp.results?.map((item, idx, array) => {
                return (
                  <div className={`${styles.job} flex justify-between`}>
                    <div className={`${styles.jobTitle} flex flex-col`}>
                      <span>{item?.job?.work_type?.title}</span>
                      <div>
                        Appt ID : <span className={styles.tag}>{item.id}</span>
                      </div>
                    </div>
                    {/* <p className="">
                    </p> */}
                    <img src="/assets/icons/to-do-list.svg" />
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
