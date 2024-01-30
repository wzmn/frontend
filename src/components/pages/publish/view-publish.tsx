import { Disclosure } from "@headlessui/react";
import Button from "components/button";
import Divider from "components/divider";
import Radio from "components/radio";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { SlBell } from "react-icons/sl";
import * as styles from "styles/pages/view.module.scss";
import * as publishStyles from "./styles.module.scss";
import { QuoteResultT } from "type/quotes";
import TimeFormat from "services/time-format";

const ViewPublish = ({
  data,
  status,
}: {
  data: QuoteResultT;
  status: string;
}) => {
  return (
    <div className={styles.view}>
      <div className={styles.details}>
        <div className="">
          {/* <p className="">
            <span className={styles.bold}>Request Type: :</span>{" "}
            <span className={styles.normal}>CLU ASSESSMENT</span>
          </p> */}
          {/* <p className={styles.tag}> */}
          {/* {TimeFormat(data.user?.created_at)} */}
          {/* Start Date: 26-12-23 | 4.30 AM
          </p>
          <p className={styles.tag}> */}
          {/* {TimeFormat(data.user?.created_at)} */}
          {/* End Date: 29-12-23 | 15.30 PM
          </p> */}
        </div>
      </div>
      <p className={styles.bold}>
        <span className={styles.title}>Quote Created on: &nbsp;</span>
        <span className={styles.tag}>{TimeFormat(data?.created_at)}</span>
      </p>
      <div className={styles.divider}>
        <Divider />
      </div>

      <p className={styles.bold}>
        <span className={styles.title}>Suburb: &nbsp;</span>
        <span className={styles.tag}>{data?.suburb}</span>
      </p>

      <Divider />

      {/* <div className="my-3">
        <p className={styles.bold}>
          <span className={styles.title}>Batch Created by: &nbsp;</span>{" "}
          <span className={styles.tag}> Superadmin/Jackson</span>
        </p>
        <p className={styles.tag}>
          {TimeFormat(data.user?.created_at)}
          01-08-2023 at 7.00 am
        </p>
      </div> */}

      <Divider />

      <div className={`${styles.status} mt-4`}>
        <p className={styles.bold}>Quote Status</p>
        <Radio label={status.toUpperCase()} checked={true} />
      </div>

      <Divider />

      {status.toLowerCase() === "quote accepted" && (
        <div className={`${styles.status} mt-4`}>
          <p className={styles.bold}>Total</p>
          <div className={publishStyles.priceViewBtn}>
            <Button title={`$ ${data?.best_quote}`} />
          </div>
        </div>
      )}

      <Divider />

      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button
              className={`${styles.details} ${open ? "mt-5" : "mb-5 mt-5"}`}
            >
              <div className="">
                <p className={styles.bold}>
                  Appointments({data?.assessments?.length})
                </p>
              </div>
              <FaChevronDown
                className={`${open ? "rotate-180 transform" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={`${styles.panel} mb-5`}>
              {data?.assessments?.map((appt) => {
                return (
                  <div className={styles.job}>
                    <p className={styles.jobTitle}>
                      {appt?.job?.work_type?.title}
                    </p>
                    <p className="">
                      Job ID :{" "}
                      <span className={styles.tag}>{appt?.job?.id}</span>
                    </p>
                    <LuClipboardList />
                    {/* <p className={styles.count}>3</p> */}
                  </div>
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* <Disclosure>
        {({ open }) => (          
          <>
            <Disclosure.Button className={styles.details}>
              <div className="">
                <p className={styles.bold}>Bids(03)</p>
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
      </Disclosure> */}
    </div>
  );
};

export default ViewPublish;
