import React from "react";
import * as styles from "./styles.module.css";
import { useRightBarContext } from "../../providers/right-bar-provider";
const Sidebar = () => {
  const { open, toggle } = useRightBarContext();
  return (
    <div className={styles.sidebar}>
      sidebar {open + ""}
      <br />
      <button onClick={toggle}>Click Me</button>
    </div>
  );
};

export default Sidebar;
