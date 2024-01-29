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
  installation_requested_on: Date | null;
  installation_completed_on: null;
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

export interface Job {
  id: number;
  work_type: WorkType;
  job_assigned_to: AssessmentAssignedTo | null;
  address: Address;
  billing_address: Address;
  customer: Customer;
  total_appointments: number;
  job_created_by: AssessmentAssignedTo;
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
  country: string | null;
  formatted_address: string;
  property_type: string;
  user: number;
}

export interface Customer {
  id: number;
  user: AssessmentAssignedTo;
  company: Company;
  role: string;
  address: null;
  customer_created_by: null;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  customer_type: string;
  cust_status: string;
  is_active: boolean;
  company_name: null | string;
  abn: null | string;
  sms_consent_type: string;
  customer_source: string;
}

export interface Company {
  id: number;
  company_owner: AssessmentAssignedTo;
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
  company_abn: null;
  company_verified: boolean;
  company_created_by: null;
}

export interface WorkType {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  title: string;
  fact_sheet: null | string;
  work_type_image: string;
  global_activity: boolean;
  work_type_for: string;
  auth_companies: any[];
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
  work_type: WorkType;
  category: Category;
  supplier_company: Company;
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
  end_date: Date | null;
  regions: string;
}

export interface Category {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  category: string;
  detail_fields: string;
  work_type: number;
  parent_category: number | null;
}

export interface Certificates {
  stc: number;
  veecs: number;
}

export interface Details {
  Split?: string;
  Weight?: string;
  Tonnage?: string;
  Head?: string;
  flowrate?: string;
}

export interface Image {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  file: string;
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
