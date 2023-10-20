import SelectBox from "components/selectBox";
import { FaRegBell } from "react-icons/fa";
import React from "react";
import * as styles from "./styles.module.scss";

const data = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className="w-72">
        <SelectBox color="gray" data={data} />
      </div>
      <div className="flex items-center gap-4">
        <FaRegBell className="text-2xl" />
        <div className="w-72">
          <SelectBox color="gray" data={data} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
