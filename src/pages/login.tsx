import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import Button from "components/button";
import TextField from "components/text-field";
import { Link, PageProps, navigate } from "gatsby";
import { useForm } from "react-hook-form";
import { loginSchema } from "schema/auth-schema";
import * as styles from "../layout/auth-layout/styles.module.scss";
import { request } from "services/http-request";
import { LoginResType } from "type/auth";
import { useAuthContext } from "providers/auth-provider";
import { ComResultT } from "type/company";
import { COMPANY_LISTING } from "constants/api";

const Login = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [formError, setFormError] = useState("");
  const { setUserAuth, setCompanyAuth } = useAuthContext();

  async function onSubmit(data: any) {
    try {
      const response = await request<LoginResType>({
        url: "/users/login/",
        data,
        method: "post",
      })
        .then(async (s) => {
          // if (!s?.data?.is_password_set) {
          //   navigate(`/change-password?id=${s?.data?.user_id}`);
          //   return;
          // }
          setUserAuth(s?.data);

          if (s.data.staff === "false") {
            if (s.data.emp.role.toLowerCase() === "owner") {
              try {
                const ownerResp = await request<ComResultT>({
                  url: COMPANY_LISTING + s?.data?.emp_license_info?.company?.id,
                  method: "GET",
                });
                setCompanyAuth(ownerResp.data);
                // if (!ownerResp.data?.company_verified) {
                //   navigate("/upload-company-details");
                // }
              } catch (error) {}
            }
          }
        })
        .catch((s) => {
          setFormError(s.response.data.detail);
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
              title="Email"
              errormessage={errors.username?.message}
            />

            <TextField
              {...register("password")}
              id="password"
              title="Password"
              type="password"
              errormessage={errors.password?.message}
            />
          </div>
          {formError && (
            <div className="text-red text-sm mt-2">{formError}</div>
          )}
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
