import React, { forwardRef } from "react";
import * as styles from "./Input.module.scss";

type Varient = "auth" | "regular";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  //...add your custom types here
  varient?: Varient;
  asterisk?: boolean;
  errorMessage?: string;
}

function handleVarient(str: string) {
  switch (str) {
    case "auth":
      return `${styles.input} ${styles.login} `;

    case "regular":
      return `${styles.input} ${styles.regular} `;
    default:
      `${styles.input} ${styles.login}`;
  }
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { placeholder, varient = "auth", errorMessage } = props;

  return (
    <div className={styles.inputCont}>
      <div className={styles.inputHolder}>
        <input
          ref={ref}
          {...props}
          className={handleVarient(varient)}
          placeholder=""
        />
        <span
          className={styles.placeholder}
          onClick={(e) =>
            (
              (e.target as HTMLElement)
                .previousElementSibling as HTMLInputElement
            ).focus()
          }
        >
          {placeholder}{" "}
          {props?.asterisk && <span className="text-red-500">*</span>}
        </span>
      </div>
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
});

Input.defaultProps = {
  type: "text",
};

export default Input;
