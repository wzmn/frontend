import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import React, { useEffect, useState } from "react";
import * as styles from "styles/pages/common.module.scss";
import TransactionCard from "./transaction-card";
import { request } from "services/http-request";
import { TransactionsRespT, TransactionsResultT } from "type/transactions";
import { TRANSACTIONS_MANAGEMENT } from "constants/api";
import Pagination from "components/pagination";
import UserIdentifyer from "services/user-identifyer";
import companyIdFetcher from "services/company-id-fetcher";

const Transactions = () => {
  const [data, setData] = useState<Partial<TransactionsResultT>[]>([]);

  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
    limit: 10,
    totalRecords: 0,
  });

  const userRole = UserIdentifyer();
  const id = companyIdFetcher(userRole);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await request<TransactionsRespT>({
        url: TRANSACTIONS_MANAGEMENT,
        params: {
          company__in: id,

          limit: pagination.limit,
          offset: pagination.offset,
          ordering: "-created_at",
        },
      });

      setPagination((prev) => ({
        ...prev,
        totalRecords: Number(response?.data?.count),
      }));

      setData(() => response?.data?.results || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.limit]);

  return (
    <div className="grow">
      <p className={styles.title}>Transactions</p>
      <div className="space-y-16 mb-3">
        <FormSection title="Transaction">
          <div className="flex flex-col gap-y-8 w-full">
            <div className="grow space-y-5">
              {data?.map((dataT) => {
                return (
                  <FormWraper key={dataT.id}>
                    <>
                      <TransactionCard data={dataT} refetch={fetchData} />
                    </>
                  </FormWraper>
                );
              })}
            </div>
          </div>
        </FormSection>
        {/* <FormSection title="Failed">
          <div className="flex flex-col gap-y-8 w-full">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <FormWraper>
                  <div className="grow space-y-5">
                    <TransactionCard />
                  </div>
                </FormWraper>
              ))}
          </div>
        </FormSection> */}
      </div>

      <Pagination
        totalRecords={pagination.totalRecords}
        page={pagination.page}
        limit={pagination.limit}
        limitHandler={(e) => {
          setPagination((prev) => ({
            ...prev,
            limit: Number(e),
            page: 1,
            offset: (1 - 1) * pagination.limit,
          }));
        }}
        pageHandler={(e) => {
          setPagination((prev) => ({
            ...prev,
            page: Number(e),
            offset: (Number(e) - 1) * pagination.limit,
          }));
        }}
        label="Transactions"
      />
    </div>
  );
};

export default Transactions;
