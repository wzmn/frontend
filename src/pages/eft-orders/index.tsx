import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import ViewJob from "components/pages/job/view-job";
import Pagination from "components/pagination";
import Placeholder from "components/skeleton";
import { JOB_LISTING } from "constants/api";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import TimeFormat from "services/time-format";
import * as commonStyles from "styles/pages/common.module.scss";
import * as styles from "styles/pages/common.module.scss";
import { JobDataStateType, JobDataType, JobStatusRole } from "type/job";
import cssVar from "utility/css-var";
import { findMatchingId } from "utility/find-matching-id";

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

  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
    limit: 10,
    totalRecords: 0,
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
      // cssVar("--color-blue_dress"),
    ];
    return colors[int % colors.length];
  }

  async function fetchData() {
    try {
      setLoading(true);
      const response = await request<JobDataType>({
        url: JOB_LISTING,
        params: {
          limit: pagination.limit,
          offset: pagination.offset,
        },
      });

      const filterData = { ...data };

      //this is to make all record empty before calling this function otherwise it will stack
      Object.keys(data).map(
        (item) => (filterData[item as JobStatusRole].length = 0)
      );

      setPagination((prev) => ({
        ...prev,
        totalRecords: Number(response?.data?.count),
      }));

      response?.data.results?.forEach((item) => {
        filterData[item.job_status! as JobStatusRole].push({
          ...item,
          status: false,
        });
      });

      setData(() => filterData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
  }, [pagination.page, pagination.limit]);

  return (
    <>
      <p className={styles.title}>Settings/EFT Orders</p>

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
                {!loading ? (
                  data[dropName].map((dragItem) => {
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
                  })
                ) : (
                  // For skeleton
                  <Placeholder />
                )}
              </>
            </Drop>
          );
        })}
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
        label="Eft"
      />
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
          <ViewJob data={data} />,
          `Customer ID: ${data.id}`,
          <>
            <IoEyeOutline
              id="eye"
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
            {TimeFormat(data?.customer?.user?.created_at, "ddd, MM a")}
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
