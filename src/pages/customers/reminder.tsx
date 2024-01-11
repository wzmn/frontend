import Divider from "components/divider";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Radio from "components/radio";
import SelectBox from "components/selectBox";
import moment from "moment";
import React from "react";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import * as styles from "styles/pages/common.module.scss";

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

const Reminder = ({ data }: any) => {
  return (
    <div className="grow">
      <p className={styles.title}>Reminder ID: TD00078 </p>

      <div className="space-y-16 mb-3">
        <FormSection title="Company Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={styles.name}>
                  <span className={styles.bold}>ABN No: {data?.id}</span>
                </p>

                <div className={styles.contactInfo}>
                  <div className="">
                    <span className={styles.icon}>
                      <TfiEmail className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.company_email}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoCallOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.company_mobile_phone}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoLocationOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.company_address || "N/A"}
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
                    {moment(data?.created_at).format("DD-MM-yyyy HH:MM a")}
                  </span>
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Company Status</span>
                  </p>

                  <div className={styles.roles}>
                    <Radio
                      label="PENDING"
                      name="status"
                      checked={data?.company_status === "document review"}
                    />
                    <Radio
                      label="OVERDUE"
                      name="status"
                      checked={data?.company_status === "operational"}
                    />
                    <Radio
                      label="COMPLETED"
                      name="status"
                      checked={data?.company_status === "rejected"}
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
                      type="datetime-local"
                      className={styles.input}
                      varient="regular"
                      placeholder="Subject"
                    />
                  </div>
                  <p className="font-bold">TO</p>
                  <div className="w-72">
                    <Input
                      type="datetime-local"
                      className={styles.input}
                      varient="regular"
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div className="w-72 mt-20 z-auto">
                  <SelectBox
                    placeholder="Reminder Timer"
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
