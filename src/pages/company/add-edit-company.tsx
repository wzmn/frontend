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
      <div className="">
        {/* <SelectBox data={data} />

        <Input varient="regular" />
        <InputOtp
          onChange={handleChange}
          value={OTP}
          renderSeparator={<>-</>}
        /> */}
        <FormSection title="Company Details">
          <FormWraper />
        </FormSection>

        <FormSection title=" Details">
          <FormWraper />
        </FormSection>
      </div>
    </>
  );
};

export default AddEditCompany;
