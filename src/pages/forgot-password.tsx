import React from "react";
import * as styles from "../layout/auth-layout/styles.module.scss";
import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";
import { Link } from "gatsby";
import TextField from "components/text-field";
//to triger build
const ForgotPassword = () => {
  return (
    <>
      <div className={`${styles.loginCard} bg-white `}>
        <div className={styles.img} />

        <div className={styles.content}>
          <h2 className={`${styles.h2} `}>Forgot Password </h2>
          <h3 className={`${styles.h3} `}>
            No worries. We'll send you reset instructions
          </h3>
          <div className="space-y-4 mt-8">
            <TextField
              // {...register("password")}

              title="E-mail ID"
              // errorMessage={errors.password?.message}
            />
          </div>
          <Button
            // isLoading={true}
            title="FORGOT PASSWORD"
            className="mt-10 font-bold"
            name="forgot-btn"
          />

          <div className={`${styles.forgotPassword} mt-10 `}>
            <span className="text-black">Back to</span>{" "}
            <Link to="/login" replace>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
