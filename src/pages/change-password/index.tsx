import React from "react";
import * as styles from "../../layout/auth-layout/styles.module.scss";
import Button from "components/button";
import TextField from "components/text-field";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { confirmPasswordSchema } from "schema/auth-schema";
import { InferType } from "yup";
import { request } from "services/http-request";
import { CHANGE_EMAIL, CONFIRM_PASSWORD } from "constants/api";
import { navigate } from "gatsby";
import { toast } from "react-toastify";
import MsgToast from "services/msg-toast";

type FormType = InferType<typeof confirmPasswordSchema>;

const ChangePassword = () => {
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const userId = params.get("id");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(confirmPasswordSchema),
  });

  const onSubmit = async (data: FormType) => {
    const url = userId
      ? CHANGE_EMAIL + userId + "/reset_password"
      : CONFIRM_PASSWORD;

    const dataToSend = userId
      ? {
          enter_password: data.password,
          confirm_password: data.passwordConfirmation,
        }
      : {
          password: data.password,
          password_confirm: data.passwordConfirmation,
          token,
        };
    try {
      const response = await request({
        url: url,
        method: userId ? "patch" : "post",
        data: dataToSend,
      });
      MsgToast("changed sucessfully", "success");
      console.log(response);
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      MsgToast("Something went wrong ", "error");
    }
  };

  return (
    <>
      <div className={`${styles.loginCard} bg-white `}>
        <div className={styles.img} />

        <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
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
              {...register("password")}
              title="New Password"
              errormessage={errors.password?.message}
            />

            <TextField
              {...register("passwordConfirmation")}
              title="Confirm New Password"
              errormessage={errors.passwordConfirmation?.message}
            />
          </div>
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            width="full"
            title="RESET PASSWORD"
            className="mt-10 font-bold"
            name="reset-btn"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
