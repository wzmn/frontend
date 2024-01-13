import { EmailReg } from "constants/regex";
import { InferType, array, bool, boolean, mixed, object, string } from "yup";
import { addressSchema } from "./address-schema";

export const jobRegistrationSchema = object({
  billAddCheck: boolean(),
  workType: array().min(1, "at least one must be selected"),

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
    abn: string().when("customer_type", {
      is: "Business",
      then: (schema) => schema.required("Required"),
    }),
    company_name: string().when("customer_type", {
      is: "Business",
      then: (schema) => schema.required("Required"),
    }),
  }),
  job_assigned_to_id: string().trim().required("Required"),
  address: addressSchema,
  billing_address: mixed().when("billAddCheck", {
    is: true,
    then: (schema) => schema.concat(addressSchema),
  }),
});

export type JobRegistrationSchemaType = InferType<typeof jobRegistrationSchema>;
