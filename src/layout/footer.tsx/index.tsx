import React from "react";
import * as styles from "./styles.module.scss";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        ©️ 2023 - 2024 Snippit all rights reserved
      </div>
      <ul className={styles.footerList}>
        <li>
          <a href="https://snippit.com.au/?post_type=page&p=698">Terms & Conditions</a>
        </li>
        <li>
          <a href="https://snippit.com.au/?post_type=page&p=3">Privacy Policy</a>
        </li>
        <li>Contact Us</li>
      </ul>
      <div className={styles.mobileLinks}>
        <img src="/assets/icons/apple-logo.svg" alt="" />
        <img src="/assets/icons/google-play.svg" alt="" />
      </div>
    </div>
  );
};

export default Footer;
