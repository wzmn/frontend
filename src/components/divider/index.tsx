import React from "react";
import * as styles from "./styles.module.scss";

const Divider = ({ className = "" }: { className?: string }) => {
  return <div className={`${styles.divider} ${className}`} />;
};

export default Divider;
