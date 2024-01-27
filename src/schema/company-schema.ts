import { EmailReg } from "constants/regex";
import { object, string, InferType, mixed } from "yup";
import { addressSchema } from "./address-schema";

const MAX_FILE_SIZE = 102400; //100KB

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

function isValidFileType(fileName: string, fileType: string) {
  return (
    (validFileExtensions[fileType as "image"] || [])?.indexOf(
      (fileName as any)?.split(".").pop()
    ) > -1
  );
}

export const companyDetailsSchema = object({
  company_name: string().trim().required("Required"),
  abn: string().trim().required("Required"),
  company_mobile_phone: string().trim().required("Required"),
  company_landline: string().trim().nullable(),
  company_email: string().trim().matches(EmailReg, "Invalid email"),
  company_country: string().trim().required("Required"),
  company_type: string().trim().required("Required"),
});

export const companyRegistrationSchema = object({
  // abnNo: string().trim().required("Required"),
  // company_name: string().trim().required("Required"),
  // abn: string().trim().required("Required"),
  // company_mobile_phone: string().trim().required("Required"),
  // company_landline: string().trim().nullable(),
  // company_email: string().trim().matches(EmailReg, "Invalid email"),
  // company_country: string().trim().required("Required"),
  // company_type: string().trim().required("Required"),

  logoImg: mixed()
    .required("Required")
    .test("is-valid-type", "Not a valid image type", (value: any) =>
      isValidFileType(value && value.name.toLowerCase(), "image")
    )
    .test(
      "is-valid-size",
      "Max allowed size is 100KB",
      (value: any) => value && value.size <= MAX_FILE_SIZE
    ),

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
}).concat(companyDetailsSchema);

export type CompanyRegistrationSchemaType = InferType<
  typeof companyRegistrationSchema
>;
