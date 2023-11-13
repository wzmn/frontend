import { EmailReg } from "constants/regex";
import { object, string, InferType } from "yup";

export const companyRegistrationSchema = object({
  abnNo: string().trim().required("Required"),
  companyName: string().trim().required("Required"),
  mobileNo: string().trim().required("Required"),
  companyEmail: string().trim().matches(EmailReg, "Invalid email"),
  logoImg: string().trim().required("Required"),
  buildingName: string().trim().required("Required"),
  levelNo: string().trim().required("Required"),
  unitType: string().trim().required("Required"),
  unitNo: string().trim().required("Required"),
  lotNo: string().trim().required("Required"),
  streetNo: string().trim().required("Required"),
  streetName: string().trim().required("Required"),
  streetType: string().trim().required("Required"),
  suffix: string().trim().required("Required"),
  suburb: string().trim().required("Required"),
  state: string().trim().required("Required"),
  pincode: string().trim().required("Required"),
  lga: string().trim().required("Required"),
  firstName: string().trim().required("Required"),
  lastName: string().trim().required("Required"),
  ownerMobileNo: string().trim().required("Required"),
  ownerEmail: string().trim().matches(EmailReg, "Invalid email"),
  status: string().trim().required("Required"),
});

export type CompanyRegistrationSchemaType = InferType<
  typeof companyRegistrationSchema
>;
