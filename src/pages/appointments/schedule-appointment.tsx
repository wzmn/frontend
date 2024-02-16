import { useLocation } from "@reach/router";
import { APPOINTMENT_LISTING } from "constants/api";
import useQuickFetch from "hook/quick-fetch";
import { useAppContext } from "providers/app-provider";
import React from "react";
import { useForm } from "react-hook-form";
import * as styles from "styles/pages/common.module.scss";
import { ApptResultT, ApptStateStatus } from "type/appointment";
import { Result } from "type/job";
import Schedule from "../jobs/Schedule";
import * as jobStyles from "./styles.module.scss";
import { useAuthContext } from "providers/auth-provider";
import UserIdentifyer from "services/user-identifyer";

const ScheduleAppointment = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const apptId = params.get("apptId");
  const apptStatus: ApptStateStatus = params.get("status") as any;
  const { response, lodaing } = useQuickFetch<ApptResultT>({
    url: APPOINTMENT_LISTING + apptId + "/",
  });
  const { userAuth } = useAuthContext();
  const userRole = UserIdentifyer();

  const comId =
    userRole === "scheduler"
      ? userAuth?.emp_license_info?.company?.id
      : response?.job?.customer?.company?.id;

  return (
    <div className="grow">
      <p className={styles.title}>Schedule Appointment</p>

      <div className="space-y-16 mb-3">
        {lodaing ? (
          "wait..."
        ) : (
          <Schedule
            item={location.state as Result}
            companyId={comId}
            apptId={apptId!}
            apptStatus={apptStatus}
          />
        )}
      </div>
    </div>
  );
};

export function WorkTypeLabel({ text }: { text: string }) {
  return <p className={jobStyles.wt}>{text}</p>;
}

export default ScheduleAppointment;
