import React from "react";
import * as styles from "./styles.module.css";
// type Props = {
//   type?:
//     | "button"
//     | "checkbox"
//     | "color"
//     | "date"
//     | "datetime-local"
//     | "email"
//     | "file"
//     | "hidden"
//     | "image"
//     | "month"
//     | "number"
//     | "password"
//     | "radio"
//     | "range"
//     | "reset"
//     | "search"
//     | "submit"
//     | "tel"
//     | "text"
//     | "time"
//     | "url"
//     | "week";
//   placeholder?: string;
//   [key in string]: any;
// };

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  //...add your custom types here
}

const Input = ({ type, placeholder, ...props }: Props) => {
  return (
    <input
      {...props}
      className={styles.input}
      type={type}
      placeholder={placeholder}
    />
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
