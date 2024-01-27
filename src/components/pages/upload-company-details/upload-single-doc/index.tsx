import React, { Fragment, useEffect, useState } from "react";
import { PiFiles } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";
import { Disclosure, Transition } from "@headlessui/react";
import * as styles from "components/pages/company/upload-doc/styles.module.scss";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import {
  ComplianceDocument,
  ComplianceResultT,
  ComplianceUploadedDocRespT,
  ComplianceUploadedDocResultT,
} from "type/global";
import { RiDeleteBin6Line } from "react-icons/ri";
import { request } from "services/http-request";
import { CONPAMY_UPLOAD_DOCS } from "constants/api";
import { useAuthContext } from "providers/auth-provider";
import Button from "components/button";
import { StringInBetweenReg } from "constants/regex";
import { ImSpinner10 } from "react-icons/im";
import MsgToast from "services/msg-toast";

export const UploadSingleDoc = ({
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
          <SingleUploadHandler data={item} key={item.id} index={index} />
        ))}
      </div>
    </div>
  );
};

type ObjectType = {
  detail: number | null;
  documents: DNDImageFileType[];
};

function SingleUploadHandler({
  data,
  index,
}: {
  data: ComplianceResultT;
  index: number;
}) {
  // const { files, setFiles } = useUploadContext();
  const [loading, setLoading] = useState(false);
  const { userAuth } = useAuthContext();
  const [files, setFiles] = useState<ObjectType[]>([]);
  const [uploadedDoc, setUploadedDoc] = useState<
    ComplianceUploadedDocResultT[]
  >([]);

  async function fetch() {
    try {
      const resp = await request<ComplianceUploadedDocRespT>({
        url: CONPAMY_UPLOAD_DOCS,
        params: {
          detail: data?.id,
          company: userAuth?.emp_license_info?.company?.id,
        },
      });

      setUploadedDoc(() => resp?.data?.results!);
    } catch (error) {}
  }

  async function uploadDocuments(index: number) {
    try {
      setLoading((prev) => !prev);
      const formData = new FormData();

      files?.[index]?.documents?.forEach((doc) => {
        formData.append("document_list", doc);
      });

      formData.append("detail_id", String(data?.id));
      const url =
        uploadedDoc.length > 0
          ? CONPAMY_UPLOAD_DOCS + uploadedDoc[0].id + "/"
          : CONPAMY_UPLOAD_DOCS;
      const resp = await request({
        url: url,
        method: uploadedDoc.length > 0 ? "patch" : "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      MsgToast("Added", "success");
      setFiles(() => []);
      await fetch();
    } catch (error) {
      console.log(error);
      MsgToast("Try Again Later", "error");
    } finally {
      setLoading((prev) => !prev);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {/* {JSON.stringify(files)} */}
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
                <>
                  <div className={styles.uploader}>
                    <DNDImage
                      maxFiles={5}
                      setFiles={(e) => {
                        const list = { ...files };
                        const dt = {
                          detail: data.id!,
                          documents: e,
                        };
                        list[index] = dt;

                        setFiles(() => list);
                      }}
                      accept={{
                        "image/*": [],
                        "application/pdf": [],
                      }}
                    />
                  </div>
                  {files?.[index]?.documents?.length > 0 && (
                    <>
                      {files[index]?.documents?.map((item, idx) => {
                        return (
                          <div className={styles.preview} key={idx}>
                            {item.type.includes("image") ? (
                              <a
                                href={item.preview}
                                className="w-full h-full"
                                target="_blank"
                              >
                                <img
                                  src={item.preview}
                                  alt="/assets/images/picture.svg"
                                />
                              </a>
                            ) : (
                              <>
                                <div className="text-gray-700">
                                  <a href={item.preview} target="_blank">
                                    View Document
                                  </a>
                                </div>
                              </>
                            )}
                            <RiDeleteBin6Line
                              className="w-5 h-5 cursor-pointer absolute  top-1 right-4"
                              onClick={() => {
                                const list = { ...files };
                                list[index].documents.splice(idx, 1);
                                setFiles(() => list);
                              }}
                            />
                          </div>
                        );
                      })}

                      <Button
                        title="Upload"
                        isLoading={loading}
                        disabled={loading}
                        onClick={() => {
                          uploadDocuments(index);
                        }}
                      />
                    </>
                  )}

                  <p className="text-black font-medium">Existing Documents</p>

                  {uploadedDoc?.map((item, idx) => {
                    return item.documents.map((doc) => {
                      return (
                        <ExistingDocumentsHandler
                          refetch={fetch}
                          doc={doc}
                          compId={item.id}
                        />
                      );
                    });
                  })}
                </>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  );
}

function ExistingDocumentsHandler({
  doc,
  compId,
  refetch,
}: {
  doc: ComplianceDocument;
  compId: number;
  refetch: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  async function detele() {
    try {
      setLoading((prev) => !prev);
      const resp = await request({
        url: CONPAMY_UPLOAD_DOCS + compId,
        data: {
          id: doc.id,
        },
        method: "delete",
      });
      MsgToast("Deteled", "success");
      await refetch();
    } catch (error) {
      MsgToast("Try Again Later", "error");
    } finally {
      setLoading((prev) => !prev);
    }
  }

  return (
    <div className={styles.preview}>
      {doc.file.match(StringInBetweenReg)![0] !== "pdf" ? (
        <a href={doc.file} className="w-full h-full" target="_blank">
          <img src={doc.file} alt="/assets/images/picture.svg" />
        </a>
      ) : (
        <>
          <div className="text-gray-700">
            <a href={doc.file} target="_blank">
              View Document
            </a>
          </div>
        </>
      )}
      {loading ? (
        <ImSpinner10 className="animate-spin w-5 h-5 cursor-pointer absolute  top-1 right-4" />
      ) : (
        <RiDeleteBin6Line
          className="w-5 h-5 cursor-pointer absolute  top-1 right-4"
          onClick={() => {
            detele();
            // const list = { ...files };
            // list[index].documents.splice(idx, 1);
            // setFiles(() => list);
          }}
        />
      )}
    </div>
  );
}
