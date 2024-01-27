import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import CompanyDetails from "components/pages/upload-company-details/company-details";
import UploadDocuments from "components/pages/upload-company-details/upload-documents";
import { COUNTRY_COMPLIANCE } from "constants/api";
import { navigate } from "gatsby";
import { ComplianceState } from "pages/company/company-registration";
import { useAuthContext } from "providers/auth-provider";
import React, { useEffect, useState } from "react";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { ComplianceRespT } from "type/global";

function initialState() {
  return JSON.parse(
    JSON.stringify({
      primary: [],
      secondary: [],
      additional: [],
    })
  );
}

const UploadCompanyDetails = () => {
  const { setCompanyAuth, setUserAuth, companyAuth } = useAuthContext();
  const [compliance, setCompliance] = useState<ComplianceState>(initialState());

  async function fetchCompanyCompliance() {
    try {
      const response = await request<ComplianceRespT>({
        url: COUNTRY_COMPLIANCE,
        params: {
          company_country: "Australia",
          // item_type: "company",
        },
      });
      const list = initialState();

      response?.data?.results?.forEach((item) => {
        list[item?.priority?.toLowerCase()!].push(item);
      });

      console.log(list, " listtttttt");

      setCompliance(() => list);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCompanyCompliance();
  }, []);

  return (
    <div className="grow">
      <div className="flex justify-between items-center">
        <p className={styles.title}>
          Company Status : ({companyAuth?.company_status.toUpperCase()})
        </p>
        <p
          className="text-red cursor-pointer"
          onClick={() => {
            setUserAuth(null);
            setCompanyAuth(null);
            navigate("/login", { replace: true });
          }}
        >
          Log out
        </p>
      </div>

      <CompanyDetails />

      <p className={styles.title}>Upload Company Documents</p>

      <UploadDocuments />
    </div>
  );
};

export default UploadCompanyDetails;
