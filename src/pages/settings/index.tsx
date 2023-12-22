import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import React, { useState } from "react";

import * as settingtyles from "./styles.module.scss";
import * as styles from "styles/pages/common.module.scss";
import { Link } from "gatsby-link";
import Input from "components/input";
import { ChangeEmail, ChangePhone } from "components/pages/settings";

const Settings = () => {
  const [chageEmail, setChangeEmail] = useState(false);
  const [chagePhone, setChangePhone] = useState(false);

  return (
    <div className="grow">
      <div className="space-y-16 mb-3">
        <FormSection title="Questionnaire">
          <FormWraper>
            <div className={settingtyles.profileSetting}>
              <div className={settingtyles.cont1}>
                <div className={settingtyles.profilePic}>
                  <img src="/assets/images/user.png" alt="" />
                </div>

                {chageEmail ? (
                  <div className="my-3">
                    <ChangeEmail />
                  </div>
                ) : (
                  <p
                    className={`${settingtyles.userEmail} ${settingtyles.mtB}`}
                  >
                    jasonjackson@snippit.com
                  </p>
                )}
                <p className={`${settingtyles.otherUser} ${settingtyles.mtB}`}>
                  {chagePhone ? (
                    <div className="my-3">
                      <ChangePhone />
                    </div>
                  ) : (
                    "Phone: +61 8975695896"
                  )}
                </p>
              </div>
              <div className={settingtyles.cont2}>
                <p
                  className={`${settingtyles.userSettings} ${settingtyles.mtB}`}
                >
                  Change Profile Picture
                </p>
                <p
                  className={`${settingtyles.userSettings} ${settingtyles.mtB}`}
                  onClick={() => setChangeEmail((prev) => !prev)}
                >
                  Change E-mail
                </p>
                <p
                  className={`${settingtyles.userSettings} ${settingtyles.mtB}`}
                >
                  Change Password
                </p>
                <p
                  className={`${settingtyles.userSettings} ${settingtyles.mtB}`}
                  onClick={() => setChangePhone((prev) => !prev)}
                >
                  Change Phone number
                </p>
                <p
                  className={`${settingtyles.userSettings} ${settingtyles.mtB} ${styles.error}`}
                >
                  Sign Out
                </p>
              </div>
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title="Appt Questions">
          <FormWraper>
            <div className={settingtyles.profileSetting}>
              {/* <div className={settingtyles.cont1}></div>
            <div className={settingtyles.cont2}></div> */}
              <p className={`${settingtyles.otherUser} ${settingtyles.mtB}`}>
                View the most recently updated Questions
              </p>
              <Link
                to="appointment-questions"
                className={`${settingtyles.userSettings} ${settingtyles.mtB}`}
              >
                Questions
              </Link>
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title="EFT Orders">
          <FormWraper>
            <div className={settingtyles.profileSetting}>
              {/* <div className={settingtyles.cont1}></div>
            <div className={settingtyles.cont2}></div> */}
              <p className={`${settingtyles.otherUser} ${settingtyles.mtB}`}>
                View Streamline Transactions with EFT Ease.
              </p>
              <Link
                to="eft-orders"
                className={`${settingtyles.userSettings} ${settingtyles.mtB}`}
              >
                EFT Orders
              </Link>
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title="Transactions">
          <FormWraper>
            <div className={settingtyles.profileSetting}>
              {/* <div className={settingtyles.cont1}></div>
            <div className={settingtyles.cont2}></div> */}
              <p className={`${settingtyles.otherUser} ${settingtyles.mtB}`}>
                View Simplified Transactions
              </p>
              <Link
                to="transactions"
                className={`${settingtyles.userSettings} ${settingtyles.mtB}`}
              >
                Transactions
              </Link>
            </div>
          </FormWraper>
        </FormSection>
      </div>
    </div>
  );
};

export default Settings;
