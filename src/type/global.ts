import { ReactNode } from "react";

export type ComplianceRespT = PaginationType<ComplianceResultT[]>;

export interface ComplianceResultT {
  id: number;
  ref_id: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  compliance_country: string;
  compliance_item: string;
  compliance_help_text: string;
  item_type: string;
  allow_multiple_docs: boolean;
  points: number;
  is_required: boolean;
  priority: PriorityT;
}

export type PriorityT = "primary" | "secondary" | "additional";

export type ComplianceUploadedDocRespT = PaginationType<
  ComplianceUploadedDocResultT[]
>;

export interface ComplianceUploadedDocResultT {
  id: number;
  documents: ComplianceDocument[];
  detail: ComplianceResultT;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  info: null;
  is_verified: boolean;
  comments: null;
  company: number;
}

export interface ComplianceDocument {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  file: string;
}

export interface PaginationType<T> {
  count?: number;
  next?: null;
  previous?: null;
  results?: T;
}

export type RoleType =
  | "Snippit Admin"
  | "Snippit Manger"
  | "Snippit Auditor"
  | "Admin"
  | "Manager"
  | "Team Lead"
  | "Auditor"
  | "Agent"
  | "Field Worker"
  | "Customer";

export type PrimaryAddressFieldsT = {
  building_number?: string;
  level_number?: string;
  unit_type?: string;
  unit_number?: string;
  lot_number?: string;
  street_number?: string;
  street_name?: string;
  street_type?: string;
  suffix?: string;
  suburb?: string;
  state?: string;
  pincode?: string;
  lga?: string;
};

export type WorkTypeRespT = PaginationType<WorkTypeT[]>;

export interface WorkTypeT {
  category: ReactNode;
  id: number;
  ref_id: null | string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  title: string;
  work_type_image: string;
  global_activity: boolean;
  auth_companies: number[];
}

export type WorkTypeRespQuestionT = PaginationType<WorkTypeQuestionT[]>;

export interface WorkTypeQuestionT {
  id: number;
  options: Option[];
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  content: string;
  question_type: string;
  has_sub_question: boolean;
  is_sub_question: boolean;
  is_required: boolean;
  parent_question: null;
  company: number;
  work_type: number;
}

export interface Option {
  id: number;
  option_text: string;
  question: number;
}

export type Question_type =
  | "image"
  | "text"
  | "video"
  | "signature"
  | "file"
  | "multi_choice_ss"
  | "multi_choice_ms";

export type SubQuestionRespT = PaginationType<SubQuestionT[]>;

export interface SubQuestionT {
  id: number;
  next_subquestions: WorkTypeQuestionT[];
  answer: string;
  question: number;
}

//answers api

export type QAnsRespT = PaginationType<QAnsResultT[]>;

export interface QAnsResultT {
  id: number;
  question: WorkTypeQuestionT;
  selected_options: Option[];
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  answer: string;
  appointment: number;
}

//DOCUMENTS TYPES

export type DocumentsAnsRespT = PaginationType<DocumentsAnsT[]>;

export interface DocumentsAnsT {
  id: number;
  documents: Document[];
  question: WorkTypeQuestionT;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  place_id: null;
  lat: null | string;
  long: null | string;
  formatted_address: null;
  appointment: number;
  owner: null;
  company: number;
}

export interface Document {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  file: string;
}

export type SelectionRangeInitT = {
  startDate: undefined | string | Date;
  endDate: undefined | string | Date;
  key: string;
};
