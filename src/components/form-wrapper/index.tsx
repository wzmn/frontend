import React from "react";
import * as styles from "./styles.module.scss";

type Props = {
  children: JSX.Element;
};

const FormWraper = ({ children }: Props) => {
  return <div className={styles.formWrapper}>{children}</div>;
};

export default FormWraper;
