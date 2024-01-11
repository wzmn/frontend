import { useRightBarContext } from "providers/right-bar-provider";
import React, { CSSProperties } from "react";
import { CustomerDataExtraType } from "type/customer";
import ViewCustomer from "./view-customer";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { ImSpinner10 } from "react-icons/im";
import moment from "moment";
import { TfiEmail } from "react-icons/tfi";
import * as styles from "styles/pages/common.module.scss";
import { BsThreeDots } from "react-icons/bs";
import Menu from "components/menu";
import { ActionBtn } from "../common";

import * as common from "components/pages/common/common.module.scss";
import HLessMenu from "components/h-less-menu";
import { request } from "services/http-request";
import { toast } from "react-toastify";
import { CUSTOMER_LISTING } from "constants/api";
import { usefetchData } from "./helper";

const cssStyles: CSSProperties = {
  width: "8rem",
};

export default function CustList({
  data,
  loading,
  index,
}: {
  data: CustomerDataExtraType;
  loading: boolean;
  index: number;
}) {
  // target="_blank" href={`customer-details/?customer=${data.id}`}
  const { open, setElement, toggle } = useRightBarContext();

  const { fetchData } = usefetchData({});

  async function deleteCust() {
    try {
      toggle();
      const response = await toast.promise(
        request({
          url: CUSTOMER_LISTING + data.id + "/",
          method: "delete",
        }),
        {
          pending: "Wait...",
          success: "Deleted ",
          error: "Cannot delete try again later",
        }
      );
      fetchData();
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
        <div className={styles.cardInfo}>
          <p className="title">{data.user?.first_name}</p>
          <span className="">
            {" "}
            <div>Created on: {moment(data?.created_at).format("ddd DD")}</div>
            at {moment(data?.created_at).format("h:mm a")}
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
