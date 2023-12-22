import { EmailAndUserNameReg, EmailReg } from "constants/regex";
import { object, ref, string } from "yup";

export const passwordSchema = object({
  password: string().trim().matches(/.{1,}/, "Please enter a valid Password"),
});

export const usernameSchema = object({
  username: string()
    .trim()
    .matches(EmailAndUserNameReg, "Please enter your Username or E-mail"),
});

export const emailSchema = object({
  email: string().trim().matches(EmailReg, "Please enter your E-mail"),
});

export const loginSchema = object()
  .concat(usernameSchema)
  .concat(passwordSchema);

export const confirmPasswordSchema = object({
  passwordConfirmation: string().oneOf(
    [ref("password")],
    "Passwords must match"
  ),
}).concat(passwordSchema);
