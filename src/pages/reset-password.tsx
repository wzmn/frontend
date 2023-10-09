import React from "react";
import * as styles from "../styles/login.module.css";
import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";

const ResetPassword = () => {
  return (
    <>
      <div className={`${styles.loginMain} `}>
        <div className={`${styles.loginCard} bg-white `}>
          <div className={styles.img} />

          <div className={styles.content}>
            <h2 className={`${styles.h2} `}>Reset your Password </h2>
            <h3 className={`${styles.h3} `}>
              Securing password is your key to online safety
            </h3>
            <div className="space-y-4 mt-4">
              <Label title="Current Password" htmlFor="current-password" />
              <Input id="current-password" placeholder="Current Password" />
            </div>

            <div className="space-y-4 mt-4">
              <Label title="New Password" htmlFor="new-password" />
              <Input id="new-password" placeholder="New Password" />
            </div>

            <div className="space-y-4 mt-4">
              <Label
                title="Confirm New Password"
                htmlFor="confirm-new-password"
              />
              <Input
                id="confirm-new-password"
                placeholder="Confirm New Password"
              />
            </div>
            <Button
              // isLoading={true}
              title="RESET PASSWORD"
              className="mt-10 font-bold"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
