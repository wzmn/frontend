import DNDImage from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import React, { useEffect, useState } from "react";
import * as styles from "styles/pages/common.module.scss";
import SelectBox from "components/selectBox";
import { UnitTypes, StreetTypes, States } from "../../constants";
import ButtonGroup from "components/button-group";
import { useRightBarContext } from "providers/right-bar-provider";
import TextField from "components/text-field";
import Button from "components/button";

const pg = [
  { label: "100" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
];

interface FileProps extends File {
  preview: string;
}

const AddEditCompany = () => {
  const [OTP, setOTP] = useState<string>("");

  const [files, setFiles] = useState<FileProps[]>([]);

  const { toggle } = useRightBarContext();

  function handleChange(OTP: string) {
    setOTP(OTP);
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <p className={styles.title}>Create Company</p>

      <form className="space-y-16 mb-3">
        {/* <SelectBox data={data} />

        <Input varient="regular" />
        <InputOtp
          onChange={handleChange}
          value={OTP}
          renderSeparator={<>-</>}
        /> */}
        {/* <Input varient="regular" /> */}

        <FormSection title="Company Details">
          <FormWraper>
            <div className={styles.formGrid}>
              <div className="max-w-3xl">
                <TextField title="ABN No." asterisk />
              </div>
              <div className="max-w-3xl">
                <TextField title="Company Name" asterisk />
              </div>
              <div className="max-w-3xl">
                <TextField title="Mobile Number" asterisk />
              </div>
              <div className="max-w-3xl">
                <TextField title="Company E-mail ID" asterisk />
              </div>
              <label htmlFor="">Upload Logo</label>
              <label htmlFor=""></label>
              <div className={styles.file}>
                <DNDImage setFiles={setFiles} />
              </div>

              <aside className={styles.preview}>
                {files?.[0]?.preview ? (
                  <img
                    src={files?.[0]?.preview}
                    alt="/assets/images/picture.svg"
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                      URL.revokeObjectURL(files?.[0]?.preview);
                    }}
                  />
                ) : (
                  <img
                    src="/assets/images/picture.svg"

                    // alt="/assets/images/picture.svg"
                    // Revoke data uri after image is loaded
                  />
                )}
              </aside>
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title="Address Details">
          <FormWraper>
            <div className={styles.formGrid}>
              <div className="max-w-3xl">
                <TextField title="Building Name." asterisk />
              </div>
              <div className="max-w-3xl">
                <TextField title="Level No" asterisk />
              </div>
              <div className="max-w-3xl">
                <SelectBox
                  placeholder="Select Unit Type"
                  data={UnitTypes}
                  asterisk
                />
              </div>
              <div className="max-w-3xl">
                <TextField title="Unit No" asterisk />
              </div>

              <div className="max-w-3xl">
                <TextField title="Lot No." asterisk />
              </div>
              <div className="max-w-3xl">
                <div className="max-w-3xl">
                  <SelectBox
                    placeholder="Street No"
                    data={StreetTypes}
                    asterisk
                  />
                </div>
              </div>
              <div className="max-w-3xl">
                <TextField title="Street Name" asterisk />
              </div>
              <div className="max-w-3xl">
                <TextField title="Street Type" asterisk />
              </div>

              <div className="max-w-3xl">
                <TextField title="Suffix." asterisk />
              </div>
              <div className="max-w-3xl">
                <TextField title="Suburb" asterisk />
              </div>
              <div className="max-w-3xl">
                <SelectBox placeholder="State" data={States} asterisk />
              </div>
              <div className="max-w-3xl">
                <TextField title="Pincode" asterisk />
              </div>

              <div className="max-w-3xl">
                <TextField title="LGA" asterisk />
              </div>
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title=" Upload Documents">
          <FormWraper>
            <>
              <p className="text-sm mb-10">
                <span className="text-red-500 font-bold">Note: &nbsp;</span>
                You must upload at least ONE Primary document. Foreign documents
                mustr be accompanied by an official translation.
              </p>
              <div className={styles.formGrid}>
                <ButtonGroup
                  onClick={toggle}
                  title="Primary Documents"
                  groupTitle="Upload"
                />
                <ButtonGroup
                  onClick={toggle}
                  title="Secondary Documents"
                  groupTitle="Upload"
                />
                <ButtonGroup
                  onClick={toggle}
                  title="Additional Documents"
                  groupTitle="Upload"
                />
              </div>
            </>
          </FormWraper>
        </FormSection>

        <FormSection title="Owner Details">
          <div className="flex-1">
            <FormWraper>
              <div className={styles.formGrid}>
                <div className="max-w-3xl">
                  <TextField title="First Name" asterisk />
                </div>
                <div className="max-w-3xl">
                  <TextField title="Last Name" asterisk />
                </div>
                <div className="max-w-3xl">
                  <TextField title="Mobile Number" asterisk />
                </div>
                <div className="max-w-3xl">
                  <TextField title="E-mail ID" asterisk />
                </div>
                <div className="max-w-3xl">
                  <TextField title="Status" asterisk />
                </div>
              </div>
            </FormWraper>

            <div className="flex justify-center gap-36 mt-10">
              <Button title="Submit" />

              <Button title="Cancel" color="red" className="py-10" />
            </div>
          </div>
        </FormSection>
      </form>
    </>
  );
};

export default AddEditCompany;
