import React from "react";
import { FaBeer } from "react-icons/fa";
import * as styles from "./styles.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  isLoading?: boolean;
  groupTitle?: string;
}

const ButtonGroup = ({
  title,
  isLoading,
  icon,
  groupTitle,
  ...props
}: Props) => {
  return (
    <div className={styles.gBtnCont}>
      <button {...props} className={` ${styles.gBtn}`} type="button">
        {icon && <div className="icon">{icon}</div>}
        <p className={styles.title}>{title}</p>
        {/* {isLoading && (
        <div className="icon">
          <FaBeer />
        </div>
      )} */}
      </button>
      <span className={styles.group}>{groupTitle}</span>
    </div>
  );
};

export default ButtonGroup;
