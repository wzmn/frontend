import { object, string } from "yup";

const addProductSchema = object({
  name: string().trim().required("required"),
  work_type: string().trim().required("required"),
  category: string().trim().required("required"),
  supplier_company: string().trim().required("required"),
  price: string().trim().required("required"),
  discount_price: string().trim().required("required"),
  cert_company: string().trim().required("required"),
  start_date: string().trim().required("required"),
  end_date: string().trim().required("required"),
  regions: string().trim().required("required"),
  description: string().trim().required("required"),
});
