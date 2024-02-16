import React, { forwardRef } from "react";
import * as styles from "./styles.module.scss";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  //...add your custom types here
  asterisk?: boolean;
  errormessage?: string;
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
  const { placeholder, errormessage } = props;

  return (
    <div className={styles.tAreaCont}>
      <div className={styles.tAreaHolder}>
        <textarea
          ref={ref}
          {...props}
          className={`${styles.tArea} ${props.className} `}
        ></textarea>
      </div>

      <p className={styles.errormessage}>{errormessage}</p>
    </div>
  );
});

export default Textarea;
