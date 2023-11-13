import React from "react";
import { PiFiles } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";
import { Disclosure, Transition } from "@headlessui/react";
import * as styles from "./styles.module.scss";
import DNDImage from "components/dnd-image";
const UploadDoc = () => {
  return (
    <div className={styles.doc}>
      <div className={styles.header}>
        <div className={styles.title}>Primary Document</div>
        <div className={styles.subTitle}>
          <div className="pts">70 pts</div>
          <div className={styles.icon}>
            <PiFiles />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {[1, 1, 1].map(() => (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className={`${styles.disclosureBtn} `}>
                  <span>
                    Australian Passport (current or expired within last 2 years
                    but not cancelled)
                  </span>
                  <div className={styles.pts}>
                    <span>70 pts &nbsp;</span>
                    <FaChevronDown
                      className={`${open ? "rotate-180 transform" : ""}`}
                    />
                  </div>
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  //   leave="transition duration-75 ease-out"
                  //   leaveFrom="transform scale-100 opacity-100"
                  //   leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className={styles.panel}>
                    <DNDImage setFiles={() => {}} />
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default UploadDoc;
