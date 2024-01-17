import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import Textarea from "components/textarea";
import React, { useEffect, useState } from "react";
import * as styles from "styles/pages/common.module.scss";
import * as apptStyle from "./styles.module.scss";
import Button from "components/button";
import { request } from "services/http-request";
import { APPT_Q, DOCUMENTS_ANS, QUESTIONS_ANS } from "constants/api";
import { toast } from "react-toastify";
import {
  DocumentsAnsRespT,
  DocumentsAnsT,
  QAnsRespT,
  QAnsResultT,
  WorkTypeQuestionT,
  WorkTypeRespQuestionT,
} from "type/global";
import { PageProps } from "gatsby";
import { set } from "date-fns";
import AnsQuestion from "components/pages/appointment/assessment/questions";
import ViewDocuments from "components/pages/appointment/assessment/view-documents";

const txtData = [
  {
    type: "boolean",
    question: "Is the switch board in working condition?",
    answer: "Yes",
  },
  {
    type: "boolean",
    question: "Is the there 1m space on either sides of the system?",
    answer: "Yes",
  },
  {
    type: "textarea",
    question: "Explain in brief the on-site location",
    answer:
      "The Heat pump is in a working condition with 1m space on either sides of the system.",
  },
  {
    type: "textarea",
    question: "Is the there 1m space on either sides of the system?",
    answer: "ASDRE478598556",
  },
];

const imageData = [
  {
    question: "clear photo of your current switch board",
    id: 1,
    img: "https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    question: "clear photo of your current switch board",
    id: 2,
    img: "https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    question: "clear photo of your current switch board",
    id: 3,
    img: "https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    question: "signature",
    id: 4,
    img: "https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const vidData = [
  {
    question: "clear photo of your current switch board",
    id: 3,
    vid: "https://www.youtube.com/watch?v=WsptdUFthWI",
  },
  {
    question: "signature",
    id: 4,
    vid: "https://www.youtube.com/watch?v=WsptdUFthWI",
  },
];

type LocState = {
  wtId: string;
  apptId: number;
};

const Assessment = (props: PageProps) => {
  const [data, setData] = useState<QAnsResultT[]>();
  const [docData, setDocData] = useState<DocumentsAnsT[]>();

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

  useEffect(() => {
    fetchQuestionsAns();
    fetchDocumentsAns();
  }, []);

  return (
    <div className="grow">
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
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

        {/* <FormSection title="Questionnaire">
          <FormWraper>
            <div className={apptStyle.QACont}>
              {txtData.map((item) => {
                if (item.type === "boolean") {
                  return (
                    <div>
                      <p className={apptStyle.questionLabel}>{item.question}</p>
                      <div className={apptStyle.boolAnswer}>
                        <Radio label="Yes" checked />
                        <Radio label="No" />
                      </div>
                    </div>
                  );
                } else if (item.type === "textarea") {
                  return (
                    <div className="w-full mt-10">
                      <p className={apptStyle.questionLabel}>{item.question}</p>
                      <div className={apptStyle.tArea}>
                        <Textarea
                          placeholder="N/A"
                          style={{ height: "7rem" }}
                          value={item.answer}
                          className={apptStyle.tAreaSt}
                        />
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </FormWraper>
        </FormSection> */}

        {/* <FormSection title="Photos">
          <div className="flex-1">
            <FormWraper>
              <div className={apptStyle.QACont}>
                {imageData.map((item) => {
                  return (
                    <div key={item.id}>
                      <p className={apptStyle.questionLabel}>{item.question}</p>
                      <div className={apptStyle.imgCont}>
                        <img className={apptStyle.img} src={item.img} alt="" />
                      </div>
                    </div>
                  );
                })}

                {vidData.map((item) => {
                  return (
                    <div key={item.id}>
                      <p className={apptStyle.questionLabel}>{item.question}</p>
                      <div className={apptStyle.imgCont}>
                        <video src={item.vid}>
                          <source
                            src="assets/Raindrops_Videvo_preview.mp4"
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FormWraper>
            <div className={apptStyle.btns}>
              <Button title="Audited" className={apptStyle.audited} />
              <Button title="Reassessment" className={apptStyle.reassessment} />
              <Button title="Cancel" className={apptStyle.cancel} />
            </div>
          </div>
        </FormSection> */}
      </div>
    </div>
  );
};

export default Assessment;
