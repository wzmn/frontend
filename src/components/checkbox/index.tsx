import React, { InputHTMLAttributes } from "react";
import * as styles from "./styles.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: JSX.Element | string;
};

const Checkbox = (props: Props) => {
  return (
    <div className={styles.checkboxCont}>
      <input {...props} type="checkbox" />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default Checkbox;
