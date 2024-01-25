import { PaginationType } from "./global";

export type CompanyDataType = PaginationType<ComResultT[]>;

export interface ComResultT {
  id: number;
  company_owner: CompanyOwner;
  company_address: CompanyAddress | null;
  info: Info[];
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  company_name: string;
  company_email: string;
  company_mobile_phone: string;
  company_landline: string;
  company_country: CompCountry;
  company_status: CompanyStatus;
  company_type: string;
  primary: boolean;
  company_logo: null | string;
  company_abn: null;
  company_verified: boolean;
  company_created_by: null;
}

export interface CompanyAddress {
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
  lat: string;
  long: string;
  lga: string;
  pincode: string;
  formatted_address: string;
  property_type: string;
  user: null;
}

export enum CompCountry {
  Aus = "AUS",
  Australia = "Australia",
  India = "India",
}

export interface CompanyOwner {
  id?: number;
  ref_id?: null;
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
  username?: null;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  is_superuser?: boolean;
  is_staff?: boolean;
  is_verified?: boolean;
  is_password_set?: boolean;
  last_login?: Date;
  groups?: any[];
  user_permissions?: any[];
}

export interface Info {
  id: number;
  documents: Document[];
  detail: Detail;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  info: null;
  is_verified: boolean;
  comments: null;
  company: number;
}

export interface Detail {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  compliance_country: CompCountry;
  compliance_item: string;
  compliance_help_text: string;
  item_type: string;
  allow_multiple_docs: boolean;
  points: null;
  is_required: boolean;
  priority: string;
}

export interface Document {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  file: string;
}

export type CompanyStatus =
  | "upload info"
  | "document review"
  | "verified"
  | "operational"
  | "rejected";

export type CompanyExtraDataType = ComResultT & {
  status: boolean;
};

export type CompanyStateStatus = Record<CompanyStatus, CompanyExtraDataType[]>;
