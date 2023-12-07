import React, { Fragment, useEffect, useRef, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import * as stylesheet from "./styles.module.scss";

const Placeholder = () => {
    const {card, email, title, createdOn, telephone, companyName} = stylesheet;
    return (
      <div className={card}>
        <div>
          <div>
            <p className={title}></p>
            <div className={companyName}></div>
            <div className={createdOn}></div>
          </div>
          <div>
            <div className="">
              <div className={email}></div>
            </div>
            <div className={telephone}></div>
          </div>
        </div>
      </div>
    )
  }
  export default Placeholder;