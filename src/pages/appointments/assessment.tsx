import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import Textarea from "components/textarea";
import React, { useEffect, useState } from "react";
import * as styles from "styles/pages/common.module.scss";
import * as apptStyle from "./styles.module.scss";
import Button from "components/button";
import { request } from "services/http-request";
import {
  APPOINTMENT_LISTING,
  APPT_Q,
  DOCUMENTS_ANS,
  QUESTIONS_ANS,
} from "constants/api";
import { toast } from "react-toastify";
import {
  DocumentsAnsRespT,
  DocumentsAnsT,
  QAnsRespT,
  QAnsResultT,
  WorkTypeQuestionT,
  WorkTypeRespQuestionT,
} from "type/global";
import { PageProps, navigate } from "gatsby";
import { set } from "date-fns";
import AnsQuestion from "components/pages/appointment/assessment/questions";
import ViewDocuments from "components/pages/appointment/assessment/view-documents";
import { useAppContext } from "providers/app-provider";

type LocState = {
  wtId: string;
  apptId: number;
};

const Assessment = (props: PageProps) => {
  const [data, setData] = useState<QAnsResultT[]>();
  const [docData, setDocData] = useState<DocumentsAnsT[]>();
  const [loading, setLoading] = useState(false);

  const { location } = props;
  // const params = new URLSearchParams(location.search);
  const apptId = (location.state as any).apptId;

  const {
    appointment: { status, statusData },
  } = useAppContext();

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
      toast("Problem fetching questions");
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
      toast("Problem fetching questions");
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
      toast.success(`${to.toUpperCase()} sucessfully`);
    } catch (error) {
      toast(`Problem ${to} Appt`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestionsAns();
    fetchDocumentsAns();
  }, []);

  return (
    <div className="grow">
      {apptId + " appt id"}
      <p className={styles.title}>Assessment</p>

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

        <div className={apptStyle.btns}>
          <Button
            isLoading={loading}
            disabled={loading}
            title="Audited"
            className={apptStyle.audited}
            onClick={() => updateStatus("Audited")}
          />
          <Button
            isLoading={loading}
            disabled={loading}
            title="Reassessment"
            className={apptStyle.reassessment}
            onClick={() => updateStatus("Reassessment")}
          />
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
