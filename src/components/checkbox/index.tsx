import React, { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import * as styles from "./styles.module.scss";

type Props<T> = InputHTMLAttributes<HTMLInputElement> & {
  label?: JSX.Element | string;
  storeData?: T;
  getStoredData?: (data: T) => void;
};

const Checkbox = forwardRef(
  <T extends unknown>(props: Props<T>, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div
        className={styles.checkboxCont}
        onClick={(e) => {
          console.log(e.target);
          e.stopPropagation();
          props.getStoredData &&
            props.getStoredData(props.storeData ?? ("" as T));
        }}
      >
        <input ref={ref} type="checkbox" {...props} />
        <label htmlFor={props.id}>{props.label}</label>
      </div>
    );
  }
);

export default Checkbox as <T extends unknown>(
  props: Props<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => JSX.Element;
