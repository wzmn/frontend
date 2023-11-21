import React, { useEffect, useState } from "react";
import { PiFiles } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";
import { Disclosure, Transition } from "@headlessui/react";
import * as styles from "./styles.module.scss";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import { CountryComplianceType } from "type/global";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useUploadContext } from "providers/upload-doc-provider";

const UploadDoc = ({ data }: { data: CountryComplianceType[] }) => {
  const { files, setFiles } = useUploadContext();

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
        {data?.map((item, index) => (
          <Disclosure key={item.id}>
            {({ open }) => (
              <>
                <Disclosure.Button className={`${styles.disclosureBtn} `}>
                  <span>{item.compliance_help_text}</span>
                  <div className={styles.pts}>
                    <span>{item.points} pts &nbsp;</span>
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
                    {files?.[index]?.file[0]?.preview ? (
                      <div className={styles.preview}>
                        <img
                          src={files?.[index]?.file[0].preview}
                          alt="/assets/images/picture.svg"
                        />
                        <RiDeleteBin6Line
                          className="w-5 h-5 cursor-pointer absolute  top-1 right-4"
                          onClick={() => {
                            const file = [...files!];
                            file[index] = { file: [] };
                            setFiles(() => file);
                          }}
                        />
                      </div>
                    ) : (
                      <DNDImage
                        setFiles={(e) => {
                          const file = [...files];
                          console.log(file);
                          file[index] = { file: e };
                          setFiles(() => file);
                        }}
                      />
                    )}
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
