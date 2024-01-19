import Divider from "components/divider";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Radio from "components/radio";
import SelectBox from "components/selectBox";
import TextButton from "components/text-button";
import { CUSTOMER_LISTING, REMINDER_LISTING } from "constants/api";
import { PageProps, navigate } from "gatsby";
import useQuickFetch from "hook/quick-fetch";
import moment from "moment";
import React from "react";
import { GoPlus } from "react-icons/go";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import * as styles from "styles/pages/common.module.scss";
import { ReminderResultT, Result } from "type/customer";

const reminder = [
  { label: "15 mins Before" },
  { label: "20 mins Before" },
  { label: "25 mins Before" },
  { label: "30 mins Before" },
  { label: "35 mins Before" },
  { label: "40 mins Before" },
  { label: "55 mins Before" },
  { label: "1 Hour Before" },
];

const Reminder = (props: PageProps) => {
  const { location } = props;
  const params = new URLSearchParams(location.search);
  const customerId = params.get("custId");
  const reminderId = params.get("reminderId");

  const {
    response: custData,
    error: custErr,
    lodaing: custLoading,
  } = useQuickFetch<Result>(
    {
      url: CUSTOMER_LISTING + customerId,
    },
    []
  );

  const {
    response: reminderResp,
    error: reminderErr,
    lodaing: reminderLoading,
  } = useQuickFetch<ReminderResultT>(
    {
      url: REMINDER_LISTING + reminderId,
    },
    []
  );

  return (
    <div className="grow">
      <p className={styles.title}>Reminder ID: TD00078 </p>

      <div className="space-y-16 mb-3">
        <FormSection title="Company Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={styles.name}>
                  <span className={styles.bold}>ABN No: {custData?.id}</span>
                </p>

                <div className={styles.contactInfo}>
                  <div className="">
                    <span className={styles.icon}>
                      <TfiEmail className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {custData?.user?.email}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoCallOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {custData?.user?.phone}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoLocationOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {`
                    ${
                      custData?.address?.building_number
                        ? custData?.address?.building_number
                        : ""
                    } ${
                        custData?.address?.street_number
                          ? custData?.address?.street_number
                          : ""
                      } ${
                        custData?.address?.street_name
                          ? custData?.address?.street_name
                          : ""
                      }
                    
                    ${custData?.address?.suburb ? custData.address?.suburb : ""}

                    ${
                      custData?.address?.state ? custData.address?.state : ""
                    } ${
                        custData?.address?.pincode
                          ? custData?.address?.pincode
                          : ""
                      }`}
                    </span>
                  </div>
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Company Created by: &nbsp;{" "}
                  </span>
                  Superadmin/Jackson &nbsp;
                  <span className={styles.tag2}>
                    {moment(custData?.created_at).format("DD-MM-yyyy HH:MM a")}
                  </span>
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Reminder Status</span>
                  </p>

                  <div className={styles.roles}>
                    <Radio
                      label={reminderResp?.status?.toUpperCase()}
                      name="status"
                      checked={true}
                    />
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title="Shedule">
          <div className="flex-1 z-10">
            <FormWraper>
              <>
                <div className="flex items-center justify-between">
                  <div className="w-72">
                    <Input
                      defaultValue={moment(reminderResp.reminder_time).format(
                        "YYYY-MM-DD"
                      )}
                      type="date"
                      className={styles.input}
                      varient="regular"
                      placeholder="Subject"
                    />
                  </div>
                  {/* <p className="font-bold">TO</p>
                  <div className="w-72">
                    <Input
                      type="datetime-local"
                      className={styles.input}
                      varient="regular"
                      placeholder="Subject"
                    />
                  </div> */}
                  <div className="w-72 ">
                    <SelectBox
                      disabled={true}
                      // placeholder={reminderResp.description}
                      data={reminder}
                      asterisk
                      onChange={(e) => {
                        // setValue("company_country", e.label);
                      }}
                    />
                    <p className={styles.error}>
                      {/* {errors.company_country?.message} */}
                    </p>
                  </div>
                </div>

                <TextButton
                  className="mt-5"
                  label="Create Reminder"
                  icon={<GoPlus />}
                  onClick={() => {
                    navigate("/customers/create-reminder");
                  }}
                />
              </>
            </FormWraper>
          </div>
        </FormSection>

        {/* <FormSection title="Comments">
          <div className="flex-1">
            <FormWraper>
              <>
                <div className={styles.commentBox}>
                  <div className={styles.user}>JJ</div>
                  <div className={styles.input}>
                    <Input
                      className={styles.input}
                      varient="regular"
                      placeholder="Add a comment..."
                    />
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection> */}
      </div>
    </div>
  );
};

export default Reminder;
