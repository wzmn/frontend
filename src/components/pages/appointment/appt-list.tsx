import React from "react";
import { useRightBarContext } from "providers/right-bar-provider";
import { Result } from "type/appointment";
import ViewAppt from "./view-appt";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { ImSpinner10 } from "react-icons/im";
import moment from "moment";
import { TfiEmail } from "react-icons/tfi";
import * as commonStyles from "styles/pages/common.module.scss";
import Checkbox from "components/checkbox";

export default function ApptList({
  data,
  loading,
  snippitAuditedCheckboxHandler,
  snippitAudited,
}: {
  data: Result;
  loading: boolean;
  snippitAuditedCheckboxHandler: (val: string) => void;
  snippitAudited: string[];
}) {
  const { card, cardInfo, contactInfo, icon, contact } = commonStyles;
  const { open, setElement, toggle } = useRightBarContext();

  return (
    <div
      onClick={() => {
        !open && toggle();

        setElement(
          <ViewAppt
            data={data}
            showAssessment={data.appointment_status === "Assessed"}
            showSchedule={data.appointment_status === "Waiting"}
          />,
          `Appt ID: ${data.id}`,
          <>
            <IoEyeOutline
              onClick={() => {
                window.open(
                  `appointment-details/?appointment=${data.id}`,
                  "_blank"
                );
              }}
            />
          </>
        );
      }}
    >
      <div className={card}>
        <div className="absolute right-8 top-1">
          <ImSpinner10 className="animate-spin" />
        </div>
        {data?.appointment_status?.toLowerCase() === "snippit audited" && (
          <div className="flex justify-end mr-2">
            <Checkbox
              defaultChecked={snippitAudited.some(
                (item) => item === String(data.id)
              )}
              name=""
              value={data.id}
              id={data.id.toString()}
              onChange={(e) => {
                snippitAuditedCheckboxHandler(e.target.value);
              }}
            />
          </div>
        )}
        <div className={cardInfo}>
          <p className="title">{data?.job?.customer?.user?.first_name}</p>
          <span className="">
            {" "}
            created on:{" "}
            {moment(data?.job?.customer?.user?.created_at).format(
              "ddd DD"
            )} at{" "}
            {moment(data?.job?.customer?.user?.created_at).format("h:mm a")}
          </span>
        </div>
        <div className={contactInfo}>
          <div className="">
            <span className={icon}>
              <TfiEmail className={icon} />
            </span>

            <span className={contact}>{data?.job?.customer?.user?.email}</span>
          </div>

          <div className="">
            <span className={icon}>
              <IoCallOutline className={icon} />
            </span>

            <span className={contact}>{data?.job?.customer?.user?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
