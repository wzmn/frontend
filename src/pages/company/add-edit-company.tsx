import SelectBox from "components/selectBox";
import InputOtp from "components/otp";
import React, { useState } from "react";
import Input from "components/input";

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
      <div className="p-10 bg-white80">
        <SelectBox data={data} />

        <Input varient="regular" />
        <InputOtp
          onChange={handleChange}
          value={OTP}
          renderSeparator={<>-</>}
        />
      </div>
    </>
  );
};

export default AddEditCompany;
