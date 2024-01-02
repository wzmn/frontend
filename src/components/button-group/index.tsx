import React from "react";
import { FaBeer } from "react-icons/fa";
import * as styles from "./styles.module.scss";
//trigger build ci/cd
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
    <button {...props} className={styles.gBtnCont} type="button">
      <div className={` ${styles.gBtn}`}>
        {icon && <div className="icon">{icon}</div>}
        <p className={styles.title}>{title}</p>
        {/* {isLoading && (
        <div className="icon">
          <FaBeer />
        </div>
      )} */}
      </div>
      <span className={styles.group}>{groupTitle}</span>
    </button>
  );
};

export default ButtonGroup;
