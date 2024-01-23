import Divider from "components/divider";
import DNDImage, { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Radio from "components/radio";
import { CUSTOMER_LISTING } from "constants/api";
import { Link, PageProps } from "gatsby";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ImAttachment } from "react-icons/im";
import { IoCallOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { EmployeeDataType, EmpResultT } from "type/employee";
import * as additionalStyles from "styles/pages/additional.module.scss";
import { LuClipboardList } from "react-icons/lu";
import * as publishStyles from "components/pages/publish/styles.module.scss";
import Button from "components/button";

const PublishDetails = (props: PageProps) => {
  const { location } = props;
  // const employee = location.state as EmployeeDataType;
  const params = new URLSearchParams(location.search);
  const publishId = params.get("publish");

  //   const { control, setValue, handleSubmit } = useForm<any>({
  //     defaultValues: {
  //       attachments: [{ file: null }],
  //     },
  //   });

  const [data, setData] = useState<EmpResultT>({});

  //   const { fields, append, remove } = useFieldArray({
  //     control,
  //     name: "attachments",
  //   });

  //   const [files, setFiles] = useState<DNDImageFileType[]>([]);

  async function fetchData() {
    try {
      const response = await request<EmpResultT>({
        url: CUSTOMER_LISTING + publishId,
      });
      setData(() => response.data);
    } catch (error) {
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
      <p className={styles.title}>Publish ID: {data?.id}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Batch Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className="">
                  <span className={styles.bold}>Request Type: :</span>{" "}
                  <span className={styles.normal}>CLU ASSESSMENT</span>
                </p>

                <div className="flex gap-7 mt-3 mb-6">
                  <p className={styles.tag}>
                    {/* {TimeFormat(data.user?.created_at)} */}
                    Start Date: 26-12-23 | 4.30 AM
                  </p>
                  <p className={styles.tag}>
                    {/* {TimeFormat(data.user?.created_at)} */}
                    End Date: 29-12-23 | 15.30 PM
                  </p>
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>Batch Created by: &nbsp; </span>
                  Superadmin/Jackson &nbsp;
                  <span className={styles.tag2}>
                    {/* {TimeFormat(data?.user?.created_at)} */}
                    01-08-2023 at 7.00 am
                  </span>
                </p>

                <Divider />
                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Suburb: &nbsp;
                    <span className={styles.tag2}>Melbourne</span>
                  </span>
                </p>
                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Bid Status</span>
                  </p>

                  <div className={styles.roles}>
                    <Radio label="UP" checked={true} />
                  </div>
                </div>

                <div className={`${styles.userRole} mt-4`}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Base Price</span>
                  </p>

                  <div className={publishStyles.priceViewBtn}>
                    <Button title="$ 1200" />
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title="Appointments">
          <FormWraper>
            <div className={additionalStyles.cardCont}>
              {[1, 2, 3, 4].map((item) => {
                return <List key={item} data={{}} index={1} loading />;
              })}
            </div>
          </FormWraper>
        </FormSection>

        <FormSection title="Bids">
          <FormWraper>
            <div className={additionalStyles.cardCont}>
              {[1, 2, 3, 4].map((item) => {
                return (
                  <Link to="/customers/reminder/" key={item}>
                    <List data={{}} index={1} loading />
                  </Link>
                );
              })}
            </div>
          </FormWraper>
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

function List({
  data,
  loading,
  index,
}: {
  data: any;
  loading: boolean;
  index: number;
}) {
  // target="_blank" href={`customer-details/?customer=${data.id}`}

  return (
    <div
      className={`${styles.card} ${additionalStyles.card} ${publishStyles.card}`}
    >
      <div className={styles.cardInfo}>
        <p className="title">
          {/* {data.user?.first_name} */}
          Jason Stone
        </p>
        <span className="">
          {" "}
          {/* Created on: {TimeFormat(data.user?.created_at,'ddd, MM a)} */}
          created on: Mon,3.40 am
        </span>
      </div>
      <div className={`${styles.contactInfo} ${additionalStyles.contact}`}>
        <div className="flex">
          <span className={styles.icon}>
            <TfiEmail className={styles.icon} />
          </span>

          <span className={styles.contact}>
            {/* {data.user?.email} */}
            jason@gmail.com
          </span>
        </div>

        <div className="">
          <span className={styles.icon}>
            <IoCallOutline className={styles.icon} />
          </span>

          <span className={styles.contact}>
            {/* {data.user?.phone} */}
            jason@gmail.com
          </span>
        </div>

        <LuClipboardList className={additionalStyles.absIcon} />
        <p className={additionalStyles.count}>3</p>
      </div>
    </div>
  );
}

export default PublishDetails;
