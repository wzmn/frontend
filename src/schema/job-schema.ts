import { EmailReg } from "constants/regex";
import UserIdentifyer from "services/user-identifyer";
import { InferType, array, boolean, mixed, object, string } from "yup";
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
  job_assigned_to_id: string().trim(),
  address: addressSchema,
  billing_address: mixed().when("billAddCheck", {
    is: true,
    then: (schema) => schema.concat(addressSchema),
  }),
});

export const jobAssignedSchema = object({
  job_assigned_to_id: string().trim().required("Required"),
});

export function conditionalSchema() {
  const showEmpFieldFor = ["superadmin", "admin"];
  const userRole = UserIdentifyer();

  if (showEmpFieldFor.includes(userRole)) {
    return jobRegistrationSchema.clone(jobAssignedSchema as any);
  } else {
    return jobRegistrationSchema;
  }
}

export type JobRegistrationSchemaType = InferType<typeof jobRegistrationSchema>;
