import React from "react";
import * as styles from "./styles.module.scss";
const Pagination = () => {
  return (
    <p className={styles.pagination}>
      Showing
      <select className={styles.select} name="" id="" defaultValue={5}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="200">100</option>
      </select>
      1-100 of 6450 Company{" "}
      <select className={styles.select} name="" id="" defaultValue={0}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>{" "}
      0f 40 pages
    </p>
  );
};

export default Pagination;
