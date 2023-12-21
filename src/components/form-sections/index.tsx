import React from "react";
import * as styles from "./styles.module.scss";
type Props = {
  children: JSX.Element;
  title: string;
  note?: string;
  style?: object;
};

const FormSection = ({ title, children, note, style }: Props) => {
  return (
    <div className={styles.formSection} style={style}>
      <label className={styles.label}>
        {title}
        {note && <p className={styles.note}> {note}</p>}
      </label>
      {children}
    </div>
  );
};

export default FormSection;
