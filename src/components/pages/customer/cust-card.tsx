import { useRightBarContext } from "providers/right-bar-provider";
import React, { CSSProperties } from "react";
import { ImSpinner10 } from "react-icons/im";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import * as styles from "styles/pages/common.module.scss";
import { CustomerDataExtraType } from "type/customer";
import ViewCustomer from "./view-customer";

import HLessMenu from "components/h-less-menu";
import { CUSTOMER_LISTING } from "constants/api";
import { toast } from "react-toastify";
import { request } from "services/http-request";
import TimeFormat from "services/time-format";

const cssStyles: CSSProperties = {
  width: "8rem",
};

export default function CustList({
  data,
  loading,
  index,
  refetch,
}: {
  data: CustomerDataExtraType;
  loading: boolean;
  index: number;
  refetch: (e?: any) => Promise<void>;
}) {
  // target="_blank" href={`customer-details/?customer=${data.id}`}
  const { open, setElement, toggle } = useRightBarContext();

  async function deleteCust() {
    try {
      toggle();
      const response = await toast.promise(
        async () =>
          await request({
            url: CUSTOMER_LISTING + data.id + "/",
            method: "delete",
          }),
        {
          pending: "Wait...",
          success: "Deleted ",
          error: "Cannot delete try again later",
        }
      );
      await refetch();
    } catch (error) {}
  }

  return (
    <div
      onClick={() => {
        {
          !open && toggle();
        }
        setElement(
          <ViewCustomer data={data} />,
          `Customer ID: ${data.id}`,
          <>
            <IoEyeOutline
              id="eye"
              onClick={() => {
                window.open(`customer-details/?customer=${data.id}`, "_blank");
              }}
            />

            {/* <div className="w-10">
              <Menu
                styles={cssStyles}
                arrow={false}
                icon={<BsThreeDots />}
                dropPosition={common.dropPosition}
              >
                <ActionBtn />
              </Menu>
            </div> */}
            <HLessMenu deleteFun={deleteCust} />
          </>
        );
      }}
    >
      <div className={styles.card}>
        <div className="absolute right-3 top-1">
          <ImSpinner10 className="animate-spin" />
        </div>
        <div className={`${styles.header}`}>
          <span className="">ID </span>
          <span>{data.id}</span>
        </div>
        <div className={styles.cardInfo}>
          <p className="title">{data.user?.first_name}</p>
          <span className="">
            {" "}
            <div>
              {/* <p className="">{data?.created_at + ""}</p> */}
              Created on: {TimeFormat(data?.created_at, "ddd DD")} at{" "}
              {TimeFormat(data?.created_at, "hh:mm a")}
            </div>
          </span>
        </div>
        <div className={styles.contactInfo}>
          <div className="">
            <span className={styles.icon}>
              <TfiEmail className={styles.icon} />
            </span>

            <span className={styles.contact}>{data.user?.email}</span>
          </div>

          <div className="">
            <span className={styles.icon}>
              <IoCallOutline className={styles.icon} />
            </span>

            <span className={styles.contact}>{data.user?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
