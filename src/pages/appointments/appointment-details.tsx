import Divider from "components/divider";
import { DNDImageFileType } from "components/dnd-image";
import FormSection from "components/form-sections";
import FormWraper from "components/form-wrapper";
import Input from "components/input";
import Modal from "components/modal";
import Radio from "components/radio";
import { APPOINTMENT_LISTING, APPT_COMMENT } from "constants/api";
import { PageProps } from "gatsby";
import { useAuthContext } from "providers/auth-provider";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { GoPencil } from "react-icons/go";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { RiDeleteBin4Line } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import MsgToast from "services/msg-toast";
import TimeFormat from "services/time-format";
import * as styles from "styles/pages/common.module.scss";
import { ApptResultT, Comment } from "type/appointment";

const AppointmentDetails = (props: PageProps) => {
  const { location } = props;
  // const employee = location.state as EmployeeDataType;
  const params = new URLSearchParams(location.search);
  const apptId = params.get("appointment");
  const { userAuth } = useAuthContext();
  const { control, setValue, handleSubmit } = useForm<any>({
    defaultValues: {
      attachments: [{ file: null }],
    },
  });

  const [data, setData] = useState<Partial<ApptResultT>>({});
  const [updateComment, setUpdateComment] = useState<{
    toggle: boolean;
    data: Partial<Comment>;
  }>({
    toggle: false,
    data: {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments",
  });

  const [files, setFiles] = useState<DNDImageFileType[]>([]);

  function toggleCommentModal(val: boolean) {
    setUpdateComment((prev) => ({ ...prev, toggle: val }));
  }

  async function fetchData() {
    try {
      const response = await request<ApptResultT>({
        url: APPOINTMENT_LISTING + apptId,
      });
      setData(() => response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit(e: any) {
    console.log(e);
  }

  async function addUpdateComment(comment: string, method = "post") {
    const commentData = {
      comment,
      appointment: data.id,
      user: userAuth.user_id,
    };
    try {
      const resp = await request({
        url: APPT_COMMENT,
        method,
        data: commentData,
      });
      await fetchData();
    } catch (error) {
      MsgToast("Try Again later", "error");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grow">
      <p className={styles.title}>Appointment ID: {data?.id}</p>

      <div className="space-y-16 mb-3">
        <FormSection title="Appointment Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>WorkType: &nbsp; </span>
                  {data?.job?.work_type?.title}
                </p>

                <Divider />
                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Appt Assigned to : &nbsp;{" "}
                  </span>
                  {`${data?.assessment_assigned_to?.first_name || "N/A"} ${
                    data?.assessment_assigned_to?.last_name || "N/A"
                  }`}
                </p>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Scheduled Date & Time : &nbsp;{" "}
                  </span>
                  {` ${
                    data?.assessment_scheduled_on
                      ? TimeFormat(data?.assessment_scheduled_on!)
                      : "N/A"
                  } `}
                </p>

                <Divider />

                <div className={styles.userRole}>
                  <p className={styles.name}>
                    <span className={styles.bold}>Appt Status</span>
                  </p>

                  <div className={styles.roles}>
                    <Radio label={data?.appointment_status!} checked={true} />
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title="Job Details">
          <div className="flex-1">
            <FormWraper>
              <>
                <p className={`${styles.name}`}>
                  <span className={styles.bold}>Job ID: &nbsp; </span>
                  {data?.job?.id} &nbsp;
                  <span className={styles.tag}></span>
                </p>

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>Customer name: &nbsp; </span>
                  {data?.job?.customer.user?.first_name} &nbsp;
                  <span className={styles.tag}></span>
                </p>

                <div className={styles.contactInfo}>
                  <div className="mb-3">
                    <span className={styles.icon}>
                      <TfiEmail className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.job?.customer?.user?.email}
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className={styles.icon}>
                      <IoCallOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {data?.job?.customer?.user?.phone}
                    </span>
                  </div>

                  <div className="">
                    <span className={styles.icon}>
                      <IoLocationOutline className={styles.icon} />
                    </span>

                    <span className={styles.contact}>
                      {`
                    ${
                      data?.job?.address?.building_number
                        ? data?.job?.address?.building_number
                        : ""
                    } ${
                        data?.job?.address?.street_number
                          ? data?.job?.address?.street_number
                          : ""
                      } ${
                        data?.job?.address?.street_name
                          ? data?.job?.address?.street_name
                          : ""
                      }
                    
                    ${
                      data?.job?.address?.suburb
                        ? data?.job?.address?.suburb
                        : ""
                    }

${data?.job?.address?.state ? data?.job?.address?.state : ""} ${
                        data?.job?.address?.pincode
                          ? data?.job?.address?.pincode
                          : ""
                      }`}
                    </span>
                  </div>
                </div>

                <Divider />

                <p className={`${styles.name} ${styles.createBy}`}>
                  <span className={styles.bold}>
                    Customer Created by: &nbsp;
                    {`${
                      data?.job?.customer?.customer_created_by?.user
                        ?.first_name || "N/A"
                    } ${
                      data?.job?.customer?.customer_created_by?.user
                        ?.last_name || "N/A"
                    }`}
                  </span>
                  <br />
                  <span className={styles.tag2}>
                    {TimeFormat(data?.job?.customer?.user?.created_at!)}
                  </span>
                </p>

                <Divider />
              </>
            </FormWraper>
          </div>
        </FormSection>

        <FormSection title="Comments">
          <div className="flex-1">
            <FormWraper>
              <>
                <div className="">
                  <div className={styles.commentBox + " mb-4"}>
                    <div className={styles.user}>JJ</div>
                    <div className={styles.input}>
                      <Input
                        className={styles.input}
                        varient="regular"
                        placeholder="Add a comment..."
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Enter")
                            addUpdateComment(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {data?.comments?.map((comment) => {
                      return (
                        <div className={styles.commentBox}>
                          <div className={styles.user}>
                            {comment?.user?.slice(0, 2)?.toUpperCase()}
                          </div>
                          <div className="">
                            <div className="flex gap-4 items-center">
                              <p className="font-semibold">{comment?.user}</p>
                              <p className="text-sm text-gray-500">
                                {TimeFormat(
                                  comment?.created_at,
                                  "MMMM DD,YYYY"
                                ) +
                                  " at " +
                                  TimeFormat(comment?.created_at, "hh:mm A")}
                              </p>
                              {/* <div className="flex gap-3">
                                <GoPencil
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setUpdateComment((prev) => ({
                                      ...prev,
                                      toggle: true,
                                      data: comment,
                                    }));
                                  }}
                                />
                                <RiDeleteBin4Line className="cursor-pointer" />
                              </div> */}
                            </div>
                            <p className="text-sm text-gray-500">
                              {comment?.comment}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            </FormWraper>
          </div>
        </FormSection>
      </div>
      <Modal
        options={{
          title: "Update",
          toggle: [updateComment.toggle, toggleCommentModal],
          buttons: [
            {
              type: "info",
              title: "Send",
              action: () => console.log("hi"),
            },
          ],
        }}
      >
        <UpdateComment
          addUpdateComment={addUpdateComment}
          data={updateComment.data}
        />
      </Modal>
    </div>
  );
};

function UpdateComment({
  data,
  addUpdateComment,
}: {
  data: Partial<Comment>;
  addUpdateComment: (s: string, k: string) => Promise<void>;
}) {
  return (
    <div className="w-96">
      <div className={styles.commentBox}>
        <div className={styles.user}>
          {data?.user?.slice(0, 2)?.toUpperCase()}
        </div>
        <div className={styles.input}>
          <Input
            className={styles.input}
            varient="regular"
            placeholder={data?.comment}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter")
                addUpdateComment(e.currentTarget.value, "patch");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;
