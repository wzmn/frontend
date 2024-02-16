import { PaginationType } from "./global";

export type ProductRespT = PaginationType<ProductResultT[]>;

export interface ProductResultT {
  id: number;
  images: Image[];
  primary_image: Image;
  work_type: WorkType;
  category: Category;
  supplier_company: SupplierCompany;
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
  stc?: number;
  veecs: number;
}

export interface Details {
  Split?: string;
  Weight?: string;
  Tonnage?: string;
  size?: string;
  color?: string;
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

export interface SupplierCompany {
  id: number;
  company_owner: CompanyOwner;
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

export interface CompanyOwner {
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
  fcm_token: null;
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
  fact_sheet: null | string;
  work_type_image: string;
  global_activity: boolean;
  work_type_for: string;
  auth_companies: any[];
}
