import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Pagination from "components/pagination";
import { REQUEST_QUOTE } from "constants/api";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { request } from "services/http-request";
import * as commonStyles from "styles/pages/common.module.scss";
import { JobStatusRole } from "type/job";
import cssVar from "utility/css-var";
// import View from "pages/jobs/view";
import { PublishList } from "components/pages/publish";
import Placeholder from "components/skeleton";
import * as styles from "styles/pages/common.module.scss";
import { QuoteRespT, QuoteResultExtraT, QuoteStatusT } from "type/quotes";
import { ApptResultT } from "type/appointment";

type DropItemType = { id: number; section: JobStatusRole };

const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const Publish = () => {
  const [data, setData] = useState<Record<QuoteStatusT, QuoteResultExtraT[]>>({
    "quote requested": [],
    "quote accepted": [],
    "installation done": [],
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
      cssVar("--color-blue_dress"),
    ];
    return colors[int % colors.length];
  }

  async function fetchData() {
    try {
      setLoading(true);
      const response = await request<QuoteRespT>({
        url: REQUEST_QUOTE,
        params: {
          limit: pagination.limit,
          offset: pagination.offset,
        },
      });

      const filterData: Record<QuoteStatusT, QuoteResultExtraT[]> = { ...data };

      //this is to make all record empty before calling this function otherwise it will stack
      (Object.keys(data) as QuoteStatusT[]).map(
        (item) => (filterData[item].length = 0)
      );

      setPagination((prev) => ({
        ...prev,
        totalRecords: Number(response?.data?.count),
      }));

      response?.data.results?.forEach((item) => {
        if (item.selected) {
          item.assessments.map((appt) => {
            filterData["quote accepted"].push({
              ...appt,
              // status: false,
              acceptedDate: String(item.created_at),
              quoteCount: item.quote_count,
            });
          });
        } else {
          item.assessments.map((appt) => {
            filterData["quote requested"].push({
              ...appt,
              // status: false,
              acceptedDate: String(item.created_at),
              quoteCount: item.quote_count,
            });
          });
        }
      });

      setData(() => filterData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // async function updateData(
  //   item: DropItemType,
  //   to: QuoteStatusT,
  //   index: number
  // ) {
  //   const datap = {
  //     job_status: to,
  //   };
  //   try {
  //     const response = await request<JobDataType[]>({
  //       url: JOB_LISTING + item.id + "/",
  //       method: "patch",
  //       data: datap,
  //     });

  //     const copyData = { ...data };
  //     let idx = findMatchingId(data, item.id, to);

  //     if (idx !== undefined) {
  //       copyData[to][idx].status = false;
  //       copyData[to][idx].job_status = to;
  //       setData(() => copyData);
  //     }
  //   } catch (error) {
  //     const copyData: any = { ...data };
  //     let idx = findMatchingId(data, item.id, to);

  //     if (idx !== undefined) {
  //       const pop = copyData[to].splice(idx, 1)[0];
  //       copyData[item.section].splice(index, 0, { ...pop, status: false });

  //       setData(() => copyData);
  //     }
  //   }
  // }

  // async function handleDrop(
  //   item: DropItemType,
  //   section: any,
  //   make: boolean = true
  // ) {
  //   console.log(item, section);
  //   if (item.section === section) return;
  //   const copyData: any = { ...data };
  //   let idx = findMatchingId(data, item.id, item.section);

  //   if (idx !== undefined) {
  //     const pop = copyData[item.section].splice(idx, 1)[0];
  //     copyData[section].unshift({ ...pop, status: make });

  //     setData(() => copyData);

  //     updateData(item, section, idx);
  //   }
  // }

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

  // const handleScroll = (evt: any) => {
  //   console.log(evt.deltaY);
  //   if (
  //     evt.target!.classList.contains("drop-container") ||
  //     evt.target!.classList.contains("drop-title")
  //   ) {
  //     evt.preventDefault();
  //     table.current!.scrollLeft += evt.deltaY;
  //   }
  // };

  // useEffect(() => {
  //   table.current!.addEventListener("wheel", handleScroll);
  //   return () => {
  //     table.current?.removeEventListener("wheel", handleScroll);
  //   };
  // }, [table]);

  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.limit]);

  return (
    <>
      {/* <p className={styles.title}>Settings/EFT Orders</p> */}

      <div className={`${styles.tableCont} drop-container`} ref={table}>
        {(Object.keys(data) as QuoteStatusT[]).map((dropName, index) => {
          return (
            <Drop
              key={dropName}
              titleRingColor={getColumnColor(index)}
              accept="company"
              handleDrop={() => {}}
              // handleDrop={handleDrop}
              section={dropName}
              title={dropName?.toLocaleUpperCase()?.replace("_", " ")}
            >
              <>
                {!loading ? (
                  data[dropName].map(
                    (dragItem: QuoteResultExtraT, index: number) => {
                      return (
                        <Fragment key={dragItem.id}>
                          <Drage
                            canDrag={false}
                            key={dragItem.id} //you can`t use index from map id should be unique
                            accept={"company"}
                            section={dropName}
                            id={dragItem.id as number}
                            // loading={dragItem.status}
                            loading={false}
                          >
                            <PublishList
                              acceptedDate={dragItem.acceptedDate}
                              quoteCount={dragItem.quoteCount}
                              data={dragItem}
                              loading={false}
                              quoteStatus={dropName}
                            />
                          </Drage>
                        </Fragment>
                      );
                    }
                  )
                ) : (
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
        label="Publish"
      />
    </>
  );
};

export default Publish;
