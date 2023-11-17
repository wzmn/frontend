import Divider from "components/divider";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Radio from "components/radio";
import React, { Fragment, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ImAttachment } from "react-icons/im";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import * as styles from "styles/pages/common.module.scss";
import * as companyStyles from "../company/styles.module.scss";
import { PageProps } from "gatsby";
import { CompanyDataType } from "type/company";
import moment from "moment";

const CompanyDetails = (props: PageProps) => {
  const { location } = props;
  const companyData = location.state as CompanyDataType;
  const { control, setValue, handleSubmit } = useForm<any>({
    defaultValues: {
      attachments: [{ file: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments",
  });

  const [files, setFiles] = useState<DNDImageFileType[]>([]);

  function onSubmit(e: any) {
    console.log(e);
  }

  return (
    <>
      <p className={styles.title}>{companyData.company_name}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Company Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={styles.name}>
                  <span className={styles.bold}>ABN No: {companyData.id}</span>
                </p>

                <div className={styles.contactInfo}>
                  <div className="">
                    <span className={styles.icon}>
                      <TfiEmail className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {companyData.company_email}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoCallOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {companyData.company_mobile_phone}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoLocationOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {companyData.company_address || "N/A"}
                    </span>
                  </div>
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Company Created by: &nbsp;{" "}
                  </span>
                  Superadmin/Jackson &nbsp;
                  <span className={styles.tag2}>
                    {moment(companyData.created_at).format(
                      "DD-MM-yyyy HH:MM a"
                    )}
                  </span>
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Company Status</span>
                  </p>

                  <div className={styles.roles}>
                    <Radio
                      label="DOCUMENT REVIEW"
                      name="status"
                      checked={companyData.company_status === "document review"}
                    />
                    <Radio
                      label="OPERATIONAL"
                      name="status"
                      checked={companyData.company_status === "operational"}
                    />
                    <Radio
                      label="REJECTED"
                      name="status"
                      checked={companyData.company_status === "rejected"}
                    />
                    <Radio
                      label="UPLOAD INFO"
                      name="status"
                      checked={companyData.company_status === "upload info"}
                    />
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title="Attachments">
          <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
            <FormWraper>
              <>
                <div className={styles.attachments}>
                  {fields.map((item, index: number) => {
                    return (
                      <Fragment key={item.id}>
                        {/* <div className={styles.file}> */}
                        <DNDImage
                          setFiles={(e) => {
                            setValue(`attachments.${index}.file`, e);
                            const list = [...files];
                            list[index] = e[0];
                            setFiles(() => list);
                          }}
                        />
                        {/* </div> */}

                        <aside className={companyStyles.preview}>
                          {files[index] ? (
                            <div className="">
                              <img
                                src={files?.[index]?.preview}
                                alt="/assets/images/picture.svg"
                                // Revoke data uri after image is loaded
                                onLoad={() => {
                                  URL.revokeObjectURL(files?.[index]?.preview);
                                }}
                              />
                              <RiDeleteBin6Line
                                className="w-5 h-5 cursor-pointer absolute top-1 right-4"
                                onClick={() => {
                                  files.splice(index, 1);
                                  remove(index);
                                }}
                              />
                            </div>
                          ) : (
                            <div className="">
                              <img
                                src="/assets/images/picture.svg"

                                // alt="/assets/images/picture.svg"
                                // Revoke data uri after image is loaded
                              />
                              <RiDeleteBin6Line
                                className="w-5 h-5 cursor-pointer absolute top-1 right-4"
                                onClick={() => {
                                  files.splice(index, 1);
                                  remove(index);
                                }}
                              />
                            </div>
                          )}
                        </aside>
                      </Fragment>
                    );
                  })}
                </div>
                <p
                  className={styles.addAttachments}
                  onClick={() => append({ file: null })}
                >
                  Add Attachments
                  <span className="icon">
                    <ImAttachment />
                  </span>
                </p>
              </>
            </FormWraper>
          </form>
        </FormSection>

        <FormSection title="Comments">
          <div className="flex-1">
            <FormWraper>
              <>
                <div className={styles.commentBox}>
                  <div className={styles.user}>JJ</div>
                  <div className={styles.input}>
                    <Input
                      className={styles.input}
                      varient="regular"
                      placeholder="Add a comment..."
                    />
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>
      </div>
    </>
  );
};

export default CompanyDetails;
