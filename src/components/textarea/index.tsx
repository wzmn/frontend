import React, { forwardRef } from "react";
import * as styles from "../input/Input.module.scss";

type Varient = "auth" | "regular";
type SizeVarient = "small";
interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
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

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { placeholder, varient = "auth", errormessage, sizeVarient } = props;

  return (
    <div className={styles.inputCont}>
      <div className={styles.inputHolder}>
        <textarea
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

export default Textarea;
