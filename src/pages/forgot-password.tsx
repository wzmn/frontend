import React from "react";
import * as styles from "../styles/login.module.css";
import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";

const ForgotPassword = () => {
  return (
    <>
      <div className={`${styles.loginMain} `}>
        <div className={`${styles.loginCard} bg-white `}>
          <div className={styles.img} />

          <div className={styles.content}>
            <h2 className={`${styles.h2} `}>Forgot Password </h2>
            <h3 className={`${styles.h3} `}>
              No worries. We'll send you reset instructions
            </h3>
            <div className="space-y-4 mt-4">
              <Label title="E-mail ID" htmlFor="E-mail-ID" />
              <Input id="E-mail-ID" placeholder="E-mail ID" />
            </div>
            <Button
              // isLoading={true}
              title="RESET PASSWORD"
              className="mt-10 font-bold"
            />

            <p className={`${styles.forgotPassword} mt-10 cursor-pointer`}>
              <span className="text-black">Back to</span> Login
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
