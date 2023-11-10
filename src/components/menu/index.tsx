import React, { useState } from "react";
import * as styles from "./styles.module.scss";
import Dropdown from "components/dropdown";
import { IoIosArrowForward } from "react-icons/io";
function Menu({ title, children }: any) {
  const [open, setOpen] = useState(false);
  function toggle(e: any) {
    e?.stopPropagation();
    console.log("clicked");
    setOpen((prev) => !prev);
  }

  return (
    <div className={styles.menu}>
      <button onClick={toggle}>
        {title}{" "}
        <i>
          <IoIosArrowForward />
        </i>
      </button>
      {open && (
        <Dropdown handleToggle={toggle} position={styles.dropPosition}>
          {children}
        </Dropdown>
      )}
    </div>
  );
}

export default Menu;
