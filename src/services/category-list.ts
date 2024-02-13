import { PRODUCT_CATEGORY } from "constants/api";
import { request } from "./http-request";
import { CategoryRespT } from "type/category";

export const categoryList = async (
  params?: Record<any, any>
): Promise<CategoryRespT> => {
  const response = await request<CategoryRespT>({
    url: PRODUCT_CATEGORY,
    params,
  });

  return response.data;
};

export default categoryList;
