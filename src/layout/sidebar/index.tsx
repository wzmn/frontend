import React from "react";
import {
  AiOutlinePoweroff,
  AiOutlineLeftCircle,
  AiFillAmazonCircle,
} from "react-icons/ai";
import * as styles from "./styles.module.scss";
import { useSidebarContext } from "providers/sidebar-provider";
import { Link } from "gatsby";
import { useAuthContext } from "providers/auth-provider";
import logo from "./logo.png"
import user from "./user.png"

const sideBarData = [
  {
    svg: "/assets/icons/Line.svg",
    title: "Dashboard",
    link: "/",
  },
  {
    svg: "/assets/icons/customer.svg",
    title: "Customers",
    link: "/customers",
  },
  {
    svg: "/assets/icons/Layer.svg",
    title: "Jobs",
    link: "/jobs",
  },
  {
    svg: "/assets/icons/to-do-list.svg",
    title: "Appointments",
    link: "/appointments",
  },
  {
    svg: "/assets/icons/group.svg",
    title: "Employees",
    link: "/employees",
  },
  {
    svg: "/assets/icons/building.svg",
    title: "Company",
    link: "/company",
  },
  {
    svg: "/assets/icons/settings.svg",
    title: "Settings",
    link: "/settings",
  },
] as const;

const Sidebar = () => {
  const { sidebarFlag, toggle } = useSidebarContext();
  const { setUserAuth } = useAuthContext();

  return (
    <div className={`${styles.sidebarCont} ${sidebarFlag && styles.slideIn}`}>
      <span className={styles.backArrow} onClick={toggle}>
        <AiOutlineLeftCircle />
      </span>
      <div className={`${styles.sidebar} `}>
      <div className={styles.userDetails}>
        <img
          className={styles.userImg}
          src={user}
          alt="user image"
        />
        <div className={styles.userName}>
          <p>Jason Jackson</p>
          <div className={styles.userRole}>
            <p>Superadmin</p>
            <span className={styles.icon} onClick={() => setUserAuth(null)}>
              <AiOutlinePoweroff />
            </span>
          </div>
        </div>
      </div>
        <div className={styles.menu}>
          <div className={styles.sidebarLinks}>
            {sideBarData.map((item) => {
              return (
                <Link
                  partiallyActive={item.link !== "/" ? true : false}
                  activeClassName={styles.active}
                  key={item.title}
                  to={item.link}
                  className={styles.link}
                >
                  <img className={styles.img} src={item.svg} alt={item.title} />
                  <p>{item.title}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.logo}>
          <img src={logo} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
