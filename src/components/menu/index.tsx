import React, { CSSProperties, useState } from "react";
import * as cssStyles from "./styles.module.scss";
import Dropdown from "components/dropdown";
import { IoIosArrowForward } from "react-icons/io";
function Menu({
  title,
  children,
  icon,
  arrow,
  dropPosition = "",
  styles,
}: {
  arrow?: boolean;
  title?: string;
  children: JSX.Element;
  icon?: JSX.Element;
  dropPosition?: string;
  styles?: CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  function toggle(e: any) {
    e?.stopPropagation();
    console.log("clicked");
    setOpen((prev) => !prev);
  }

  return (
    <div className={cssStyles.menu}>
      <button onClick={toggle}>
        {title} {icon && icon}
        {arrow && (
          <i>
            <IoIosArrowForward />
          </i>
        )}
      </button>
      {open && (
        <Dropdown handleToggle={toggle} position={dropPosition} style={styles}>
          {children}
        </Dropdown>
      )}
    </div>
  );
}

export default Menu;
