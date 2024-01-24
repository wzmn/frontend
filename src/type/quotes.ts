import { ApptResultT } from "./appointment";
import { PaginationType } from "./global";

export type QuoteRespT = PaginationType<QuoteResultT[]>;

export type QuoteResultT = {
  id: number;
  quote_count: number;
  assessments: ApptResultT[];
  selected: boolean;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  description: string;
};

export type QuoteResultExtraT = {
  acceptedDate: string;
  quoteCount: number;
} & ApptResultT;

export type QuoteStatusT =
  | "quote requested"
  | "quote accepted"
  | "installation done";
