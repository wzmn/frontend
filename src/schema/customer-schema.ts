import { EmailReg } from "constants/regex";
import { InferType, object, string } from "yup";

export const customerRegistrationSchema = object({
  user: object({
    first_name: string().trim().required("Required"),
    last_name: string().trim().required("Required"),
    phone: string().trim().required("Required"),
    email: string().trim().matches(EmailReg, "Invalid email"),
  }),
  //   role: string().required("required"),
});

export type CustomerRegistrationSchemaType = InferType<
  typeof customerRegistrationSchema
>;
