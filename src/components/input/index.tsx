import React, { useRef } from "react";
import * as styles from "./Input.module.scss";

type Varient = "auth" | "regular";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  //...add your custom types here
  varient?: Varient;
  asterisk?: boolean;
}

function handleVarient(str: string) {
  switch (str) {
    case "auth":
      return `${styles.input} ${styles.login} `;

    case "regular":
      return `${styles.input} ${styles.regular} `;
    default:
      `${styles.input} ${styles.login}`;
  }
}

const Input = ({ type, placeholder, varient = "auth", ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div tabIndex={0} className={styles.inputCont}>
      <input
        ref={inputRef}
        {...props}
        className={handleVarient(varient)}
        type={type}
        placeholder=""
      />
      <span
        className={styles.placeholder}
        onClick={(e) => inputRef?.current?.focus()}
      >
        {placeholder}{" "}
        {props?.asterisk && <span className="text-red-500">*</span>}
      </span>
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
