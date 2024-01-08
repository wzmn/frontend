import React from "react";
import * as styles from "./styles.module.scss";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  isLoading?: boolean;
  width?: "full" | "fit" | "inherit" | "default";
  color?: "red" | "blue" | "white" | "gray";
  height?: "fit";
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
    case "inherit":
      return styles.widthInherit;
    default:
      return styles.defaultWidth;
  }
}

function heightHandler(size?: string) {
  switch (size) {
    case "full":
      return "";
    case "fit":
      return styles.heightFit;
    default:
      return "";
  }
}

function colorHandler(color?: string) {
  switch (color) {
    case "blue":
      return styles.colorBlue;
    case "red":
      return styles.colorRed;
    case "white":
      return styles.colorWhite;
    case "gray":
      return styles.colorGray;
    default:
      return "";
  }
}

const Button = ({
  title,
  color = "blue",
  isLoading,
  icon,
  width,
  height,
  ...props
}: Props) => {
  const { className } = props;
  return (
    <button
      {...props}
      className={`${styles.btn} ${sizeHandler()} ${widthHandler(
        width
      )} ${heightHandler(height)} ${colorHandler(color)} ${className}`}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <p className={styles.title}>{title}</p>
      {isLoading && (
        <div className={styles.loader}>
          <img src="/assets/loader/Spinner.svg" alt="" />
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
