import { EmailReg } from "constants/regex";
import { InferType, boolean, object, string } from "yup";
import { AddressSchemaT, addressSchema } from "./address-schema";

export const customerRegistrationSchema = object({
  customer_type: string().required("Required"),
  user: object({
    first_name: string().trim().required("Required"),
    last_name: string().trim().required("Required"),
    phone: string().trim().required("Required"),
    email: string()
      .trim()
      .matches(EmailReg, "Invalid email")
      .required("Required"),
  }),
  abn: string().when("customer_type", {
    is: "Business",
    then: (schema) => schema.required("Required"),
  }),
  company_name: string().when("customer_type", {
    is: "Business",
    then: (schema) => schema.required("Required"),
  }),
  // assigned_to: string().nullable(),
  address: addressSchema,
});

// export const superAndAdminSchema = object({
//   assigned_to: string().required("Please select Employee Role first"),
// });

// export const adminSchema = string().trim().required("Required");

export type CustomerRegistrationSchemaType = InferType<
  typeof customerRegistrationSchema
>;
