import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
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

  const [formError, setFormError] = useState("");
  const { setUserAuth } = useAuthContext();
  
  async function onSubmit(data: any) {
    try {
      const response = await request<LoginResType>({
        url: "/users/login/",
        data,
        method: "post",
      }).then(s => {
        setUserAuth(s.data)
      }).catch(s => {
        setFormError(s.response.data.detail)
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={`${styles.loginCard} bg-white `}>
        {/* <div className={styles.img} /> */}
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
              type="password"
              errorMessage={errors.password?.message}
            />
          </div>
          {formError && <div className="text-red text-sm mt-2">{formError}</div>}
          <Button
            // icon={<AiFillAlert />}
            isLoading={isSubmitting}
            width="full"
            type="submit"
            title="LOGIN"
            className="mt-6 font-bold"
            name="login-btn"
          />
          <div className={`${styles.forgotPassword} mt-6 `}>
            <Link to="/forgot-password">Forgot password ?</Link>
          </div>
          
        </form>
      </div>
    </>
  );
};

export default Login;
