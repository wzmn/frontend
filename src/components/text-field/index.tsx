import React, { forwardRef, useState } from "react";
import * as styles from "./styles.module.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  //...add your custom types here
  asterisk?: boolean;
  errormessage?: string;
  title: string;
}

const TextField = forwardRef<HTMLInputElement, Omit<Props, "placeholder">>(
  (props, ref) => {
    const { asterisk, errormessage = "", title, type } = props;
    const [isVisible, setVisible] = useState(true);
    const toggleVisibility = () => setVisible(!isVisible);
    return (
      <div className={styles.textField}>
        <div
          className={`${styles.inputCont} ${
            errormessage !== "" && styles.error
          }`}
        >
          <input
            placeholder=""
            ref={ref}
            {...props}
            type={isVisible ? type : "text"}
          />
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
          {type === "password" &&
            (!isVisible ? (
              <AiOutlineEyeInvisible onClick={toggleVisibility} />
            ) : (
              <AiOutlineEye onClick={toggleVisibility} />
            ))}
        </div>
        <span className={styles.errorMessage}>{errormessage}</span>
      </div>
    );
  }
);

export default TextField;
