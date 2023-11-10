import SelectList from "components/select-list";
import { useSidebarContext } from "providers/sidebar-provider";
import React from "react";
import { FaGripLines, FaRegBell } from "react-icons/fa";
import { GrCircleQuestion } from "react-icons/gr";
import * as styles from "./styles.module.scss";
import SelectBox from "components/selectBox";

const data = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const Navbar = () => {
  const { toggle } = useSidebarContext();
  return (
    <div className={styles.navbar}>
      <div className="w-72 flex items-center gap-3">
        <FaGripLines onClick={toggle} className={styles.berger} />
        <div className="flex-1 ">
          <SelectBox placeholder="Select Company" color="gray" data={data} />
        </div>
      </div>
      <div className={styles.rightSide}>
        <FaRegBell className={styles.bellIcon} />
        {/* <div className="w-72">
          <SelectBox color="gray" data={data} />
        </div> */}
        <SelectList />
        <GrCircleQuestion className={styles.bellIcon} />
      </div>
    </div>
  );
};

export default Navbar;
