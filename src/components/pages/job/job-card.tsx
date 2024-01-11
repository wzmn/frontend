import React from "react";
import { useRightBarContext } from "providers/right-bar-provider";
import { JobDataStateType } from "type/job";
import ViewJob from "./view-job";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { ImSpinner10 } from "react-icons/im";
import moment from "moment";
import { TfiEmail } from "react-icons/tfi";
import * as commonStyles from "styles/pages/common.module.scss";

export default function JobList({
  data,
  loading,
}: {
  data: JobDataStateType;
  loading: boolean;
}) {
  const { card, cardInfo, contactInfo, icon, contact } = commonStyles;
  const { open, setElement, toggle } = useRightBarContext();

  return (
    <div
      onClick={() => {
        !open && toggle();

        setElement(
          <ViewJob data={data} />,
          `Job ID: ${data.id}`,
          <>
            <IoEyeOutline
              onClick={() => {
                window.open(`job-details/?job=${data.id}`, "_blank");
              }}
            />
          </>
        );
      }}
    >
      <div className={card}>
        <div className="absolute right-3 top-1">
          <ImSpinner10 className="animate-spin" />
        </div>
        <div className={cardInfo}>
          <p className="title">{data?.customer?.user?.first_name}</p>
          <span className="">
            {" "}
            created on:{" "}
            {moment(data?.customer?.user?.created_at).format("ddd DD")} at{" "}
            {moment(data?.created_at).format("h:mm a")}
          </span>
        </div>
        <div className={contactInfo}>
          <div className="">
            <span className={icon}>
              <TfiEmail className={icon} />
            </span>

            <span className={contact}>{data?.customer?.user?.email}</span>
          </div>

          <div className="">
            <span className={icon}>
              <IoCallOutline className={icon} />
            </span>

            <span className={contact}>{data?.customer?.user?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
