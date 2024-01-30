import Badge from "components/badge";
import { useRightBarContext } from "providers/right-bar-provider";
import React from "react";
import { ImSpinner10 } from "react-icons/im";
import TimeFormat from "services/time-format";
import * as commonStyles from "styles/pages/common.module.scss";
import { QuoteResultT } from "type/quotes";
import * as publishStyles from "./styles.module.scss";
import ViewPublish from "./view-publish";

export function PublishList({
  data,
  loading,
  quoteStatus,
}: {
  data: QuoteResultT;
  loading: boolean;
  quoteStatus: string;
}) {
  const { card, cardInfo, contactInfo, icon, contact } = commonStyles;
  const { open, setElement, toggle } = useRightBarContext();

  return (
    <div
      onClick={() => {
        !open && toggle();

        setElement(
          <ViewPublish data={data} status={quoteStatus} />,
          `Quote ID: ${data.id}`,
          <>
            {/* <IoEyeOutline
              onClick={() => {
                window.open(`publish-details/?publish=${data.id}`, "_blank");
              }}
            /> */}
          </>
        );
      }}
    >
      <div className={card}>
        <div className="absolute right-3 top-1">
          <ImSpinner10 className="animate-spin text-xs" />
        </div>
        <p className={publishStyles.listHeader}>Quote ID : {data?.id}</p>

        <p className={`${publishStyles.dates} mt1`}>
          Accepted: {TimeFormat(data?.created_at)}
        </p>

        <p className={publishStyles.state}>
          SUBURB: <span>{data?.suburb}</span>
        </p>
        {quoteStatus === "quote accepted" && (
          <p className={`${publishStyles.state} mt-1`}>
            Paid :{" "}
            <span>
              <Badge
                label={String(data?.best_quote)}
                className={`${publishStyles.badge} ${publishStyles.priceBadge}`}
              />
            </span>
          </p>
        )}

        {quoteStatus === "quote accepted" && (
          <p className={`${publishStyles.state} mt-1`}>
            Payment Status:{" "}
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
