import React, { useEffect, useRef } from "react";
import yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import * as styles from "../layout/auth-layout/styles.module.scss";
import { AiFillAccountBook, AiFillAlert } from "react-icons/ai";
import Button from "components/button";
import Input from "components/input";
import Label from "components/label";
import { Link } from "gatsby";
import Axios from "services/Axios";
import { useForm } from "react-hook-form";
import { loginSchema } from "schema/auth-schema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  useEffect(() => {
    Axios.post("/users/login/", {
      username: "admin@example.com",
      password: "Test@4321",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className={`${styles.loginCard} bg-white `}>
        <div className={styles.img} />

        <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
          <h2 className={`${styles.h2} `}>Let's get Started </h2>
          <h3 className={`${styles.h3} `}>Sign In to your account</h3>

          <div className="space-y-4 mt-4">
            <Label title="Username" htmlFor="username" />
            <Input
              {...register("email")}
              id="username"
              placeholder="Username"
              errorMessage={errors.email?.message}
            />
          </div>

          <div className="space-y-4 mt-4">
            <Label title="Password" htmlFor="password" />
            <Input
              {...register("password")}
              id="password"
              placeholder="Password"
              errorMessage={errors.password?.message}
            />
          </div>

          <Button
            // icon={<AiFillAlert />}
            // isLoading={true}
            width="full"
            type="submit"
            title="LOGIN"
            className="mt-10 font-bold"
          />
          <div className={`${styles.forgotPassword} mt-10 `}>
            <Link to="/forgot-password">Forgot password ?</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
