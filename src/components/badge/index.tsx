import React from "react";
import * as styles from "./styles.module.scss";
const Badge = ({ label, className }: { label: string; className?: string }) => {
  return <div className={`${styles.badge} ${className}`}>{label}</div>;
};

export default Badge;
