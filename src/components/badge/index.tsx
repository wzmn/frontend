import React, { HTMLAttributes } from "react";
import * as styles from "./styles.module.scss";

type BadgeT = HTMLAttributes<HTMLDivElement> & {
  label: string;
};

const Badge = ({ label,className, ...props}:BadgeT) => {
  return <div className={`${styles.badge} ${className}`} {...props}>{label}</div>;
};

export default Badge;
