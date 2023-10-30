import React, { Fragment, useRef } from "react";
import * as styles from "./styles.module.scss";
const data = [
  {
    title: "mohan",
    color: "pink",
  },
  {
    title: "veer",
    color: "orange",
  },
  {
    title: "vijay",
    color: "yellow",
  },
  {
    title: "rahul",
    color: "blue",
  },
  {
    title: "raj",
    color: "purple",
  },
  {
    title: "ravi",
    color: "orange",
  },
  {
    title: "veer",
    color: "orange",
  },
];

const SelectList = () => {
  const selectRef = useRef<HTMLInputElement[] | null[]>([]);
  return (
    <div className={`${styles.selectListCont}`}>
      {data.map((item, index) => {
        return (
          <Fragment key={index}>
            <input
              ref={(el) => (selectRef.current[index] = el)}
              type="checkbox"
            />
            <p style={{ background: item.color }} className={styles.checkbox}>
              pj
            </p>
          </Fragment>
        );
      })}
    </div>
  );
};

export default SelectList;
