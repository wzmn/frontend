import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import React from "react";
import * as styles from "styles/pages/common.module.scss";

const Assessment = () => {
  return (
    <div className="grow">
      <p className={styles.title}>Assessmnet</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Questionnaire">
          <FormWraper>
            <></>
          </FormWraper>
        </FormSection>
      </div>
    </div>
  );
};

export default Assessment;
