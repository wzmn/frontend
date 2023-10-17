import React from "react";
import * as styles from "./styles.module.scss";
type Props = {
  children: JSX.Element;
  title: string;
};

const FormSection = ({ title, children }: Props) => {
  return (
    <div className={styles.formSection}>
      <label className={styles.label}>{title}</label>
      {children}
    </div>
  );
};

export default FormSection;
