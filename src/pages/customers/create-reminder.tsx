import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import SelectBox from "components/selectBox";
import React from "react";
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

const CreateReminder = () => {
  return (
    <>
      <p className={styles.title}>Create Reminder</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Subject">
          <div className="flex-1">
            <FormWraper>
              <>
                <div className={styles.input}>
                  <Input
                    className={styles.input}
                    varient="regular"
                    placeholder="Subject"
                  />
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

        <FormSection title="Description">
          <div className="flex-1">
            <FormWraper>
              <>
                {/* <div className={styles.input}> */}
                <Input
                  className={styles.input}
                  varient="regular"
                  placeholder="Subject"
                />
                {/* </div> */}
              </>
            </FormWraper>
          </div>
        </FormSection>
      </div>
    </>
  );
};

export default CreateReminder;
