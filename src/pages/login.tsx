import React from "react";
import * as styles from "../layout/auth-layout/styles.module.scss";
import { AiFillAccountBook, AiFillAlert } from "react-icons/ai";
import Button from "components/button";
import Input from "components/input";
import Label from "components/label";
import { Link } from "gatsby";

const Login = () => {
  return (
    <>
      <div className={`${styles.loginCard} bg-white `}>
        <div className={styles.img} />

        <div className={styles.content}>
          <h2 className={`${styles.h2} `}>Let's get Started </h2>
          <h3 className={`${styles.h3} `}>Sign In to your account</h3>

          <div className="space-y-4 mt-4">
            <Label title="Username" htmlFor="username" />
            <Input id="username" placeholder="Username" />
          </div>

          <div className="space-y-4 mt-4">
            <Label title="Password" htmlFor="password" />
            <Input id="password" placeholder="Password" />
          </div>

          <Button
            // icon={<AiFillAlert />}
            // isLoading={true}
            title="LOGIN"
            className="mt-10 font-bold"
          />
          <div className={`${styles.forgotPassword} font-size14 mt-10 `}>
            <Link to="/forgot-password">Forgot password ?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
