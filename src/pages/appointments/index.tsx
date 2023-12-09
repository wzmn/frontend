import Button from "components/button";
import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Input from "components/input";
import Pagination from "components/pagination";
import SelectBox from "components/selectBox";
import Placeholder from "components/skeleton";
import { APPOINTMENT_LISTING } from "constants/api";
import { Link } from "gatsby";
import moment from "moment";
import View from "pages/company/view";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ImSpinner10 } from "react-icons/im";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import * as commonStyles from "styles/pages/common.module.scss";
import {
  AppointmentDataType,
  AppointmentExtraDataType,
  AppointmentStatusType,
} from "type/appointment";
import cssVar from "utility/css-var";
import { findMatchingId } from "utility/find-matching-id";
const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

type DropItemType = { id: number; section: AppointmentStatusType };

const Appintments = () => {
  const [data, setData] = useState<
    Record<AppointmentStatusType, AppointmentExtraDataType[]>
  >({
    Open: [],
    Assessed: [],
    Confirmed: [],
    Rescheduled: [],
    Snippit: [],
    Waiting: [],
    audited: [],
    cancelled: [],
    installed: [],
    reassessment: [],
    Rejected: [],
  });

  // For skeleton
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
    limit: 10,
    totalRecords: 0,
  });

  const { btnCont, tableCont } = commonStyles;
  const table = useRef<HTMLDivElement>(null);

  const drop1Color = cssVar("--color-blue_dress");
  const drop2Color = cssVar("--color-candlelight");
  const drop3Color = cssVar("--color-aqua_blue");

  function getColumnColor(int: number) {
    const colors = [
      cssVar("--color-blue_dress"),
      cssVar("--color-candlelight"),
      cssVar("--color-aqua_blue"),
      cssVar("--color-salad_green"),
      cssVar("--color-red"),
      cssVar("--color-blue_dress"),
    ];
    return colors[int % colors.length];
  }

  async function handleDrop(
    item: DropItemType,
    section: AppointmentStatusType,
    make: boolean = true
  ) {
    console.log(item, section);
    if (item.section === section) return;
    const copyData: any = { ...data };
    let idx = findMatchingId(data, item.id, item.section);

    if (idx !== undefined) {
      const pop = copyData[item.section].splice(idx, 1)[0];
      copyData[section].unshift({ ...pop, status: make });

      setData(() => copyData);

      updateData(item, section, idx);
    }
  }

  async function fetchData() {
    try {
      setLoading(true);
      const response = await request<AppointmentDataType>({
        url: APPOINTMENT_LISTING,
        params: {
          limit: pagination.limit,
          offset: pagination.offset,
        },
      });

      const filterData = { ...data };

      //this is to make all record empty before calling this function otherwise it will stack
      Object.keys(data).map(
        (item) => (filterData[item as AppointmentStatusType].length = 0)
      );

      setPagination((prev) => ({
        ...prev,
        totalRecords: Number(response?.data?.count),
      }));

      response?.data?.results?.forEach((item) => {
        console.log(item.appointment_status);
        filterData[item.appointment_status! as AppointmentStatusType].push({
          ...item,
          status: false,
        });
      });

      setData(() => filterData);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData(
    item: DropItemType,
    to: AppointmentStatusType,
    index: number
  ) {
    const datap = {
      appointment_status: to,
    };
    try {
      const response = await request<AppointmentDataType[]>({
        url: APPOINTMENT_LISTING + item.id + "/",
        method: "patch",
        data: datap,
      });

      const copyData = { ...data };
      let idx = findMatchingId(data, item.id, to);

      if (idx !== undefined) {
        copyData[to][idx].status = false;
        copyData[to][idx].appointment_status = to;
        setData(() => copyData);
      }
    } catch (error) {
      const copyData: any = { ...data };
      let idx = findMatchingId(data, item.id, to);

      if (idx !== undefined) {
        const pop = copyData[to].splice(idx, 1)[0];
        copyData[item.section].splice(index, 0, { ...pop, status: false });

        setData(() => copyData);
      }
    }
  }

  const handleScroll = (evt: any) => {
    console.log(evt.deltaY);
    if (
      evt.target!.classList.contains("drop-container") ||
      evt.target!.classList.contains("drop-title")
    ) {
      evt.preventDefault();
      table.current!.scrollLeft += evt.deltaY;
    }
  };
  useEffect(() => {
    table.current!.addEventListener("wheel", handleScroll);
    return () => {
      table.current?.removeEventListener("wheel", handleScroll);
    };
  }, [table]);

  useEffect(() => {
    // For skeleton
    fetchData().finally(() => setLoading(false));
  }, [pagination.page, pagination.limit]);

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <div className={btnCont}>
        <div className="">
          <Link to="#">
            <Button
              title="Create Appointment"
              icon={<AiOutlinePlus />}
              className="flex-row-reverse"
            />
          </Link>
        </div>

        <div className="">
          <Input placeholder="Search" />
        </div>

        <div className="">
          <SelectBox color="full-white" data={dataList} />
        </div>
      </div>

      <div className={`${tableCont} drop-container`} ref={table}>
        {(Object.keys(data) as AppointmentStatusType[]).map(
          (dropName, index) => {
            console.log(dropName);
            return (
              <Drop
                key={dropName}
                titleRingColor={getColumnColor(index)}
                accept="company"
                handleDrop={handleDrop}
                section={dropName}
                title={dropName.toLocaleUpperCase()}
              >
                <>
                  {!loading ? (
                    data[dropName].map((dragItem) => {
                      return (
                        <Fragment key={dragItem.id}>
                          <Drage
                            key={dragItem.id} //you can`t use index from map id should be unique
                            accept={"company"}
                            section={dropName}
                            id={dragItem.id as number}
                            loading={dragItem.status}
                          >
                            <>
                              <List loading={dragItem.status} data={dragItem} />
                            </>
                          </Drage>
                        </Fragment>
                      );
                    })
                  ) : (
                    // For skeleton
                    <Placeholder />
                  )}
                </>
              </Drop>
            );
          }
        )}
      </div>

      <Pagination
        totalRecords={pagination.totalRecords}
        page={pagination.page}
        limit={pagination.limit}
        limitHandler={(e) => {
          setPagination((prev) => ({
            ...prev,
            limit: Number(e),
            page: 1,
            offset: (1 - 1) * pagination.limit,
          }));
        }}
        pageHandler={(e) => {
          setPagination((prev) => ({
            ...prev,
            page: Number(e),
            offset: (Number(e) - 1) * pagination.limit,
          }));
        }}
        label="Companies"
      />
    </>
  );
};

export function List({
  data,
  loading,
}: {
  data: AppointmentExtraDataType;
  loading: boolean;
}) {
  const { card, cardInfo, contactInfo, icon, contact } = commonStyles;
  const { open, setElement, toggle } = useRightBarContext();

  return (
    <div
      onClick={() => {
        !open && toggle();

        setElement(
          <View data={data} />,
          `Customer ID: ${data.id}`,
          <>
            <IoEyeOutline
              onClick={() => {
                window.open(`employee-details/?employee=${data.id}`, "_blank");
              }}
            />
          </>
        );
      }}
    >
      <div className={card}>
        <div className="absolute right-3 top-1">
          <ImSpinner10 className="animate-spin" />
        </div>
        <div className={cardInfo}>
          <p className="title">{data?.job?.customer?.user?.first_name}</p>
          <span className="">
            {" "}
            created on:{" "}
            {moment(data?.job?.customer?.user?.created_at).format("ddd, MM a")}
          </span>
        </div>
        <div className={contactInfo}>
          <div className="">
            <span className={icon}>
              <TfiEmail className={icon} />
            </span>

            <span className={contact}>{data?.job?.customer?.user?.email}</span>
          </div>

          <div className="">
            <span className={icon}>
              <IoCallOutline className={icon} />
            </span>

            <span className={contact}>{data?.job?.customer?.user?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appintments;
