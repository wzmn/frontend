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
import logo from "./logo.png";
import user from "./user.png";
import UserIdentifyer from "services/user-identifyer";
import { userAccessRouter } from "providers/auth-provider/user-page-permissions";

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
    svg: "/assets/icons/to-do-list.svg",
    title: "Publish",
    link: "/publish",
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
  const { setUserAuth, userAuth } = useAuthContext();

  const routeAccess = userAccessRouter();

  return (
    <div className={`${styles.sidebarCont} ${sidebarFlag && styles.slideIn}`}>
      <span className={styles.backArrow} onClick={toggle}>
        <AiOutlineLeftCircle />
      </span>
      <div className={`${styles.sidebar} `}>
        <div className={styles.userDetails}>
          <img className={styles.userImg} src={user} alt="user image" />
          <div className={styles.userName}>
            <p>{`${userAuth.first_name} ${userAuth.last_name}`}</p>
            <div className={styles.userRole}>
              <p>{UserIdentifyer()}</p>
              <span className={styles.icon} onClick={() => setUserAuth(null)}>
                <AiOutlinePoweroff />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.menu}>
          <div className={styles.sidebarLinks}>
            {sideBarData.map((item) => {
              if (!routeAccess.includes(item.link)) return null;
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
          <div className="flex justify-center mt-4">
            <a target="_blank" href="https://snippit.com.au">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
