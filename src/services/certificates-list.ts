import { PRODUCT_CERTIFICATES } from "constants/api";
import { request } from "./http-request";
import { CertificatesRespT } from "type/certificates";

export const certificatesList = async (
  params?: Record<any, any>
): Promise<CertificatesRespT> => {
  const response = await request<CertificatesRespT>({
    url: PRODUCT_CERTIFICATES,
    params,
  });

  return response.data;
};

export default certificatesList;
