import React from "react";
import * as styles from "./styles.module.scss";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.footerContent}>
        ©️ 2023 - 2024 Snippit all rights reserved
        <ul className={styles.footerList}>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Contact Us</li>
        </ul>
      </p>
      <img src="/assets/icons/apple-logo.svg" alt="" />
      <img src="/assets/icons/google-play.svg" alt="" />
    </div>
  );
};

export default Footer;
