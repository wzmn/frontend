import moment from "moment";
import React from "react";
import { ImSpinner10 } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { CompanyExtraDataType } from "type/company";
import * as styles from "styles/pages/common.module.scss";
import * as companyStyles from "pages/company/styles.module.scss";
import { Link } from "gatsby";
import { useRightBarContext } from "providers/right-bar-provider";
import View from "pages/company/view";

export function List({
  data,
  loading,
  index,
}: {
  data: CompanyExtraDataType;
  loading: boolean;
  index: number;
}) {
  // to="company-details"
  const colors = {
    buyer: "#3B9DFF",
    seller: "#97DC21",
    reminder: "#32D0D1",
  };
  const { open, setElement, toggle } = useRightBarContext();
  return (
    <div
      onClick={() => {
        {
          !open && toggle();
        }
        setElement(
          <View data={data} />,
          `Company ID: ${data.id}`,
          <>
            <IoEyeOutline
              onClick={() => {
                window.open(`company-details/?company=${data.id}`, "_blank");
              }}
            />
          </>
        );
      }}
    >
      <div className={styles.card}>
        {/* <p className="">{data.status ? "Loading" : "ll"}</p> */}
        <div className="absolute right-3 top-3">
          <ImSpinner10 className="animate-spin" />
        </div>
        <div className={styles.header}>
          <span className="">ABN No. </span>
          <span>{data.id}</span>
        </div>
        <div className={styles.cardInfo}>
          <p className="">{data.company_name}</p>
          <span className="">
            {" "}
            created on: {moment(data.created_at).format("ddd, MM a")}
          </span>
        </div>
        <div className={styles.contactInfo}>
          <div className="">
            <span className={styles.icon}>
              <TfiEmail className={styles.icon} />
            </span>
            <span className={styles.contact}>{data.company_email}</span>
          </div>

          <div className="">
            <span className={styles.icon}>
              <IoCallOutline className={styles.icon} />
            </span>

            <span className={styles.contact}>{data.company_mobile_phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const datesFilters = [
  "All Time",
  "Today",
  "Yesterday",
  "This Week",
  "This Month",
  "This Year",
] as const;

const companyType = ["All", "Buyer", "Seller"];

export function DateFilter() {
  return (
    <div className={companyStyles.filterCont}>
      {datesFilters.map((item) => {
        return (
          <div key={item} className={companyStyles.filter}>
            <label className=" ">
              <input type="radio" name="datefilter" id="" />
              <span className="">{item}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}

export function CompanyFilter() {
  return (
    <div className={companyStyles.filterCont}>
      {companyType.map((item) => {
        return (
          <div key={item} className={companyStyles.filter}>
            <label className="">
              <input type="radio" name="companyType" id="" />
              <span className="">{item}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
