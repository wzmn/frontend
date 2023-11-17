import moment from "moment";
import React from "react";
import { ImSpinner10 } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import { IoCallOutline } from "react-icons/io5";
import { DProps } from "type/company";
import * as styles from "styles/pages/common.module.scss";
import * as companyStyles from "pages/company/styles.module.scss";
import { Link } from "gatsby";

export function List({ data, loading }: { data: DProps; loading: boolean }) {
  return (
    <Link to="company-details" state={data}>
      <div className={styles.card}>
        {/* <p className="">{data.status ? "Loading" : "ll"}</p> */}
        <div className="absolute right-3 top-1">
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

            <span className={styles.contact}>{data.company_mobile_phone}</span>
          </div>

          <div className="">
            <span className={styles.icon}>
              <IoCallOutline className={styles.icon} />
            </span>

            <span className={styles.contact}>{data.company_email}</span>
          </div>
        </div>
      </div>
    </Link>
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
