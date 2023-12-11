import React, { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import * as styles from "./styles.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: JSX.Element | string;
};

const Checkbox = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={styles.checkboxCont}>
        <input ref={ref} {...props} type="checkbox" />
        <label htmlFor={props.id}>{props.label}</label>
      </div>
    );
  }
);

export default Checkbox;
