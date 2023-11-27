import React from "react";
import * as styles from "./styles.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useRightBarContext } from "providers/right-bar-provider";

const RightBar = () => {
  const { open, toggle, element, title, actions } = useRightBarContext();

  return (
    <div className={`${styles.rightBarCont}  ${open && styles.slideIn}`}>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <div className={styles.actions}>
          {/* <BsThreeDots className=" cursor-pointer" /> */}
          {actions}
          <AiOutlineClose className=" cursor-pointer" onClick={toggle} />
        </div>
      </div>
      <div className={`${styles.rightBar}`}>
        <div className={styles.barBody}>{element}</div>
      </div>
    </div>
  );
};

export default RightBar;
