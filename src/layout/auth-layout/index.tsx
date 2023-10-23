import React from "react";
import * as styles from "./styles.module.scss";
type Props = {
  children: JSX.Element;
};
const AuthLayout = ({ children }: Props) => {
  return (
    <div className={styles.authLayout}>
      {/* <div className={styles.tPoint} /> */}
      {/* <div className={styles.mPoint} /> */}
      {/* <div className={styles.bPoint} /> */}

      {children}
    </div>
  );
};

export default AuthLayout;
