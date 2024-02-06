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
import PhoneInput from "react-phone-number-input";
import MsgToast from "services/msg-toast";

type ChangeEmailFormT = InferType<typeof emailSchema>;

const ChangeEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangeEmailFormT>({
    resolver: yupResolver(emailSchema),
  });

  const { userAuth, setUserAuth } = useAuthContext();

  async function onSubmit(data: ChangeEmailFormT) {
    try {
      const response = await request({
        method: "patch",
        url: CHANGE_EMAIL + userAuth.user_id,
        data,
      });
      const updatedData = { ...userAuth, email: data?.email! };
      setUserAuth(updatedData);
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField {...register("email")} title="Enter New Email" />

      <Button
        type="submit"
        title="send"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      />
    </form>
  );
};

const ChangePhone = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<Record<"phone", string>>({
    //   resolver: yupResolver(emailSchema),
    defaultValues: {
      //   phone: "",
    },
  });

  const { userAuth, setUserAuth } = useAuthContext();
  const phone = watch("phone");

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
      const updatedData = { ...userAuth, phone: phone };
      setUserAuth(updatedData);
      MsgToast("updated", "success");
    } catch (error) {
      MsgToast("failed to update phone no.", "error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <PhoneInput
        defaultCountry="AU"
        countryCallingCodeEditable={false}
        international
        className="w-full"
        placeholder="Enter Landline Number"
        value={phone!}
        onChange={(val) => setValue("phone", val!)}
        inputComponent={TextField}
      />
      <Button
        type="submit"
        title="send"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      />
    </form>
  );
};

export { ChangeEmail, ChangePhone };
