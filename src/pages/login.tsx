import React from "react";
import * as styles from "../styles/login.module.css";
import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";
import { FaBeer } from "react-icons/fa";

const Login = () => {
  return (
    <>
      <div className={`${styles.loginMain} `}>
        <div className={`${styles.loginCard} bg-white `}>
          <div className={styles.img} />

          <div className={styles.content}>
            <h2 className={styles.h2}>Let's get Started </h2>
            <h3 className=" ">Sign In to your account</h3>

            <div className="space-y-4 mt-4">
              <Label title="Username" htmlFor="username" />
              <Input id="username" placeholder="Username" />
            </div>

            <div className="space-y-4 mt-4">
              <Label title="Password" htmlFor="password" />
              <Input id="password" placeholder="Password" />
            </div>

            <Button
              // isLoading={true}
              title="Login"
              className="mt-10 font-bold"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
