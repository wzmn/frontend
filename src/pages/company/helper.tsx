import React from "react";
import { ImSpinner10 } from "react-icons/im";
import { DProps } from "type/company";
import * as companyStyles from "./styles.module.scss";
import moment from "moment";

export function List({ data, loading }: { data: DProps; loading: boolean }) {
  return (
    <div className={companyStyles.list}>
      {/* <p className="">{data.status ? "Loading" : "ll"}</p> */}
      <div className="absolute right-3 top-1">
        <ImSpinner10 className="animate-spin" />
      </div>
      <div className={companyStyles.abnNo}>
        <span className="">ABN No. </span>
        <span className={companyStyles.id}>{data.id}</span>
      </div>
      <div className={companyStyles.companyInfo}>
        <p className="">{data.company_name}</p>
        <span className="">
          {" "}
          created on: Mon,3.40 am{moment(data.created_at).format("ddd,MM a")}
        </span>
      </div>
      <div className="contactInfo"></div>
    </div>
  );
}

const datesFilters = [
  "All Time",
  "Yesterday",
  "Today",
  "This Week",
  "This Month",
  "This Year",
] as const;

const companyType = ["Buyer", "Seller", "All"];

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
