import { AxiosError } from "axios";
import Divider from "components/divider";
import { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Radio from "components/radio";
import { COMPANY_LISTING } from "constants/api";
import { PageProps, navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import TimeFormat from "services/time-format";
import * as styles from "styles/pages/common.module.scss";
import { ComResultT } from "type/company";
import * as companyStyles from "../company/styles.module.scss";
import { StringInBetweenReg } from "constants/regex";
import { acceptedFileType } from "../../constants";

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
  const [data, setData] = useState<Partial<ComResultT>>({});

  const { location } = props;
  const params = new URLSearchParams(location.search);
  const companyId = params.get("company");

  async function fetchData() {
    try {
      const response = await request<ComResultT>({
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
                  <span className={styles.bold}>
                    Company Name: {data?.company_name}
                  </span>
                </p>

                <div className={styles.contactInfo}>
                  <span className={styles.contact}>
                    ABN No: {data?.company_abn}
                  </span>
                </div>

                <div className={styles.contactInfo}>
                  <div className="">
                    <span className={styles.icon}>
                      <TfiEmail className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.company_email}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoCallOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.company_mobile_phone}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoLocationOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.company_address?.formatted_address || "N/A"}
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

        <FormSection title="Owner Details">
          <div className="flex-1">
            <FormWraper>
              <>
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
                      {data?.company_address?.formatted_address || "N/A"}
                    </span>
                  </div>
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>Created at: &nbsp; </span>
                  {/* &nbsp; */}
                  <span className={styles.tag2}>
                    {TimeFormat(data?.company_owner?.created_at!)}
                  </span>
                </p>
              </>
            </FormWraper>
          </div>
        </FormSection>

        {data?.info?.length !== 0 && (
          <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
            <>
              {data?.info?.map((docs, index: number) => {
                return (
                  <FormSection
                    title={
                      docs.detail.priority +
                      " (Points " +
                      docs.detail.points +
                      ")"
                    }
                  >
                    <>
                      <FormWraper>
                        <>
                          <p className="mb-3 font-medium ">
                            {docs?.detail?.compliance_item}
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            {docs.documents?.map((doc) => {
                              return (
                                <div className={styles.attachments}>
                                  <aside className={companyStyles.preview}>
                                    <div className="">
                                      {acceptedFileType.includes(
                                        "." +
                                          doc.file.match(StringInBetweenReg)![0]
                                      ) ? (
                                        <div className="text-gray-700">
                                          <a href={doc.file} target="_blank">
                                            View Document
                                          </a>
                                        </div>
                                      ) : (
                                        <>
                                          <a
                                            href={doc.file}
                                            className="w-full h-full"
                                            target="_blank"
                                          >
                                            <img
                                              src={doc.file}
                                              alt="/assets/images/picture.svg"
                                            />
                                          </a>
                                        </>
                                      )}
                                    </div>
                                  </aside>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      </FormWraper>
                    </>
                  </FormSection>
                );
              })}
            </>
          </form>
        )}

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
