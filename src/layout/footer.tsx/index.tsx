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
          <a
            href="https://snippit.com.au/?post_type=page&p=698"
            target="_blank"
          >
            Terms & Conditions
          </a>
        </li>
        <li>
          <a href="https://snippit.com.au/?post_type=page&p=3" target="_blank">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="mailto:support@snippit.com.au" className="" target="_blank">
            Contact Us
          </a>
        </li>
      </ul>
      <div className={styles.mobileLinks}>
        <a
          href="https://apps.apple.com/au/app/snippit/id6446515712"
          target="_black"
        >
          <img src="/assets/icons/apple-logo.svg" alt="" />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.snippit.snippit_app&pli=1"
          target="_blank"
        >
          <img src="/assets/icons/google-play.svg" alt="" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
