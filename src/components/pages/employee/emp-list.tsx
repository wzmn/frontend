import { useRightBarContext } from "providers/right-bar-provider";
import React from "react";
import { EmployeeDataStateType } from "type/employee";
import ViewEmp from "./view-emp";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { ImSpinner10 } from "react-icons/im";
import moment from "moment";
import { TfiEmail } from "react-icons/tfi";
import * as commonStyles from "styles/pages/common.module.scss";
import { request } from "services/http-request";
import { toast } from "react-toastify";
import { EMPLOYEE_LISTING } from "constants/api";
import HLessMenu from "components/h-less-menu";

export function EmpList({
  data,
  loading,
}: {
  data: EmployeeDataStateType;
  loading: boolean;
}) {
  const { card, cardInfo, contactInfo, icon, contact } = commonStyles;
  const { open, setElement, toggle } = useRightBarContext();

  async function deleteEmp() {
    try {
      toggle();
      const response = await toast.promise(
        request({
          url: EMPLOYEE_LISTING + data.id + "/",
          method: "delete",
        }),
        {
          pending: "Wait...",
          success: "Deleted ",
          error: "Cannot delete try again later",
        }
      );
    } catch (error) {}
  }

  return (
    <div
      onClick={() => {
        !open && toggle();

        setElement(
          <ViewEmp data={data} />,
          `Employee ID: ${data.id}`,
          <>
            <IoEyeOutline
              onClick={() => {
                window.open(`employee-details/?employee=${data.id}`, "_blank");
              }}
            />

            <HLessMenu deleteFun={deleteEmp} />
          </>
        );
      }}
    >
      <div className={card}>
        <div className="absolute right-3 top-1">
          <ImSpinner10 className="animate-spin" />
        </div>
        <div className={cardInfo}>
          <p className="title">{data.user?.first_name}</p>
          <span className="">
            {" "}
            created on: {moment(data.user?.created_at).format("ddd DD")} at{" "}
            {moment(data?.user?.created_at).format("h:mm a")}
          </span>
        </div>
        <div className={contactInfo}>
          <div className="">
            <span className={icon}>
              <TfiEmail className={icon} />
            </span>

            <span className={contact}>{data.user?.email}</span>
          </div>

          <div className="">
            <span className={icon}>
              <IoCallOutline className={icon} />
            </span>

            <span className={contact}>{data.user?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
