import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import * as styles from "./styles.module.scss";
import Dropdown from "components/dropdown";

const Filterbtn = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  function toggle() {
    setOpen((prev) => !prev);
  }

  return (
    <div ref={elRef} className={styles.dropdownCont}>
      <button onClick={toggle}>
        Filters
        <i>
          <IoIosArrowDown />
        </i>
      </button>
      {open && (
        <Dropdown handleToggle={toggle} position={styles.position}>
          <>{children}</>
        </Dropdown>
      )}
    </div>
  );
};

export default Filterbtn;
