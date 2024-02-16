import { Disclosure } from "@headlessui/react";
import Button from "components/button";
import Divider from "components/divider";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import * as commonStyles from "styles/pages/common.module.scss";
import * as styles from "../styles.module.scss";
import { Assessment, TransactionsResultT } from "type/transactions";
import TimeFormat from "services/time-format";
import { request } from "services/http-request";
import { TRANSACTIONS_MANAGEMENT } from "constants/api";
import MsgToast from "services/msg-toast";

const TransactionCard = ({
  data,
  refetch,
}: {
  data: Partial<TransactionsResultT>;
  refetch: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);
  const [svLoading, setSvLoading] = useState(false);
  // const totalAmt = Number(data?.total_amount || 0);
  // const gst = Number(data?.total_gst || 0);
  // const totalAmtInGst = Number(totalAmt + gst || 0);
  // const discount = Number(data?.total_discounts || 0);
  // const totalPayableAmt = Math.abs(totalAmtInGst - discount);

  async function changePaymentStatus(status: string, id: number) {
    setLoading((prev) => !prev);
    try {
      const data = {
        payment_status: status,
      };
      const resp = await request({
        url: TRANSACTIONS_MANAGEMENT + id + "/emi_status_change/",
        method: "patch",
        data,
      });
      MsgToast("Status Change Sucessfully", "success");
      await refetch();
    } catch (error) {
      MsgToast("Try again later", "error");
    } finally {
      setLoading((prev) => !prev);
    }
  }

  async function svStatus(status: boolean, id: number) {
    setLoading((prev) => !prev);
    try {
      const data = {
        sv_eligible: status,
      };
      const resp = await request({
        url: TRANSACTIONS_MANAGEMENT + id + "/sv_update/",
        method: "patch",
        data,
      });
      MsgToast("Status Change Sucessfully", "success");
      await refetch();
    } catch (error) {
      MsgToast("Try again later", "error");
    } finally {
      setLoading((prev) => !prev);
    }
  }

  return (
    <div>
      {data?.sv_interested && (
        <>
          <div className={`${styles.profileSetting} ${styles.mtb}`}>
            <p className={"font-bold"}>Customer Applied For Solar Victoria</p>
          </div>
          <Divider />
        </>
      )}
      <div className={`${styles.profileSetting} ${styles.mtb}`}>
        <p className={styles.textBold}>Transaction ID: {data?.ref_id}</p>

        {/* <p className={styles.userSettings}>Download Invoice</p> */}
      </div>
      <Divider />
      <div className={`${styles.profileSetting} ${styles.mtb}`}>
        <p className={styles.textBold}>
          Quote Request ID: {data?.details?.quote_request?.id}
        </p>

        {/* <p className={styles.userSettings}>Download Invoice</p> */}
      </div>

      <Divider />

      <p className={styles.mtb}>
        <span className={styles.textBold}>Order Placed: </span>
        {TimeFormat(data?.created_at || "")}
      </p>

      <Divider />
      <p className={styles.mtb}>
        <span className={styles.textBold}>Transaction Method: </span>
        {data?.transaction_method?.toUpperCase()}
      </p>

      <Divider />
      <p className={styles.mtb}>
        <span className={styles.textBold}>Payment Status: </span>
        {data?.payment_status?.toUpperCase().replace("_", " ")}
      </p>

      <Divider />

      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button className={` ${open ? "" : ""} ${styles.mtb}`}>
              <div className={styles.dwBtn}>
                <p className="">
                  <span className={styles.textBold}>Appointments :</span>(
                  {data?.details?.quote_request?.assessments?.length || 0})
                </p>

                <FaChevronDown
                  className={`${open ? "rotate-180 transform" : ""}`}
                />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className={`${styles.panel} mb-5`}>
              {data?.details?.quote_request.assessments?.map((assessment) => {
                return <List data={assessment} />;
              })}
            </Disclosure.Panel>

            {!open && <Divider />}
          </>
        )}
      </Disclosure>
      <Divider />

      {/* <p className={styles.mtb}>
        <span className={styles.textBold}>Total Amount (In GST): </span>
        {String(totalAmtInGst.toFixed(2))}
      </p> */}
      {/* <p className={styles.mtb}>
        <span className={styles.textBold}>GST: </span>
        {data?.total_gst}
      </p> */}

      <p className={styles.mtb}>
        <span className={styles.textBold}>Solar Victoria Rebates: </span>
        {data.sv_eligible}
        {data?.sv_eligible! === true || data?.sv_eligible! === null
          ? data?.sv_value
          : 0}
      </p>

      <p className={`mb-8 mt-4`}>
        <span className={styles.textBold}>Total Payable Amount :</span>
        <div className={styles.priceTag}>
          <Button
            title={"$" + String(Number(data?.amount_payable).toFixed(2))}
          />
        </div>
      </p>

      {data?.payment_status === "processing_emi" ? (
        <div className="flex gap-3">
          <Button
            isLoading={loading}
            disabled={loading}
            title="Accept EMI"
            onClick={() => changePaymentStatus("completed", data?.id!)}
          />
          <Button
            isLoading={loading}
            disabled={loading}
            title="Reject EMI"
            onClick={() => changePaymentStatus("canceled", data?.id!)}
            color="red"
          />
        </div>
      ) : null}

      {data?.sv_interested && data.sv_eligible === null ? (
        <div className="flex gap-3">
          <Button
            isLoading={loading}
            disabled={loading}
            title="Solar Victoria Accepted"
            onClick={() => svStatus(true, data?.id!)}
          />
          <Button
            isLoading={loading}
            disabled={loading}
            title="Solar Victoria Rejected"
            onClick={() => svStatus(false, data?.id!)}
            color="red"
          />
        </div>
      ) : null}
    </div>
  );
};

function List({ data }: { data: Assessment }) {
  const { card, cardInfo, contactInfo, icon, contact } = commonStyles;
  // const { open, setElement, toggle } = useRightBarContext();

  return (
    <div className={`${styles.card} ${styles.cardBorder}`}>
      <p className="font-medium"> Appt ID : {data.id}</p>
      <div className={styles.cardInfo}>
        <p className="mb-2">
          {`${data?.job?.customer?.user?.first_name || "N/A"} ${
            data?.job?.customer?.user?.last_name || "N/A"
          }`}
        </p>
        <p className="mb-2">
          {" "}
          Created on: {TimeFormat(data?.job?.customer?.created_at)}
        </p>
      </div>
      <div className={`${styles.contactInfo} ${styles.contact}`}>
        <div className="flex gap-2 items-center">
          <span className={styles.icon}>
            <TfiEmail className={styles.icon} />
          </span>

          <span className={styles.contact}>
            {data?.job?.customer?.user?.email}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <span className={styles.icon}>
            <IoCallOutline className={styles.icon} />
          </span>

          <span className={styles.contact}>
            {data?.job?.customer?.user?.phone}
          </span>
        </div>

        {/* <LuClipboardList className={styles.absIcon} /> */}
        {/* <p className={styles.count}>3</p> */}
      </div>
    </div>
  );
}

export default TransactionCard;
