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
import { CompanyExtraDataType } from "type/company";

const ViewCompany = ({ data }: { data: CompanyExtraDataType }) => {
  return (
    <div className={styles.view}>
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button className={styles.details}>
              <div className="">
                <p className="">
                  <span className={styles.bold}>Company Name:</span>{" "}
                  <span className={styles.normal}>{data?.company_name}</span>
                </p>
                <p className={styles.tag}>
                  {moment(data?.created_at).format("ddd DD MM,  hh mm a")}
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

                  <span className={styles.contact}>{data?.company_email}</span>
                </div>

                <div className="">
                  <span className={styles.icon}>
                    <IoCallOutline className={styles.icon} />
                  </span>

                  <span className={styles.contact}>
                    {data?.company_mobile_phone}
                  </span>
                </div>

                <div className="">
                  <span className={styles.icon}>
                    <IoLocationOutline className={styles.icon} />
                  </span>

                  {/* <span className={styles.contact}>
                    {data?.company_address || "N/A"}
                  </span> */}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="my-4">
        <Divider />
      </div>

      <div className="">
        <p className={styles.additionalInfo}>
          <span className={styles.title}>Company Type: &nbsp;</span>
          {data?.company_type}
        </p>

        {/* <p className={styles.additionalInfo}>
          <span className={styles.title}>State: &nbsp;</span>{" "}
          {data?.company_address || "N/A"}
        </p> */}

        <p className={styles.additionalInfo}>
          <span className={styles.title}>LGA: &nbsp;</span> City of Swan
        </p>
      </div>

      <div className="mt-3">
        <Divider />
      </div>

      <p className={`${styles.name} ${styles.createBy}`}>
        <span className={styles.bold}>Company Created by: &nbsp; </span>
        {data?.company_owner?.first_name} &nbsp;
        <span className={styles.tag}>
          {moment(data?.created_at).format("DD-MM-yyyy HH:MM a")}
        </span>
      </p>
      <div className={styles.divider}>
        <Divider />
      </div>

      <div className={styles.status}>
        <p className={styles.bold}>Company Status</p>
        <Radio label={data?.company_status ?? ""} checked={true} />
      </div>
    </div>
  );
};

export default ViewCompany;
