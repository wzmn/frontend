import React from "react";
import {
  AiOutlinePoweroff,
  AiOutlineLeftCircle,
  AiFillAmazonCircle,
} from "react-icons/ai";
import * as styles from "./styles.module.scss";
import { useSidebarContext } from "providers/sidebar-provider";

const sideBarData = [
  {
    svg: "/assets/icons/Line.svg",
    title: "Dashboard",
  },
  {
    svg: "/assets/icons/customer.svg",
    title: "Customers",
  },
  {
    svg: "/assets/icons/Layer.svg",
    title: "Jobs",
  },
  {
    svg: "/assets/icons/to-do-list.svg",
    title: "Appointments",
  },
  {
    svg: "/assets/icons/group.svg",
    title: "Users",
  },
  {
    svg: "/assets/icons/building.svg",
    title: "Company",
  },
  {
    svg: "/assets/icons/settings.svg",
    title: "Settings",
  },
] as const;

const Sidebar = () => {
  const { sidebarFlag, toggle } = useSidebarContext();

  return (
    <div className={`${styles.sidebarCont} ${sidebarFlag && styles.slideIn}`}>
      <span className={styles.backArrow} onClick={toggle}>
        <AiOutlineLeftCircle />
      </span>
      <div className={`${styles.sidebar} `}>
        <div className="">
          {/* {sidebarFlag + ""} */}
          <div className={styles.titleImg}></div>

          <div className={styles.iconsCont}>
            {sideBarData.map((item, key) => {
              return (
                <div className={styles.icons}>
                  <img className={styles.img} src={item.svg} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.userDetails}>
          <img
            className={styles.userImg}
            src="/assets/images/Group.png"
            alt="user image"
          />
          <div className={styles.userName}>
            <p>Jason Jackson</p>
            <div className={styles.userRole}>
              <p>Superadmin</p>
              <span className={styles.icon}>
                <AiOutlinePoweroff />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
