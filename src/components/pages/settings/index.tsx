import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button";
import Input from "components/input";
import { CHANGE_EMAIL } from "constants/api";
import { useAuthContext } from "providers/auth-provider";
import React from "react";
import { useForm } from "react-hook-form";
import { emailSchema } from "schema/auth-schema";
import { request } from "services/http-request";
import { InferType } from "yup";
import * as styles from "./styles.module.scss";
import TextField from "components/text-field";

type ChangeEmailFormT = InferType<typeof emailSchema>;

const ChangeEmail = () => {
  const { register, handleSubmit } = useForm<ChangeEmailFormT>({
    resolver: yupResolver(emailSchema),
  });

  const { userAuth } = useAuthContext();

  async function onSubmit(data: ChangeEmailFormT) {
    try {
      const response = await request({
        method: "patch",
        url: CHANGE_EMAIL + userAuth.user_id,
        data,
      });
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField {...register("email")} title="Enter New Email" />

      <Button title="send" />
    </form>
  );
};

const ChangePhone = () => {
  const { register, handleSubmit } = useForm<Record<"phone", string>>({
    //   resolver: yupResolver(emailSchema),
    defaultValues: {
      //   phone: "",
    },
  });

  const { userAuth } = useAuthContext();

  async function onSubmit(data: Record<"phone", string>) {
    if (data.phone === "") return;
    try {
      const response = await request({
        method: "patch",
        url: CHANGE_EMAIL + userAuth.user_id,
        data: {
          ...data,
          id: userAuth.user_id,
        },
      });
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField {...register("phone")} title="Enter New Phone no." />
      <Button
        title="send"
        onClick={() => {
          console.log("hi");
        }}
      />
    </form>
  );
};

export { ChangeEmail, ChangePhone };
