import { PaginationType } from "./global";

export type CategoryRespT = PaginationType<CategoryT[]>;

export interface CategoryT {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  category: string;
  detail_fields: string;
  work_type: number;
  parent_category: null;
}
