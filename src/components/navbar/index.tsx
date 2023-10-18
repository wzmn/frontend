import SelectBox from "components/selectBox";
import { FaRegBell } from "react-icons/fa";
import React from "react";
import * as styles from "./styles.module.scss";

const data = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <SelectBox color="gray" data={data} />
      <div className="flex items-center gap-4">
        <FaRegBell className="text-2xl" />
        <SelectBox color="gray" data={data} />
      </div>
    </div>
  );
};

export default Navbar;
