import React from "react";
import { QAnsResultT } from "type/global";

const AnsQuestion = ({ data }: { data: QAnsResultT }) => {
  return (
    <div>
      <p className="">{data.question.content}</p>
      <div className="">{data.question.question_type}</div>
    </div>
  );
};

export default AnsQuestion;
