import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "components/text-field";
import { RESET_PASSWORD } from "constants/api";
import { Link } from "gatsby";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { usernameSchema } from "schema/auth-schema";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import { InferType } from "yup";
import Button from "../components/button";
import * as styles from "../layout/auth-layout/styles.module.scss";
//to triger build

type FormType = InferType<typeof usernameSchema>;
const ForgotPassword = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(usernameSchema),
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
      MsgToast("Please Check Your Email", "success", 400);
    } catch (error: any) {
      setError(error.response.data.email[0]);
    }
  };

  return (
    <>
      <div className={`${styles.loginCard} bg-white `}>
        {/* <div className={styles.img} /> */}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
          <h2 className={`${styles.h2} `}>Forgot Password </h2>
          <h3 className={`${styles.h3} `}>
            No worries. We'll send you reset instructions
          </h3>
          <div className="space-y-4 mt-8">
            <TextField
              {...register("username")}
              title="E-mail ID"
              errormessage={errors.username?.message}
            />
          </div>
          {error && <div className="text-red text-sm mt-2">{error}</div>}
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            width="full"
            title="RESET PASSWORD"
            className="mt-6 font-bold"
            name="forgot-btn"
            type="submit"
          />

          <div className={`${styles.forgotPassword} mt-6 `}>
            <span className="text-black">Back to</span>{" "}
            <Link to="/login" replace>
              Login
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default ForgotPassword;
