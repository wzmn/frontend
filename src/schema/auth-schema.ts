import { EmailAndUserNameReg } from "constants/regex";
import { object, string } from "yup";

export const passwordSchema = object({
  password: string().trim().matches(/.{1,}/, "Password must be min 8 char"),
});

export const emailSchema = object({
  username: string().trim().matches(EmailAndUserNameReg, "invalid"),
});

export const loginSchema = object().concat(emailSchema).concat(passwordSchema);
