import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import { COUNTRY_COMPLIANCE } from "constants/api";
import { ComplianceState } from "pages/company/company-registration";
import React, { useEffect, useState } from "react";
import { request } from "services/http-request";
import { ComplianceRespT } from "type/global";
import UploadDoc from "../company/upload-doc/upload-doc";
import { UploadSingleDoc } from "./upload-single-doc";
import Button from "components/button";
import { navigate } from "gatsby";
import { useAuthContext } from "providers/auth-provider";

function initialState() {
  return JSON.parse(
    JSON.stringify({
      primary: [],
      secondary: [],
      additional: [],
    })
  );
}

const UploadDocuments = () => {
  const [compliance, setCompliance] = useState<ComplianceState>(initialState());

  const { setCompanyAuth, setUserAuth } = useAuthContext();

  async function fetchCompanyCompliance() {
    try {
      const response = await request<ComplianceRespT>({
        url: COUNTRY_COMPLIANCE,
        params: {
          company_country: "Australia",
        },
      });
      const list = initialState();
      console.log(response?.data?.results);
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
    console.log("hi");
  }, []);

  return (
    <div className="grow">
      <div className="space-y-16 mb-3 px-56">
        <FormSection title="Primary Documents">
          <FormWraper>
            <>
              <UploadSingleDoc
                title="Primary Documents"
                data={compliance.primary}
              />
            </>
          </FormWraper>
        </FormSection>

        <FormSection title="Secondary Documents">
          <FormWraper>
            <>
              <UploadSingleDoc
                title="Secondary Documents"
                data={compliance.secondary}
              />
            </>
          </FormWraper>
        </FormSection>

        <FormSection title="Additional Documents">
          <FormWraper>
            <>
              <UploadSingleDoc
                title="Additional Documents"
                data={compliance.additional}
              />
            </>
          </FormWraper>
        </FormSection>
        <p className="text-center text-sm">
          <span className="text-red">Note</span>: We will update you via email
          once the documents are verified.
        </p>
        <div className="flex  justify-center gap-3 mt-2">
          <Button
            title="Submit"
            type="submit"
            onClick={() => {
              setUserAuth(null);
              setCompanyAuth(null);
              navigate("/login", { replace: true });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
