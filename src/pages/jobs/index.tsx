import Button from "components/button";
import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Input from "components/input";
import Pagination from "components/pagination";
import SelectBox from "components/selectBox";
import { JOB_LISTING } from "constants/api";
import { Link } from "gatsby-link";
import moment from "moment";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ImSpinner10 } from "react-icons/im";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import * as commonStyles from "styles/pages/common.module.scss";
import * as styles from "styles/pages/common.module.scss";
import { JobDataStateType, JobDataType, JobStatusRole } from "type/job";
import cssVar from "utility/css-var";
import { findMatchingId } from "utility/find-matching-id";
import View from "./view";

type DropItemType = { id: number; section: JobStatusRole };

const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const Jobs = () => {
  const [data, setData] = useState<Record<JobStatusRole, JobDataStateType[]>>({
    waiting: [],
    open: [],
    close: [],
  });

  const { btnCont, tableCont } = commonStyles;

  const table = useRef<HTMLDivElement>(null);

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

  async function fetchData() {
    try {
      const response = await request<JobDataType[]>({
        url: JOB_LISTING,
      });

      const filterData = { ...data };

      Object.keys(data).map(
        (item) => (filterData[item as JobStatusRole].length = 0)
      );

      response?.data?.forEach((item) => {
        filterData[item.job_status! as JobStatusRole].push({
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
    to: JobStatusRole,
    index: number
  ) {
    const datap = {
      job_status: to,
    };
    try {
      const response = await request<JobDataType[]>({
        url: JOB_LISTING + item.id + "/",
        method: "patch",
        data: datap,
      });

      const copyData = { ...data };
      let idx = findMatchingId(data, item.id, to);

      if (idx !== undefined) {
        copyData[to][idx].status = false;
        copyData[to][idx].job_status = to;
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

  async function handleDrop(
    item: DropItemType,
    section: JobStatusRole,
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

  // function handleDrop(item: any, section: string) {
  //   if (item.section === section) return;

  //   const dt: any = { ...data };
  //   let idx;
  //   dt[item.section].some((itm: any, key: any) => {
  //     console.log(item.id, itm.id);
  //     if (item.id === itm.id) {
  //       idx = key;
  //       return true;
  //     }
  //   });

  //   if (idx !== undefined) {
  //     const pop = dt[item.section].splice(idx, 1)[0];
  //     dt[section].unshift(pop);

  //     setData(() => dt);
  //   }
  // }

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
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.btnCont}>
        <div className="">
          <Link to="create-job">
            <Button
              width="full"
              title="Create Job"
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
        {(Object.keys(data) as JobStatusRole[]).map((dropName, index) => {
          console.log(dropName);
          return (
            <Drop
              key={dropName}
              titleRingColor={getColumnColor(index)}
              accept="job"
              handleDrop={handleDrop}
              section={dropName}
              title={dropName.toLocaleUpperCase()}
            >
              <>
                {data[dropName].map((dragItem) => {
                  return (
                    <Fragment key={dragItem.id}>
                      <Drage
                        key={dragItem.id} //you can`t use index from map id should be unique
                        accept={"job"}
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
                })}
              </>
            </Drop>
          );
        })}
      </div>
      <Pagination />
    </>
  );
};

export function List({
  data,
  loading,
}: {
  data: JobDataStateType;
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
                window.open(`job-details/?job=${data.id}`, "_blank");
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
          <p className="title">{data?.customer?.user?.first_name}</p>
          <span className="">
            {" "}
            created on:{" "}
            {moment(data?.customer?.user?.created_at).format("ddd, MM a")}
          </span>
        </div>
        <div className={contactInfo}>
          <div className="">
            <span className={icon}>
              <TfiEmail className={icon} />
            </span>

            <span className={contact}>{data?.customer?.user?.email}</span>
          </div>

          <div className="">
            <span className={icon}>
              <IoCallOutline className={icon} />
            </span>

            <span className={contact}>{data?.customer?.user?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
