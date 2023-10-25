import { object, string } from "yup";

export const passwordSchema = object({
  password: string().trim().matches(/.{8,}/, "Password must be min 8 char"),
});

export const emailSchema = object({
  email: string()
    .trim()
    .matches(
      /^(?:[A-Z\d][A-Z\d_-]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
      "invalid"
    ),
});

export const loginSchema = object().concat(emailSchema).concat(passwordSchema);
