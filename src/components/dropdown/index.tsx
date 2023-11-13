import React, { useEffect, useRef } from "react";
import * as styles from "./styles.module.scss";
function Dropdown({
  children,
  position,
  style = {},
  handleToggle = () => {},
}: any) {
  const elRef = useRef<HTMLDivElement>(null);

  function eventHandler(e: MouseEvent) {
    const node = e.target as Node | null;
    if (elRef.current?.parentElement?.contains(node)) {
      console.log("parent");
    } else {
      console.log("not parent");
      handleToggle();
    }
  }

  useEffect(() => {
    console.log(elRef.current?.parentElement);
    document.addEventListener("click", eventHandler, true);
    return () => {
      document.removeEventListener("click", eventHandler, true);
    };
  }, []);

  return (
    <div
      ref={elRef}
      id="dropdown"
      style={style}
      className={`${styles.dropdown} ${position}`}
    >
      {children}
    </div>
  );
}

export default Dropdown;
