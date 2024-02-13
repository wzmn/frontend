import { object, string } from "yup";

const addProductSchema = object({
  name: string().trim().required("required"),
  work_type: string().trim().required("required"),
  category: string().trim().required("required"),
  supplier_company: string().trim().required("required"),
  price: string().trim().required("required"),
  discount_price: string().trim().required("required"),
});
