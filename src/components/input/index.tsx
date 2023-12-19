import React, { forwardRef } from "react";
import * as styles from "./Input.module.scss";

type Varient = "auth" | "regular";
type SizeVarient = "small";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  //...add your custom types here
  varient?: Varient;
  asterisk?: boolean;
  errormessage?: string;
  sizeVarient?: SizeVarient;
}

function handleSize(str?: string) {
  switch (str) {
    case "small":
      return ` ${styles.small} `;
    default:
      return "";
  }
}

function handleVarient(str: string) {
  switch (str) {
    case "auth":
      return styles.login;

    case "regular":
      return styles.regular;
    default:
      styles.login;
  }
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { placeholder, varient = "auth", errormessage, sizeVarient } = props;

  return (
    <div className={styles.inputCont}>
      <div className={styles.inputHolder}>
        <input
          ref={ref}
          {...props}
          className={`${styles.input} ${handleVarient(varient)} ${handleSize(
            sizeVarient
          )}`}
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

      <p className={styles.errormessage}>{errormessage}</p>
    </div>
  );
});

Input.defaultProps = {
  type: "text",
};

export default Input;
