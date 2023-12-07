import { EmailAndUserNameReg } from "constants/regex";
import { object, ref, string } from "yup";

export const passwordSchema = object({
  password: string().trim().matches(/.{1,}/, "Please enter a valid Password"),
});

export const emailSchema = object({
  username: string().trim().matches(EmailAndUserNameReg, "Please enter your Username or E-mail"),
});

export const loginSchema = object().concat(emailSchema).concat(passwordSchema);

export const confirmPasswordSchema = object({
  passwordConfirmation: string().oneOf(
    [ref("password")],
    "Passwords must match"
  ),
}).concat(passwordSchema);
