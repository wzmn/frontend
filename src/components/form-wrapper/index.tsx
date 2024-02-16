import React from "react";
import * as styles from "./styles.module.scss";

type Props = {
  children: JSX.Element;
  className?: string;
};

const FormWraper = ({ children, className }: Props) => {
  console.log(`${styles.formWrapper} ${className}`)
  return <div className={`${styles.formWrapper} ${className}`}>{children}</div>;
};

export default FormWraper;
