import Button from "components/button";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import AnsQuestion from "components/pages/appointment/assessment/questions";
import ViewDocuments from "components/pages/appointment/assessment/view-documents";
import {
  APPOINTMENT_LISTING,
  DOCUMENTS_ANS,
  QUESTIONS_ANS,
} from "constants/api";
import { Link, PageProps, navigate } from "gatsby";
import { useAppContext } from "providers/app-provider";
import React, { useEffect, useState } from "react";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import UserIdentifyer from "services/user-identifyer";
import * as styles from "styles/pages/common.module.scss";
import {
  DocumentsAnsRespT,
  DocumentsAnsT,
  QAnsRespT,
  QAnsResultT,
} from "type/global";
import * as apptStyle from "./styles.module.scss";
import { ApptResultT } from "type/appointment";

type LocState = {
  wtId: string;
  apptId: number;
};

const snippitAudit = ["superadmin", "snippit auditor"];
const audit = ["superadmin", "admin", "owner", "auditor", "snippit auditor"];
const reAssessment = [
  "superadmin",
  "snippit auditor",
  "admin",
  "owner",
  "auditor",
];

const Assessment = (props: PageProps) => {
  const [data, setData] = useState<QAnsResultT[]>();
  const [docData, setDocData] = useState<DocumentsAnsT[]>();
  const [loading, setLoading] = useState(false);
  const [apptDetails, setApptDetails] = useState<ApptResultT>();

  const { location } = props;
  // const params = new URLSearchParams(location.search);
  const apptId = (location.state as any).apptId;
  const userRole = UserIdentifyer();

  const {
    appointment: { status, statusData },
  } = useAppContext();

  async function fetchAppt() {
    try {
      const resp = await request<ApptResultT>({
        url: APPOINTMENT_LISTING + apptId + "/",
      });
      setApptDetails(() => resp.data);
    } catch (error) {}
  }

  async function fetchQuestionsAns() {
    try {
      const response = await request<QAnsRespT>({
        url: QUESTIONS_ANS,
        params: {
          question__is_sub_question: false,
          appointment: (props.location.state as LocState).apptId,
        },
      });

      setData(response.data.results);
    } catch (error) {
      MsgToast("Problem fetching questions", "error");
    }
  }

  async function fetchDocumentsAns() {
    try {
      const response = await request<DocumentsAnsRespT>({
        url: DOCUMENTS_ANS,
        params: {
          appointment: (props.location.state as LocState).apptId,
        },
      });

      setDocData(response.data.results);
    } catch (error) {
      MsgToast("Problem fetching questions", "error");
    }
  }

  async function updateStatus(to: string) {
    try {
      const statueChangeFrom = statusData?.filter((item) => {
        return item.title === to;
      });

      const datap = {
        appointment_status_id: statueChangeFrom![0].id,
      };
      setLoading(true);
      const response = await request<any>({
        url: APPOINTMENT_LISTING + apptId + "/",
        method: "patch",
        data: datap,
      });
      MsgToast(`${to.toUpperCase()} sucessfully`, "success");
      navigate(-1);
    } catch (error) {
      MsgToast(`Problem ${to} Appt`, "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestionsAns();
    fetchDocumentsAns();
    fetchAppt();
  }, []);

  return (
    <div className="grow">
      <p className={styles.title}>Assessment (Appointment ID : {apptId}) </p>

      <div className="space-y-16 mb-3">
        <FormSection title="Questionnaire">
          <FormWraper>
            <div className="space-y-10 mb-3">
              {data?.map((qAns, index) => {
                return <AnsQuestion data={qAns} key={index} />;
              })}
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title="Photos">
          <FormWraper>
            <div className="grid grid-cols-2 gap-4 ">
              {docData?.map((docAns, index) => {
                return <ViewDocuments data={docAns} />;
              })}
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title="Product">
          <FormWraper>
            <div className="grid grid-cols-2 gap-4 ">
              {apptDetails?.products.map((item) => {
                return (
                  <Link to="/settings/view-product">
                    <div className="relative w-96 h-60 rounded-xl border border-1 ">
                      <div className="w-44 h-44 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img
                          className="w-full h-full object-contain"
                          src={item.product.primary_image.file}
                          alt=""
                        />
                      </div>
                      <p className="absolute truncate  text-ellipsis overflow-hidden text-sm left-4 top-1 w-80">
                        {item.product.name}
                      </p>
                      <div className="absolute bottom-0 left-4">
                        {/* <p className="text-sm">Is Energy Safe</p>
                      <p className="text-sm">Consumption of Less Energy </p> */}
                        <p className="font-bold">${item?.product?.price}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </FormWraper>
        </FormSection>

        <div className={apptStyle.btns}>
          {audit.includes(userRole?.toLowerCase()) && (
            <Button
              isLoading={loading}
              disabled={loading}
              title="Audit Assessment"
              className={apptStyle.audited}
              onClick={() => updateStatus("Audited")}
            />
          )}

          {snippitAudit.includes(userRole?.toLowerCase()) && (
            <Button
              isLoading={loading}
              disabled={loading}
              title="Snippit Audit"
              className={apptStyle.snippitAudit}
              onClick={() => updateStatus("Snippit Audited")}
            />
          )}

          {reAssessment.includes(userRole?.toLowerCase()) && (
            <Button
              isLoading={loading}
              disabled={loading}
              title="Reassessment"
              className={apptStyle.reassessment}
              onClick={() => updateStatus("Reassessment")}
            />
          )}
          <Button
            title="Cancel"
            onClick={() => {
              navigate(-1);
            }}
            className={apptStyle.cancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Assessment;
