import { AxiosProxyConfig, AxiosResponse } from "axios";
import { DependencyList, useEffect, useState } from "react";
import { AxiosInstanceConfig, request } from "services/http-request";

type UseQuickFetchT<T = any> = {
  response: T;
  error: any;
  lodaing: boolean;
};

function useQuickFetch<T>(
  options: AxiosInstanceConfig,
  dep: DependencyList = []
): UseQuickFetchT<T> {
  const [state, setState] = useState<Partial<UseQuickFetchT<T>>>({
    response: {} as T,
    error: {},
    lodaing: false,
  });

  async function fetch() {
    try {
      setState((prev) => ({
        ...prev,
        lodaing: true,
      }));
      const response = await request<AxiosResponse>(options);
      setState((prev) => ({
        ...prev,
        response: response.data as T,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error,
      }));
    } finally {
      setState((prev) => ({
        ...prev,
        lodaing: false,
      }));
    }
  }

  useEffect(() => {
    fetch();
  }, dep);

  return { ...state } as UseQuickFetchT<T>;
}

export default useQuickFetch;
