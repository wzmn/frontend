import { EmailReg } from "constants/regex";
import { object, string, InferType } from "yup";
import { addressSchema } from "./address-schema";

export const companyRegistrationSchema = object({
  // abnNo: string().trim().required("Required"),
  company_name: string().trim().required("Required"),
  abn: string().trim().required("Required"),
  company_mobile_phone: string().trim().required("Required"),
  company_landline: string().trim().required("Required"),
  company_email: string().trim().matches(EmailReg, "Invalid email"),
  company_country: string().trim().required("Required"),
  company_type: string().trim().required("Required"),

  logoImg: string().trim(),

  company_owner: object({
    first_name: string().trim().required("Required"),
    last_name: string().trim().required("Required"),
    phone: string()
      .trim()
      .min(8, "No. should min 8")
      .max(16, "No. should max 16")
      .required("Required"),
    email: string().trim().matches(EmailReg, "Invalid email"),
  }),
  address: addressSchema,

  mobile_otp: string().required("Required"),
  email_otp: string().required("Required"),
});

export type CompanyRegistrationSchemaType = InferType<
  typeof companyRegistrationSchema
>;
