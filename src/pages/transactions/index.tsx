import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import React from "react";
import * as styles from "styles/pages/common.module.scss";
import TransactionCard from "./transaction-card";

const Transactions = () => {
  return (
    <div className="grow">
      <p className={styles.title}>Settings/Transactions</p>
      <div className="space-y-16 mb-3">
        <FormSection title="Completed">
          <div className="flex flex-col gap-y-8 w-full">
            {
              Array(5).fill(0).map((_, i) => (
                <FormWraper>
                  <div className="grow space-y-5">
                    <TransactionCard />
                  </div>
                </FormWraper>
              ))
            }
          </div>
        </FormSection>
        <FormSection title="Failed">
          <div className="flex flex-col gap-y-8 w-full">
            {
              Array(3).fill(0).map((_, i) => (
                <FormWraper>
                  <div className="grow space-y-5">
                    <TransactionCard />
                  </div>
                </FormWraper>
              ))
            }
          </div>
        </FormSection>
      </div>
    </div>
  );
};

export default Transactions;
