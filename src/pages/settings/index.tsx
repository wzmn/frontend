import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import React, { useState } from "react";

import * as settingtyles from "./styles.module.scss";
import * as styles from "styles/pages/common.module.scss";
import { Link } from "gatsby-link";
import Input from "components/input";
import { ChangeEmail, ChangePhone } from "components/pages/settings";
import { useAuthContext } from "providers/auth-provider";
import { RESET_PASSWORD } from "constants/api";
import { toast } from "react-toastify";
import { request } from "services/http-request";
import UserIdentifyer from "services/user-identifyer";
import companyListFilterHandler from "services/company-list-filter-handler";
import ToolTip from "components/tooltip";
import companyListIdTooltipHandler from "services/company-tooltip-handler";

const productQuestionSection = ["superadmin", "owner", "admin", "manager"];

const Settings = () => {
  const [chageEmail, setChangeEmail] = useState(false);
  const [chagePhone, setChangePhone] = useState(false);

  const { userAuth, setUserAuth, setCompanyAuth } = useAuthContext();

  const userRole = UserIdentifyer();
  const companyListFilterHandlerId = companyListFilterHandler();

  const changePassword = async () => {
    try {
      const response = await toast.promise(
        async () =>
          await request({
            url: RESET_PASSWORD,
            method: "post",
            data: {
              email: userAuth.email,
            },
          }),
        {
          pending: "Wait...",
          success: "Please Check Your Email ",
          error: "Cannot send request try again later",
        }
      );
    } catch (error: any) {
      // toast.error(error.response.data.email[0]);
    }
  };

  return (
    <div className="grow">
      <div className="space-y-16 mb-3">
        <FormSection title="Profile">
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
                    {userAuth.email}
                  </p>
                )}
                <p className={`${settingtyles.otherUser} ${settingtyles.mtB}`}>
                  {chagePhone ? (
                    <div className="my-3">
                      <ChangePhone />
                    </div>
                  ) : (
                    <>{`Phone:  ${userAuth.phone}`}</>
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
                  onClick={() => {
                    changePassword();
                  }}
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
                  onClick={() => {
                    setUserAuth(null);
                    setCompanyAuth(null);
                  }}
                >
                  Sign Out
                </p>
              </div>
            </div>
          </FormWraper>
        </FormSection>

        {productQuestionSection.includes(userRole) && (
          <FormSection title="Appt Questions">
            <FormWraper>
              <div className={settingtyles.profileSetting}>
                <p className={`${settingtyles.otherUser} ${settingtyles.mtB}`}>
                  View the most recently updated Questions
                </p>
                <ToolTip label={companyListIdTooltipHandler()}>
                  <Link
                    to={`appointment-questions/?companyId=${companyListFilterHandlerId?.[0]}`}
                    className={`${settingtyles.userSettings} ${settingtyles.mtB}`}
                    aria-label="Questions"
                  >
                    Questions
                  </Link>
                </ToolTip>
              </div>
            </FormWraper>
          </FormSection>
        )}

        {/* <FormSection title="EFT Orders">
          <FormWraper>
            <div className={settingtyles.profileSetting}>
               //<div className={settingtyles.cont1}></div>
            //<div className={settingtyles.cont2}></div> 
              <p className={`${settingtyles.otherUser} ${settingtyles.mtB}`}>
                View Streamline Transactions with EFT Ease
              </p>
              <Link
                to="eft-orders"
                className={`${settingtyles.userSettings} ${settingtyles.mtB}`}
              >
                EFT Orders
              </Link>
            </div>
          </FormWraper>
        </FormSection> */}

        {/* <FormSection title="Transactions">
          <FormWraper>
            <div className={settingtyles.profileSetting}>
              // <div className={settingtyles.cont1}></div>
            //<div className={settingtyles.cont2}></div> 
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
        </FormSection> */}

        {productQuestionSection.includes(userRole) && (
          <FormSection title="Products">
            <FormWraper>
              <div className={settingtyles.profileSetting}>
                {/* <div className={settingtyles.cont1}></div>
            <div className={settingtyles.cont2}></div> */}
                <p
                  className={`${settingtyles.otherUser} ${settingtyles.mtB} grow`}
                >
                  Add / View Listing for Products
                </p>
                {/* <Link
                  to="add-product"
                  className={`${settingtyles.userSettings} ${settingtyles.mtB} mr-2`}
                >
                  Add
                </Link> */}
                /
                <Link
                  to="list-products"
                  className={`${settingtyles.userSettings} ${settingtyles.mtB} ml-2 mr-2`}
                >
                  View
                </Link>
              </div>
            </FormWraper>
          </FormSection>
        )}
      </div>
    </div>
  );
};

export default Settings;
