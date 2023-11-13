import React from "react";
import * as styles from "./styles.module.scss";
type Props = {
  children: JSX.Element;
  title: string;
  note?: string;
};

const FormSection = ({ title, children, note }: Props) => {
  return (
    <div className={styles.formSection}>
      <label className={styles.label}>
        {title}
        {note && <p className={styles.note}> {note}</p>}
      </label>
      {children}
    </div>
  );
};

export default FormSection;
