import { PaginationType, RoleType } from "./global";
export type JobDataType = PaginationType<Result[]>;

export interface Result {
  id: number;
  work_type: WorkType;
  job_assigned_to: User | null;
  address: Address;
  billing_address: Address;
  customer: Customer;
  total_appointments: number;
  job_created_by: User | null;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  job_status: string;
  job_type: string;
}
export interface Address {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  building_number: string;
  level_number: string;
  unit_type: null | string;
  unit_number: string;
  lot_number: string;
  street_number: string;
  street_name: string;
  street_type: null | string;
  suffix: string;
  suburb: string;
  state: null | string;
  lat: null | string;
  long: null | string;
  lga: string;
  pincode: string;
  formatted_address: null | string;
  property_type: string;
  user: number;
}

export interface Customer {
  id: number;
  user: User;
  company: Company;
  role: string;
  address: null;
  customer_created_by: null;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  customer_type: null | string;
  cust_status: string;
  is_active: boolean;
  company_name: null;
  abn: null;
  sms_consent_type: string;
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
  company_email: null;
  company_mobile_phone: null;
  company_landline: null;
  company_country: string;
  company_status: string;
  company_type: string;
  primary: boolean;
  company_logo: null;
  company_abn: null;
  company_created_by: number;
}

export interface User {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  username: null | string;
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
  fcm_token: null | string;
  is_surveyed: boolean;
  groups: any[];
  user_permissions: any[];
}

export interface WorkType {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  title: string;
  work_type_image: null;
  global_activity: boolean;
  auth_companies: any[];
}

export type JobStatusRole = "waiting" | "open" | "close";

export type JobDataStateType = Result & {
  status: boolean;
};
