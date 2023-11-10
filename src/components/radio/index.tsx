import React, {
  DetailedHTMLProps,
  useRef,
  forwardRef,
  MouseEventHandler,
  MouseEvent,
} from "react";
import * as styles from "./styles.module.scss";

type Props = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
};

const Radio = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <label className={`${styles.radio} ${styles.checked}`}>
      {props.label}
      <input ref={ref} {...props} type="radio" />
    </label>
  );
});

export default Radio;
