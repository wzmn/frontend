import { AxiosError } from "axios";
import Divider from "components/divider";
import { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import { COMPANY_LISTING } from "constants/api";
import { PageProps, navigate } from "gatsby";
import React, { Fragment, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import TimeFormat from "services/time-format";
import * as styles from "styles/pages/common.module.scss";
import { Result } from "type/company";
import * as companyStyles from "../company/styles.module.scss";

const CompanyDetails = (props: PageProps) => {
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
  const [data, setData] = useState<Result>({});

  const { location } = props;
  const params = new URLSearchParams(location.search);
  const companyId = params.get("company");

  async function fetchData() {
    try {
      const response = await request<Result>({
        url: COMPANY_LISTING + companyId,
      });
      setData(() => response.data);
    } catch (error) {
      if (
        ((error as AxiosError).response?.data as any)?.detail === "Not found."
      ) {
        navigate("/company");
      }
      console.log(error);
    }
  }

  function onSubmit(e: any) {
    console.log(e);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grow">
      <p className={styles.title}>{data?.company_name}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Company Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={styles.name}>
                  <span className={styles.bold}>ABN No: {data?.id}</span>
                </p>

                <div className={styles.contactInfo}>
                  <div className="">
                    <span className={styles.icon}>
                      <TfiEmail className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.company_owner?.email}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoCallOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.company_owner?.phone}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoLocationOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {/* {data?.company_address || "N/A"} */}
                      N/A
                    </span>
                  </div>
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Company Created at: &nbsp;{" "}
                  </span>
                  {/* &nbsp; */}
                  <span className={styles.tag2}>
                    {TimeFormat(data?.created_at!)}
                  </span>
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Company Status</span>
                  </p>

                  <div className={styles.roles}>
                    <Radio
                      label={data?.company_status!}
                      name="status"
                      checked={true}
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
                        {/* <DNDImage
                          setFiles={(e) => {
                            setValue(`attachments.${index}.file`, e);
                            const list = [...files];
                            list[index] = e[0];
                            setFiles(() => list);
                          }}
                        /> */}
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
                              {/* <RiDeleteBin6Line
                                className="w-5 h-5 cursor-pointer absolute top-1 right-4"
                                onClick={() => {
                                  files.splice(index, 1);
                                  remove(index);
                                }}
                              /> */}
                            </div>
                          )}
                        </aside>
                      </Fragment>
                    );
                  })}
                </div>
                {/* <p
                  className={styles.addAttachments}
                  onClick={() => append({ file: null })}
                >
                  Add Attachments
                  <span className="icon">
                    <ImAttachment />
                  </span>
                </p> */}
              </>
            </FormWraper>
          </form>
        </FormSection>

        {/* <FormSection title="Comments">
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
        </FormSection> */}
      </div>
    </div>
  );
};

export default CompanyDetails;
