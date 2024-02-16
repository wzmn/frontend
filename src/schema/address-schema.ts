import { AnyObject, ObjectSchema, object, string } from "yup";

export type AddressSchemaT = {
  building_number: string | null;
  level_number: string | null;
  unit_type: string | null;
  unit_number: string | null;
  lot_number: string | null;
  street_number: string | null;
  street_name: string;
  street_type: string | null;
  suffix: string | null;
  suburb: string;
  state: string;
  lat: string | null;
  long: string | null;
  lga: string;
  pincode: string;
  country: string | null;
};

export const addressSchema = object({
  building_number: string().trim().nullable(),
  level_number: string().trim().nullable(),
  unit_number: string().trim().nullable(),
  unit_type: string().trim().nullable(),
  lot_number: string().trim().nullable(),
  street_number: string().trim().nullable(),
  street_name: string().trim().required("Required"),
  street_type: string().trim(),
  suffix: string().trim().nullable(),
  suburb: string().trim().required("Required"),
  state: string().trim().required("Required"),
  lat: string().trim().nullable(),
  long: string().trim().nullable(),
  lga: string().trim().required("Required"),
  pincode: string().trim().required("Required"),
  country: string().trim().nullable(),
}) as ObjectSchema<AddressSchemaT>;
