import SelectBox from "components/selectBox";
import { FaRegBell, FaGripLines } from "react-icons/fa";
import React from "react";
import * as styles from "./styles.module.scss";
import { useSidebarContext } from "providers/sidebar-provider";

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
        {/* <div className="flex-1">
          <SelectBox color="gray" data={data} />
        </div> */}
      </div>
      <div className="flex items-center gap-4">
        <FaRegBell className="text-2xl" />
        {/* <div className="w-72">
          <SelectBox color="gray" data={data} />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
