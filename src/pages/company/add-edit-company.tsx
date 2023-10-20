import SelectBox from "components/selectBox";
import InputOtp from "components/otp";
import React, { CSSProperties, useEffect, useState } from "react";
import Input from "components/input";
import FormWraper from "components/form-wrapper";
import FormSection from "components/form-sections";
import * as styles from "./styles.module.scss";
import DNDImage from "components/dnd-image";

const data = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const thumbsContainer: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner: CSSProperties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img: CSSProperties = {
  display: "block",
  width: "auto",
  height: "100%",
};

interface FileProps extends File {
  preview: string;
}

const AddEditCompany = () => {
  const [OTP, setOTP] = useState<string>("");

  const [files, setFiles] = useState<FileProps[]>([]);

  function handleChange(OTP: string) {
    setOTP(OTP);
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <>
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
                <Input varient="regular" placeholder="Unit Type" asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Unit No" asterisk />
              </div>

              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Lot No." asterisk />
              </div>
              <div className="max-w-3xl">
                <Input varient="regular" placeholder="Street No" asterisk />
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
                <Input varient="regular" placeholder="State" asterisk />
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
