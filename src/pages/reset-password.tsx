import React from "react";
import * as styles from "../layout/auth-layout/styles.module.scss";
import Button from "../components/button";
import TextField from "components/text-field";

const ResetPassword = () => {
  return (
    <>
      <div className={`${styles.loginCard} bg-white `}>
        <div className={styles.img} />

        <div className={styles.content}>
          <h2 className={`${styles.h2} `}>Reset your Password </h2>
          <h3 className={`${styles.h3} `}>
            Securing password is your key to online safety
          </h3>
          {/* <div className="space-y-4 mt-4">
              <Label title="Current Password" htmlFor="current-password" />
              <Input id="current-password" placeholder="Current Password" />
            </div> */}

          <div className="space-y-8 mt-8">
            <TextField
              // {...register("password")}
              // id="password"
              title="New Password"
              // errorMessage={errors.password?.message}
            />

            <TextField
              // {...register("password")}
              // id="password"
              title="Confirm New Password"
              // errorMessage={errors.password?.message}
            />
          </div>
          <Button
            // isLoading={true}
            width="full"
            title="RESET PASSWORD"
            className="mt-10 font-bold"
            name="reset-btn"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
