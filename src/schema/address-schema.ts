import { ObjectSchema, object, string } from "yup";

export type AddressSchemaT = {
  building_number: string;
  level_number: string;
  unit_type: string;
  unit_number: string;
  lot_number: string;
  street_number: string;
  street_name: string;
  street_type: string;
  suffix: string;
  suburb: string;
  state: string;
  lat: string;
  long: string;
  lga: string;
  pincode: string;
};

export const addressSchema: ObjectSchema<AddressSchemaT> = object({
  building_number: string().trim().defined(),
  level_number: string().trim().defined(),
  unit_number: string().trim().defined(),
  unit_type: string().trim().defined(),
  lot_number: string().trim().defined(),
  street_number: string().trim().defined(),
  street_name: string().trim().defined().required("Required"),
  street_type: string().trim().defined(),
  suffix: string().trim().defined(),
  suburb: string().trim().defined().required("Required"),
  state: string().trim().defined().required("Required"),
  lat: string().trim().defined(),
  long: string().trim().defined(),
  lga: string().trim().defined().required("Required"),
  pincode: string().trim().defined().required("Required"),
});
