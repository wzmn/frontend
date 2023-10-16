import React from "react";
import * as styles from "./styles.module.css";

type Varient = "auth" | "regular";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  //...add your custom types here
  varient?: Varient;
}

function handleVarient(str: string) {
  switch (str) {
    case "auth":
      return `${styles.input} ${styles.login} `;

    case "regular":
      return `${styles.input} ${styles.regular} shadow-md`;
    default:
      `${styles.input} ${styles.login}`;
  }
}

const Input = ({ type, placeholder, varient = "auth", ...props }: Props) => {
  return (
    <input
      {...props}
      className={handleVarient(varient)}
      type={type}
      placeholder={placeholder}
    />
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
