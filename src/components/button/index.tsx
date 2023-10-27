import React from "react";
import * as styles from "./styles.module.scss";
import { FaBeer } from "react-icons/fa";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  isLoading?: boolean;
  width?: "full" | "fit";
}

function sizeHandler(size?: string) {
  switch (size) {
    case "xl":
      return styles.xl;
    case "md":
      return styles.md;
    default:
      return "";
  }
}

function widthHandler(size?: string) {
  switch (size) {
    case "full":
      return styles.widthFull;
    default:
      return "";
  }
}

function colorHandler(size?: string) {
  switch (size) {
    case "blue":
      return styles.colorBlue;
    default:
      return "";
  }
}

const Button = ({ title, isLoading, icon, width, ...props }: Props) => {
  return (
    <button
      {...props}
      className={` ${styles.btn} ${sizeHandler()} ${widthHandler(
        width
      )} ${colorHandler("blue")} ${props?.className}`}
    >
      {icon && <div className="icon">{icon}</div>}
      <p className={styles.title}>{title}</p>
      {isLoading && (
        <div className="icon">
          <FaBeer />
        </div>
      )}
    </button>
  );
};

Button.defaultProps = {
  title: "",
  width: "fit",
  isLoading: false,
};

export default Button;
