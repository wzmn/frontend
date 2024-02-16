import React, { ChangeEvent } from "react";
import * as styles from "./styles.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImSpinner10 } from "react-icons/im";
type Props = {
  page: number;
  totalRecords: number;
  limit: number;
  limitHandler: (val: number | string) => void;
  pageHandler: (val: number | string) => void;
  label: string;
};
const Pagination = ({
  page,
  totalRecords,
  limit,
  limitHandler,
  pageHandler,
  label,
}: Props) => {
  let totalPages = Math.ceil(totalRecords / limit);
  return (
    <div className={styles.pagination}>
      Showing
      <select
        className={styles.select}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          limitHandler(e.target.value);
        }}
        name=""
        id=""
        defaultValue={5}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      {limit > totalRecords ? totalRecords : limit} of {totalRecords} {label}{" "}
      {/* <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          pageHandler(e.target.value);
        }}
        className={styles.select}
        name=""
        id=""
        defaultValue={0}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>{" "} */}
      {page}
      &nbsp; of {totalPages} pages
      <div className={styles.btnsCont}>
        <div
          className={styles.btns}
          onClick={() => {
            if (page > 1) pageHandler(page - 1);
          }}
        >
          <IoIosArrowBack />
        </div>
        <div
          className={styles.btns}
          onClick={() => {
            if (page < totalPages) pageHandler(page + 1);
          }}
        >
          <IoIosArrowForward />
        </div>
      </div>
      {/* <div className={styles.loading}>
        <ImSpinner10 className="animate-spin" />
      </div> */}
    </div>
  );
};

export default Pagination;
