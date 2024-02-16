import { CUSTOMER_LISTING } from "constants/api";
import { useState } from "react";
import { AxiosInstanceConfig, request } from "services/http-request";
import {
  CustomerDataExtraType,
  CustomerDataType,
  CustomerStatus,
} from "type/customer";
import { EmpStatusRespT } from "type/employee";

type CustFetchDataT = {
  params?: Record<any, any>;
  data?: Record<CustomerStatus, CustomerDataExtraType[]>;
  setData?: React.Dispatch<
    React.SetStateAction<Record<CustomerStatus, CustomerDataExtraType[]>>
  >;
  setPagination?: React.Dispatch<
    React.SetStateAction<{
      page: number;
      offset: number;
      limit: number;
      totalRecords: number;
    }>
  >;
};

type RT = {
  fetchData: (e?: any) => Promise<void>;
  loading: boolean;
};

export function usefetchData({
  params,
  data,
  setData,
  setPagination,
}: CustFetchDataT): RT {
  const [loading, setLoading] = useState(false);

  async function fetchData(addParams?: Record<any, any>) {
    try {
      setLoading(true);
      const response = await request<CustomerDataType>({
        url: CUSTOMER_LISTING,
        params: {
          ...params,
          ...addParams,
        },
      });

      const filterData = { ...data } as Record<
        CustomerStatus,
        CustomerDataExtraType[]
      >;

      //this is to make all record empty before calling this function otherwise it will stack
      Object.keys(data || [])?.map(
        (item) => (filterData[item as CustomerStatus].length = 0)
      );

      setPagination &&
        setPagination((prev) => ({
          ...prev,
          totalRecords: Number(response?.data?.count),
        }));

      response?.data?.results?.forEach((item) => {
        filterData[item?.cust_status as CustomerStatus].push({
          ...item,
          status: false,
        } as CustomerDataExtraType);
      });

      setData && setData(() => filterData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return { fetchData, loading };
}
