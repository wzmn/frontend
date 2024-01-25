import { PaginationType } from "./global";

export type AppointmentDataType = PaginationType<ApptResultT[]>;

export interface ApptResultT {
  id: number;
  job: Job;
  appointment_status: string;
  products: ProductElement[];
  assessment_assigned_to: AssessmentAssignedTo | null;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  assessment_scheduled_on: Date | null;
  assessment_completed_on: Date | null;
  self_assessment: boolean;
  assessment_completed: boolean;
}

export interface AssessmentAssignedTo {
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
  profile_pic: null | string;
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

export interface Job {
  id: number;
  work_type: WorkType;
  job_assigned_to: JobAssignedTo | null;
  address: Address;
  customer: Customer;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  job_status: string;
  job_type: string;
  billing_address: number | null;
  job_created_by: User | null;
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
  lat: null | string;
  long: null | string;
  lga: string;
  pincode: string;
  formatted_address: string;
  property_type: string;
  user: number;
}

export interface Customer {
  id: number;
  user: User;
  company: Company;
  assigned_to: null;
  role: string;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  customer_type: string;
  cust_status: string;
  is_active: boolean;
  company_name: null;
  abn: null;
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
  profile_pic: null | string;
  is_superuser: boolean;
  is_staff: boolean;
  is_verified: boolean;
  is_password_set: boolean;
  last_login: Date;
  fcm_token: null | string;
  groups: any[];
  user_permissions: any[];
}

export interface JobAssignedTo {
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

export interface WorkType {
  id: number;
  ref_id: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  title: string;
  work_type_image: string;
  global_activity: boolean;
  auth_companies: number[];
}

export interface ProductElement {
  id: number;
  product: ProductProduct;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  quantity: number;
  assessment: number;
}

export interface ProductProduct {
  id: number;
  images: Image[];
  primary_image: Image;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  name: string;
  price: string;
  details: Details | null;
  certificates: Certificates;
  description: string;
  start_date: Date;
  end_date: null;
  regions: string;
  work_type: number;
  category: number;
  supplier_company: number;
}

export interface Certificates {
  stc?: number;
  veecs: number;
}

export interface Details {
  Split?: string;
  Weight?: string;
  Tonnage?: string;
  size?: string;
  color?: string;
}

export interface Image {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  file: string;
}

export interface Product {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  quantity: number;
  assessment: number;
  product: number;
}

export type AppointmentExtraDataType = ApptResultT & {
  status: boolean;
};

export type ApptStatues = PaginationType<ApptStatuesResp[]>;

export interface ApptStatuesResp {
  id?: number;
  ref_id?: string;
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
  title: AppointmentStatusType;
}

export type AppointmentStatusType =
  | "Rescheduled"
  | "Waiting"
  | "Rejected"
  | "Assessed"
  | "Snippit"
  | "audited"
  | "Confirmed"
  | "reassessment"
  | "installed"
  | "cancelled"
  | "Open";

export type ApptStateStatus = Record<
  AppointmentStatusType,
  AppointmentExtraDataType[]
>;
