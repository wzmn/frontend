import { PaginationType } from "./global";

export type CustomerDataType = PaginationType<Result[]>;

export interface Result {
  id: number;
  user: User;
  company: Company;
  assigned_to: AssignedTo;
  role: string;
  address: Address | null;
  customer_created_by: AssignedTo | null;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  customer_type: string;
  cust_status: string;
  is_active: boolean;
  company_name: null | string;
  abn: null | string;
  sms_consent_type: string;
}

export interface Address {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
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
  lat: null;
  long: null;
  lga: string;
  pincode: string;
  user: number;
}

export interface AssignedTo {
  id: number;
  user: User;
  role: string;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  license_id: number;
  created_by: null;
  reports_to: null;
}

export interface User {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  username: null;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  profile_pic: null;
  is_superuser: boolean;
  is_staff: boolean;
  is_verified: boolean;
  is_password_set: boolean;
  last_login: Date;
  groups: any[];
  user_permissions: any[];
}

export interface Company {
  id: number;
  company_owner: User;
  company_address: null;
  info: any[];
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  company_name: string;
  company_email: string;
  company_mobile_phone: string;
  company_landline: string;
  company_country: string;
  company_status: string;
  company_type: string;
  primary: boolean;
  company_logo: null;
}

export type CustomerDataExtraType = Result & {
  status: boolean;
  index: number;
};

export type CustomerStatus =
  | "fresh"
  | "contacted"
  | "converted"
  | "not_interested";
