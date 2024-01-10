import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import * as styles from "./styles.module.scss";
import Dropdown from "components/dropdown";

const Filterbtn = ({
  title,
  children,
  icon,
}: {
  children: JSX.Element[] | JSX.Element;
  title: string;
  icon: JSX.Element;
}) => {
  const [open, setOpen] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  function toggle() {
    setOpen((prev) => !prev);
  }

  return (
    <div ref={elRef} className={styles.dropdownCont}>
      <button onClick={toggle}>
        {title}
        <i>{icon}</i>
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
