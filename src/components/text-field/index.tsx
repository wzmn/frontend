import React, { forwardRef, useState } from "react";
import * as styles from "./styles.module.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  //...add your custom types here
  asterisk?: boolean;
  errorMessage?: string;
  title: string;
}

const TextField = forwardRef<HTMLInputElement, Omit<Props, "placeholder">>(
  (props, ref) => {
    const { asterisk, errorMessage = "", title, type } = props;
    const [isVisible, setVisible] = useState(type === "password");
    const toggleVisibility = () => setVisible(!isVisible);
    return (
      <div className={styles.textField}>
        <div
          className={`${styles.inputCont} ${
            errorMessage !== "" && styles.error
          }`}
        >
          <input placeholder="" ref={ref} {...props} type={isVisible ? 'password' : 'text'} />
          <span
            onClick={(e) =>
              (
                (e.target as HTMLElement)
                  .previousElementSibling as HTMLInputElement
              )?.focus()
            }
            className={styles.placeholder}
          >
            {title}
            {asterisk && <span className="text-red-500">*</span>}
          </span>
         {type === "password" && (!isVisible ? <AiOutlineEyeInvisible onClick={toggleVisibility} /> : <AiOutlineEye onClick={toggleVisibility} />)}
        </div>
        <span className={styles.errorMessage}>{errorMessage}</span>
      </div>
    );
  }
);

export default TextField;
