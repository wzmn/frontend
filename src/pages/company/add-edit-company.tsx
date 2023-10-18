import SelectBox from "components/selectBox";
import InputOtp from "components/otp";
import React, { useState } from "react";
import Input from "components/input";
import FormWraper from "components/form-wrapper";
import FormSection from "components/form-sections";

const data = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const AddEditCompany = () => {
  const [OTP, setOTP] = useState<string>("");
  function handleChange(OTP: string) {
    setOTP(OTP);
  }

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
