import React from "react";
import OTPInput, { OTPInputProps } from "react-otp-input";
import * as styles from "./styles.module.css";

type Props = Omit<OTPInputProps, "renderInput"> & {
  renderSeparator?: ((index: number) => React.ReactNode) | React.ReactNode;
  error?: boolean;
};

const InputOtp = ({
  onChange,
  value,
  inputType = "number",
  numInputs = 4,
  error,
  renderSeparator = <></>,
}: Props) => {
  return (
    <OTPInput
      onChange={onChange}
      value={value}
      inputStyle={`${styles.inputStyle} ${error && styles.error}`}
      numInputs={numInputs}
      inputType={inputType}
      renderSeparator={renderSeparator}
      renderInput={(props) => <input {...props} />}
    />
  );
};

export default InputOtp;
