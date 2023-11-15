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
        <FaGripLines onClick={toggle} className={styles.burger} />
        <div className="flex-1 ml-1">
          <SelectBox placeholder="Select Company" color="gray" data={data} />
        </div>
      </div>
      <div className={styles.rightSide}>
        {/* <FaRegBell className={styles.bellIcon} /> */}
        <svg id="notification" xmlns="http://www.w3.org/2000/svg" width="24.394" height="27.113" viewBox="0 0 24.394 27.113">
          <g id="Group_249" data-name="Group 249">
            <path id="Path_238" data-name="Path 238" d="M38.867,17.147V12a9.014,9.014,0,0,0-5.8-8.409,3.072,3.072,0,0,0,.061-.6,2.975,2.975,0,1,0-5.95,0,3.21,3.21,0,0,0,.057.582,8.732,8.732,0,0,0-5.793,8.239v5.34a.346.346,0,0,1-.344.346,3.129,3.129,0,0,0-3.128,2.764,3.058,3.058,0,0,0,3.036,3.359h5.253a3.917,3.917,0,0,0,7.788,0H39.3a3.055,3.055,0,0,0,2.256-1,3.064,3.064,0,0,0-2.348-5.121.343.343,0,0,1-.344-.346Zm-8.712-15.4a1.237,1.237,0,0,1,1.233,1.238,1.073,1.073,0,0,1-.017.166,7.69,7.69,0,0,0-.9-.083,8.941,8.941,0,0,0-1.533.087,1.073,1.073,0,0,1-.017-.166,1.238,1.238,0,0,1,1.233-1.242Zm0,23.615a2.188,2.188,0,0,1-2.134-1.749H32.29A2.187,2.187,0,0,1,30.155,25.364Zm10.45-4.942a1.305,1.305,0,0,1-1.3,1.443H21.008a1.312,1.312,0,0,1-1.3-1.443A1.371,1.371,0,0,1,21.1,19.242a2.094,2.094,0,0,0,2.086-2.095v-5.34a6.986,6.986,0,0,1,6.969-7c.087,0,.17,0,.257,0A7.143,7.143,0,0,1,37.125,12v5.152a2.094,2.094,0,0,0,2.086,2.095A1.374,1.374,0,0,1,40.605,20.422Z" transform="translate(-17.958 0)"/>
            <circle id="Ellipse_3" data-name="Ellipse 3" cx="5" cy="5" r="5" transform="translate(14.288 1)" fill="#fed000"/>
          </g>
        </svg>

        {/* <div className="w-72">
          <SelectBox color="gray" data={data} />
        </div> */}
        <SelectList />
        {/* <GrCircleQuestion className={styles.bellIcon} /> */}
      </div>
    </div>
  );
};

export default Navbar;
