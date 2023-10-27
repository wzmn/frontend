import React, { forwardRef } from "react";
import * as styles from "./styles.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  //...add your custom types here
  asterisk?: boolean;
  errorMessage?: string;
  title: string;
}

const TextField = forwardRef<HTMLInputElement, Omit<Props, "placeholder">>(
  (props, ref) => {
    const { asterisk, errorMessage = "", title } = props;
    return (
      <div className={styles.textField}>
        <div
          className={`${styles.inputCont} ${
            errorMessage !== "" && styles.error
          }`}
        >
          <input placeholder="" ref={ref} {...props} />
          <span
            onClick={(e) =>
              (
                (e.target as HTMLElement)
                  .previousElementSibling as HTMLInputElement
              )?.focus()
            }
            className={styles.placeholder}
          >
            {title}
            {asterisk && <span className="text-red-500">*</span>}
          </span>
        </div>
        <span className={styles.errorMessage}>{errorMessage}</span>
      </div>
    );
  }
);

export default TextField;
