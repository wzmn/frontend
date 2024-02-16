import Checkbox from "components/checkbox";
import { useRightBarContext } from "providers/right-bar-provider";
import React from "react";
import { ImSpinner10 } from "react-icons/im";
import {
  IoCallOutline,
  IoEyeOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import TimeFormat from "services/time-format";
import * as commonStyles from "styles/pages/common.module.scss";
import { ApptResultT } from "type/appointment";
import ViewAppt from "./view-appt";
import UserIdentifyer from "services/user-identifyer";

const assessmet = ["assessed", "audited", "snippit audited", "reassessment"];
const schedule = ["waiting", "rescheduled", "reassessment"];
const checkBoxRole = ["superadmin", "admin", "owner"];

export default function ApptList({
  data,
  loading,
  snippitAuditedCheckboxHandler,
  snippitAudited,
  refetch,
}: {
  data: ApptResultT;
  loading: boolean;
  snippitAuditedCheckboxHandler: (val: string) => void;
  snippitAudited: string[];
  refetch: (params?: Record<any, any>) => Promise<void>;
}) {
  const { card, cardInfo, contactInfo, icon, contact, header } = commonStyles;
  const { open, setElement, toggle } = useRightBarContext();
  const userRole = UserIdentifyer();
  return (
    <div
      onClick={() => {
        !open && toggle();

        setElement(
          <ViewAppt
            data={data}
            showAssessment={assessmet.includes(
              data.appointment_status.toLowerCase()
            )}
            showSchedule={schedule.includes(
              data.appointment_status.toLowerCase()
            )}
          />,
          `Appt ID: ${data.id}`,
          <>
            <IoEyeOutline
              id="eye"
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
        {checkBoxRole.includes(userRole) &&
          data?.appointment_status?.toLowerCase() === "snippit audited" && (
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

        <div className={`${header}`}>
          <span className="">Appt ID. </span>
          <span>{data.id}</span>
        </div>
        <div className={cardInfo}>
          <p className="title">{data?.job?.customer?.user?.first_name}</p>
          <span className="">
            {" "}
            {TimeFormat(data?.created_at)}
            {/* {TimeFormat(data?.created_at, "hh:mm a")} */}
          </span>
        </div>
        <div className={contactInfo}>
          <div className="">
            <span className={icon + " self-start"}>
              <TfiEmail className={icon} />
            </span>

            <span className={contact}>{data?.job?.customer?.user?.email}</span>
          </div>

          <div className="mt-2">
            <span className={icon + " self-start"}>
              <IoCallOutline className={icon} />
            </span>

            <span className={contact}>{data?.job?.customer?.user?.phone}</span>
          </div>

          <div className="mt-2">
            <span className={icon + " self-start"}>
              <IoLocationOutline className={icon} />
            </span>

            <span className={contact}>
              {data?.job?.address?.formatted_address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
