import Badge from "components/badge";
import { useRightBarContext } from "providers/right-bar-provider";
import React from "react";
import { ImSpinner10 } from "react-icons/im";
import { IoEyeOutline } from "react-icons/io5";
import * as commonStyles from "styles/pages/common.module.scss";
import { JobDataStateType } from "type/job";
import * as publishStyles from "./styles.module.scss";
import ViewPublish from "./view-publish";
import { ApptResultT } from "type/appointment";
import TimeFormat from "services/time-format";
import { QuoteStatusT } from "type/quotes";

export function PublishList({
  data,
  loading,
  acceptedDate,
  quoteCount,
  quoteStatus,
}: {
  data: ApptResultT;
  loading: boolean;
  acceptedDate: string;
  quoteCount: number;
  quoteStatus: QuoteStatusT;
}) {
  const { card, cardInfo, contactInfo, icon, contact } = commonStyles;
  const { open, setElement, toggle } = useRightBarContext();

  return (
    <div
      onClick={() => {
        !open && toggle();

        setElement(
          <ViewPublish data={data} />,
          `Publish ID: ${data.id}`,
          <>
            <IoEyeOutline
              onClick={() => {
                window.open(`publish-details/?publish=${data.id}`, "_blank");
              }}
            />
          </>
        );
      }}
    >
      <div className={card}>
        <div className="absolute right-3 top-1">
          <ImSpinner10 className="animate-spin text-xs" />
        </div>
        <p className={publishStyles.listHeader}>{data.job.work_type.title}</p>

        <p className={`${publishStyles.dates} mt1`}>
          Accepted: {TimeFormat(acceptedDate)}
        </p>
        <p className={`${publishStyles.dates} mt1`}>
          Created By:{" "}
          {`${data.job.job_created_by?.first_name} ${data.job.job_created_by?.last_name}`}
        </p>

        <p className={publishStyles.state}>
          STATE: <span>VIC</span>
        </p>
        {quoteStatus === "quote accepted" && (
          <p className={`${publishStyles.state} mt-1`}>
            Paid Quote::{" "}
            <span>
              <Badge
                label="$1200"
                className={`${publishStyles.badge} ${publishStyles.priceBadge}`}
              />
            </span>
          </p>
        )}

        {quoteStatus === "quote accepted" && (
          <p className={`${publishStyles.state} mt-1`}>
            Payment Status::{" "}
            <span>
              <Badge
                label="Successful"
                className={`${publishStyles.badge} ${publishStyles.bidBadge}`}
              />
            </span>
          </p>
        )}

        {/* <div className="mt-2">
          <Badge
            label="APPTS:03"
            className={`${publishStyles.badge} ${publishStyles.apptBadge} mr-2`}
          />

          <Badge
            label="BIDS:03"
            className={`${publishStyles.badge} ${publishStyles.bidBadge}`}
          />
        </div> */}
      </div>
    </div>
  );
}
