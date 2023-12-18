import { EmailReg } from "constants/regex";
import { InferType, mixed, object, string } from "yup";
import { addressSchema } from "./address-schema";

export const jobRegistrationSchema = object({
  workType: mixed(),
  customer: object({
    user: object({
      first_name: string().trim().required("Required"),
      last_name: string().trim().required("Required"),
      phone: string().trim().required("Required"),
      email: string()
        .trim()
        .matches(EmailReg, "Invalid email")
        .required("Required"),
    }),
    customer_type: string().required("Required"),
  }),
  job_assigned_to_id: string().nullable(),
  address: addressSchema,
});

export type JobRegistrationSchemaType = InferType<typeof jobRegistrationSchema>;
