import React, { ButtonHTMLAttributes } from "react";
import * as styles from "./styles.module.scss";

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement>;
type TextButtonProps = BtnProps & {
  label: string;
  icon: JSX.Element;
};

const TextButton = (props: TextButtonProps) => {
  return (
    <button {...props} className={`${styles.textBtn} ${props.className}`}>
      {props.label}
      <i className="">{props.icon}</i>
    </button>
  );
};

export default TextButton;
