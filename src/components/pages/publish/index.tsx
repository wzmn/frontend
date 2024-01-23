import Badge from "components/badge";
import { useRightBarContext } from "providers/right-bar-provider";
import React from "react";
import { ImSpinner10 } from "react-icons/im";
import { IoEyeOutline } from "react-icons/io5";
import * as commonStyles from "styles/pages/common.module.scss";
import { JobDataStateType } from "type/job";
import * as publishStyles from "./styles.module.scss";
import ViewPublish from "./view-publish";

export function PublishList({
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
        <p className={publishStyles.listHeader}>HWS ASSESSMENT</p>

        <p className={`${publishStyles.dates} mt1`}>
          Start Date: 26-12-23 | 4.30 AM
        </p>
        <p className={`${publishStyles.dates} mt1`}>
          Start Date: 26-12-23 | 4.30 AM
        </p>

        <p className={publishStyles.state}>
          STATE: <span>VIC</span>
        </p>
        <p className={`${publishStyles.state} mt-1`}>
          BASE PRICE:{" "}
          <span>
            <Badge
              label="$1200"
              className={`${publishStyles.badge} ${publishStyles.priceBadge}`}
            />
          </span>
        </p>

        <div className="mt-2">
          <Badge
            label="APPTS:03"
            className={`${publishStyles.badge} ${publishStyles.apptBadge} mr-2`}
          />

          <Badge
            label="BIDS:03"
            className={`${publishStyles.badge} ${publishStyles.bidBadge}`}
          />
        </div>
      </div>
    </div>
  );
}
