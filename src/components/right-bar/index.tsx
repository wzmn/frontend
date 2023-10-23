import React from "react";
import * as styles from "./styles.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useRightBarContext } from "../../providers/right-bar-provider";

const RightBar = () => {
  const { open, toggle } = useRightBarContext();

  return (
    <div className={`${styles.rightBar} ${open && styles.slideIn}`}>
      <div className={styles.header}>
        <p className={styles.title}>ABN No: AA0044</p>
        <div className="flex gap-3">
          <BsThreeDots className="text-xl cursor-pointer" />
          <AiOutlineClose className="text-xl cursor-pointer" onClick={toggle} />
        </div>
      </div>
    </div>
  );
};

export default RightBar;
