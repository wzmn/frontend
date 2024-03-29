import React, { Fragment, useEffect, useState } from "react";
import { PiFiles } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";
import { Disclosure, Transition } from "@headlessui/react";
import * as styles from "./styles.module.scss";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import { ComplianceResultT } from "type/global";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useUploadContext } from "providers/upload-doc-provider";
import { acceptedFileType } from "../../../../constants";

const UploadDoc = ({
  data,
  title = "",
}: {
  data: ComplianceResultT[];
  title?: string;
}) => {
  return (
    <div className={styles.doc}>
      {/* {JSON.stringify(data)}h */}
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>
          {/* <div className="pts">70 pts</div> */}
          <div className={styles.icon}>
            <PiFiles />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {data?.map((item, index) => (
          <Upload data={item} key={item.id} index={index} />
        ))}
      </div>
    </div>
  );
};

function Upload({ data, index }: { data: ComplianceResultT; index: number }) {
  const { files, setFiles } = useUploadContext();

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={`${styles.disclosureBtn} `}>
            <span>{data.compliance_help_text}</span>
            <div className={styles.pts}>
              <span>{data.points} pts &nbsp;</span>
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
              <div className={styles.uploader}>
                <DNDImage
                  maxFiles={5}
                  setFiles={(e) => {
                    const list = { ...files };
                    const dt = {
                      detail: data.id!,
                      documents: e,
                    };
                    list[data.priority!][index] = dt;

                    setFiles(() => list);
                  }}
                  accept={{
                    "image/*": [],
                    "application/*": acceptedFileType,
                  }}
                />
              </div>
              {files?.[data?.priority!]?.[index]?.documents?.length > 0 && (
                <>
                  {files[data.priority!][index]?.documents?.map((item, idx) => {
                    return (
                      <div className={styles.preview} key={idx}>
                        <img
                          src={item.preview}
                          alt="/assets/images/picture.svg"
                        />
                        <RiDeleteBin6Line
                          className="w-5 h-5 cursor-pointer absolute  top-1 right-4"
                          onClick={() => {
                            const list = { ...files };
                            list[data.priority!][index].documents.splice(
                              idx,
                              1
                            );
                            setFiles(() => list);
                          }}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export default UploadDoc;
