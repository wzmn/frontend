import React from "react";
import * as styles from "./styles.module.scss";
type Props = {
  children: JSX.Element;
};
const AuthLayout = ({ children }: Props) => {
  return (
    <div className={styles.authLayout}>
      <div className="c-container">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
