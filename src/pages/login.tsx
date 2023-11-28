import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import Button from "components/button";
import TextField from "components/text-field";
import { Link, PageProps } from "gatsby";
import { useForm } from "react-hook-form";
import { loginSchema } from "schema/auth-schema";
import * as styles from "../layout/auth-layout/styles.module.scss";
import { request } from "services/http-request";
import { LoginResType } from "type/auth";
import { useAuthContext } from "providers/auth-provider";

const Login = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { setUserAuth } = useAuthContext();

  async function onSubmit(data: any) {
    try {
      const response = await request<LoginResType>({
        url: "/users/login/",
        data,
        method: "post",
      });
      // if(AxiosExceptStatueReg.test(String(response.status)) ){
      setUserAuth(response.data);
      // }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={`${styles.loginCard} bg-white `}>
        <div className={styles.img} />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
          <h2 className={`${styles.h2} `}>Let's get Started </h2>
          <h3 className={`${styles.h3} `}>Sign In to your account</h3>

          <div className="space-y-8 mt-8">
            <TextField
              {...register("username")}
              id="username"
              title="Username"
              errorMessage={errors.username?.message}
            />

            <TextField
              {...register("password")}
              id="password"
              title="Password"
              errorMessage={errors.password?.message}
            />
          </div>

          <Button
            // icon={<AiFillAlert />}
            isLoading={isSubmitting}
            width="full"
            type="submit"
            title="LOGIN"
            className="mt-10 font-bold"
            name="login-btn"
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
