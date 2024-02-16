import { PaginationType } from "./global";

export type CertificatesRespT = PaginationType<CertificatesT[]>;

export interface CertificatesT {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  certificate: string;
  trading_price: string;
  regions: string;
  date: Date;
}
