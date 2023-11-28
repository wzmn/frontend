import TextField from "components/text-field";
import { Link, navigate } from "gatsby";
import React from "react";
import Button from "../components/button";
import * as styles from "../layout/auth-layout/styles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "schema/auth-schema";
import { InferType } from "yup";
import { request } from "services/http-request";
import { RESET_PASSWORD } from "constants/api";
import { toast } from "react-toastify";
//to triger build

type FormType = InferType<typeof emailSchema>;
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(emailSchema),
  });

  const onSubmit = async (data: FormType) => {
    try {
      const response = await request({
        url: RESET_PASSWORD,
        method: "post",
        data: {
          email: data.username,
        },
      });
      console.log(response);
      toast("Please Check Your Email");
    } catch (error) {}
  };

  return (
    <>
      <div className={`${styles.loginCard} bg-white `}>
        <div className={styles.img} />

        <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
          <h2 className={`${styles.h2} `}>Forgot Password </h2>
          <h3 className={`${styles.h3} `}>
            No worries. We'll send you reset instructions
          </h3>
          <div className="space-y-4 mt-8">
            <TextField
              {...register("username")}
              title="E-mail ID"
              errorMessage={errors.username?.message}
            />
          </div>
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            width="full"
            title="FORGOT PASSWORD"
            className="mt-10 font-bold"
            name="forgot-btn"
            type="submit"
          />

          <div className={`${styles.forgotPassword} mt-10 `}>
            <span className="text-black">Back to</span>{" "}
            <Link to="/login" replace>
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
