import DNDImage from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import React, { useEffect, useState } from "react";
import * as styles from "./styles.module.scss";
import SelectBox from "components/selectBox";
import { UnitTypes, StreetTypes, States } from "../../constants";
import ButtonGroup from "components/button-group";
import { useRightBarContext } from "providers/right-bar-provider";

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
      <div className="space-y-16 mb-3">
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
            <div className="grid grid-flow-row grid-cols-2 gap-7">
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="ABN No." asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Company Name" asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Mobile Number" asterisk />
              </div>
              <div className="max-w-3xl">
                <Input
                  varient="regular"
                  placeholder="Company E-mail ID"
                  asterisk
                />
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
            <div className="grid grid-flow-row grid-cols-2 gap-7">
              <div className="max-w-3xl">
                <Input
                  varient="regular"
                  placeholder="Building Name."
                  asterisk
                />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Level No" asterisk />
              </div>
              <div className="max-w-3xl">
                <SelectBox
                  placeholder="Select Unit Type"
                  data={UnitTypes}
                  asterisk
                />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Unit No" asterisk />
              </div>

              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Lot No." asterisk />
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
                <Input varient="regular" placeholder="Street Name" asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Street Type" asterisk />
              </div>

              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Suffix." asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Suburb" asterisk />
              </div>
              <div className="max-w-3xl">
                <SelectBox placeholder="State" data={States} asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Pincode" asterisk />
              </div>

              <div className="max-w-3xl">
                <Input varient="regular" placeholder="LGA" asterisk />
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
              <div className="grid grid-flow-row grid-cols-2 gap-7">
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
          <FormWraper>
            <div className="grid grid-flow-row grid-cols-2 gap-7">
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="First Name" asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Last Name" asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Mobile Number" asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="E-mail ID" asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Status" asterisk />
              </div>
            </div>
          </FormWraper>
        </FormSection>
        {/* <FormSection title=" Details">
          <FormWraper />
        </FormSection>
        <FormSection title=" Details">
          <FormWraper />
        </FormSection> */}
      </div>
    </>
  );
};

export default AddEditCompany;
