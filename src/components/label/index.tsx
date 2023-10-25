import React from "react";
import * as styles from "./styles.module.scss";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ title, htmlFor, ...props }: Props) => {
  return (
    <label {...props} htmlFor={htmlFor} className={styles.label}>
      {title}
    </label>
  );
};

export default Label;
