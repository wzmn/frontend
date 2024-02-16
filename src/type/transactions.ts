import { PaginationType } from "./global";

export type TransactionsRespT = PaginationType<TransactionsResultT[]>;

export interface TransactionsResultT {
  id: number;
  ref_id: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  item: string;
  transaction_method: string;
  details: DetailsClass;
  total_amount: string;
  total_discounts: string;
  amount_payable: string;
  gateway_charges: string;
  total_gst: string;
  payment_status: string;
  gateway_transaction_id: null | string;
  gateway_response_details: null;
  sv_interested: boolean;
  sv_value: string;
  sv_eligible: null;
  opting_emi: boolean;
  user: number;
}

export interface DetailsClass {
  id: number;
  amount: string;
  ref_id: string;
  details: string;
  selected: boolean;
  installer: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  quote_request: QuoteRequest;
  payment_breakdown: PaymentBreakdown;
}

export interface PaymentBreakdown {
  total_gst: number;
  bill_details: BillDetail[];
  total_amount: number;
  amount_payable: number;
  total_discounts: number;
}

export interface BillDetail {
  gst: number;
  total_cost: number;
  installer_fee: number;
}

export interface QuoteRequest {
  id: number;
  ref_id: null;
  suburb: string;
  my_quote: null;
  selected: boolean;
  is_active: boolean;
  best_quote: number;
  created_at: Date;
  updated_at: Date;
  assessments: Assessment[];
  description: string;
  quote_count: number;
}

export interface Assessment {
  id: number;
  job: Job;
  ref_id: string;
  products: any[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  self_assessment: boolean;
  appointment_status: AppointmentStatus;
  assessment_completed: boolean;
  assessment_assigned_to: AssessmentAssignedTo;
  assessment_completed_on: null;
  assessment_scheduled_on: Date;
  installation_completed_on: null;
  installation_requested_on: null;
}

export enum AppointmentStatus {
  Assessed = "Assessed",
  SnippitAudited = "Snippit Audited",
}

export interface AssessmentAssignedTo {
  id: number;
  email: string;
  phone: string;
  groups: any[];
  ref_id: null;
  is_staff: boolean;
  username: string | null;
  fcm_token: null | string;
  is_active: boolean;
  last_name: string;
  created_at: Date;
  first_name: string;
  last_login: Date;
  updated_at: Date;
  is_surveyed: boolean;
  is_verified: boolean;
  profile_pic: null;
  is_superuser: boolean;
  is_password_set: boolean;
  user_permissions: any[];
}

export interface Job {
  id: number;
  ref_id: string;
  address: Address;
  customer: Customer;
  job_type: string;
  is_active: boolean;
  work_type: WorkType;
  created_at: Date;
  job_status: string;
  updated_at: Date;
  job_created_by: AssessmentAssignedTo;
  billing_address: Address;
  job_assigned_to: AssessmentAssignedTo;
  total_appointments: number;
}

export interface Address {
  id: number;
  lat: string;
  lga: string;
  long: string;
  user: number;
  state: string;
  ref_id: null;
  suburb: string;
  suffix: string;
  country: null;
  pincode: string;
  is_active: boolean;
  unit_type: null | string;
  created_at: Date;
  lot_number: string;
  updated_at: Date;
  street_name: string;
  street_type: string;
  unit_number: string;
  level_number: string;
  property_type: string;
  street_number: string;
  building_number: string;
  formatted_address: string;
}

export interface Customer {
  id: number;
  abn: null;
  role: string;
  user: AssessmentAssignedTo;
  ref_id: string;
  address: Address | null;
  company: Company;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  cust_status: string;
  company_name: null;
  customer_type: null;
  customer_source: string;
  sms_consent_type: string;
  customer_created_by: null;
}

export interface Company {
  id: number;
  info: any[];
  ref_id: string;
  primary: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  company_abn: null;
  company_logo: null;
  company_name: string;
  company_type: string;
  company_email: string;
  company_owner: AssessmentAssignedTo;
  company_status: string;
  company_address: null;
  company_country: string;
  company_landline: string;
  company_verified: boolean;
  company_created_by: null;
  company_mobile_phone: string;
}

export interface WorkType {
  id: number;
  is_sv: boolean;
  title: string;
  ref_id: null;
  is_active: boolean;
  created_at: Date;
  fact_sheet: null;
  updated_at: Date;
  work_type_for: string;
  auth_companies: any[];
  global_activity: boolean;
  work_type_image: string;
}
