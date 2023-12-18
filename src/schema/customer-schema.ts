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
  emp_role: string().nullable(),
  assigned_to: string().nullable(),
  address: addressSchema,
});

export const superAndAdminSchema = object({
  emp_role: string().trim().required("Required"),
  assigned_to: string()
    .trim()
    .when("emp_role", ([emp_role], schema) => {
      return emp_role === undefined
        ? schema.required("Please select Employee Role first")
        : schema.required("Required");
    }),
});

// export const adminSchema = string().trim().required("Required");

export type CustomerRegistrationSchemaType = InferType<
  typeof customerRegistrationSchema
>;
