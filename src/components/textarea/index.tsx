import React, { forwardRef } from "react";
import * as styles from "./styles.module.scss";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  //...add your custom types here
  asterisk?: boolean;
  errorMessage?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { placeholder, errorMessage } = props;

  return (
    <div className={styles.tAreaCont}>
      <div className={styles.tAreaHolder}>
        <textarea
          ref={ref}
          {...props}
          className={`${styles.tArea} ${props.className} `}
        ></textarea>
      </div>

      <p className={styles.errorMessage}>{errorMessage}</p>
    </div>
  );
});

export default Textarea;
