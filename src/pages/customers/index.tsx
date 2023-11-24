import React, { Fragment, useEffect, useRef, useState } from "react";
import Button from "components/button";
import { AiOutlinePlus } from "react-icons/ai";
import Input from "components/input";
import SelectBox from "components/selectBox";
import Pagination from "components/pagination";
import { Drop } from "components/drop-zone";
import cssVar from "utility/css-var";
import { demoDndData } from "constants/demo-dnd-data";
import * as styles from "styles/pages/common.module.scss";
import { Drage } from "components/drop-zone/drage";
import { CustomerDataType, CustomerStatus } from "type/customer";
import { request } from "services/http-request";
import { CUSTOMER_LISTING } from "constants/api";
import { Link } from "gatsby";
import { ImSpinner10 } from "react-icons/im";
import moment from "moment";
import { TfiEmail } from "react-icons/tfi";
import { IoCallOutline } from "react-icons/io5";
const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

type DProps = CustomerDataType & {
  status: boolean;
};

const Customers = () => {
  const [data, setData] = useState<Record<CustomerStatus, DProps[]>>({
    NEW: [],
    CONTACTED: [],
    COMPLETED: [],
    WON: [],
    LOST: [],
  });

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

  function handleDrop(item: any, section: string) {
    if (item.section === section) return;

    const dt: any = { ...data };
    let idx;
    dt[item.section].some((itm: any, key: any) => {
      console.log(item.id, itm.id);
      if (item.id === itm.id) {
        idx = key;
        return true;
      }
    });

    if (idx !== undefined) {
      const pop = dt[item.section].splice(idx, 1)[0];
      dt[section].unshift(pop);

      setData(() => dt);
    }
  }

  async function fetchData(params?: Record<any, any>) {
    try {
      const response = await request<CustomerDataType[]>({
        url: CUSTOMER_LISTING,
        params,
      });

      const filterData = { ...data };

      Object.keys(data).map(
        (item) => (filterData[item as CustomerStatus].length = 0)
      );

      response.data.forEach((item) => {
        filterData["NEW"].push({ ...item, status: false });
      });

      setData(() => filterData);
    } catch (error) {
      console.log(error);
    }
  }

  const table = useRef<HTMLDivElement>(null);
  const handleScroll = (evt: any) => {
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
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <div className={styles.btnCont}>
        <Link to="customer-registration">
          <Button
            width="default"
            title="Create Employee"
            icon={<AiOutlinePlus />}
            className="flex-row-reverse"
          />
        </Link>
        <Input placeholder="Search" />
        <SelectBox color="full-white" data={dataList} />
      </div>
      <div className={`${styles.tableCont} drop-container`} ref={table}>
        {(Object.keys(data) as CustomerStatus[]).map((dropName, index) => {
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
                {data[dropName].map((dragItem) => {
                  return (
                    <Fragment key={dragItem.id}>
                      <Drage
                        key={dragItem.id} //you can`t use index from map id should be unique
                        accept={"company"}
                        section={dropName}
                        id={dragItem.id as number}
                        loading={dragItem.status}
                      >
                        <List data={dragItem} loading={dragItem.status} />
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

export function List({ data, loading }: { data: DProps; loading: boolean }) {
  return (
    <a href={`customer-details/?customer=${data.id}`}>
      <div className={styles.card}>
        <div className="absolute right-3 top-1">
          <ImSpinner10 className="animate-spin" />
        </div>
        <div className={styles.cardInfo}>
          <p className="title">{data.user?.first_name}</p>
          <span className="">
            {" "}
            created on: {moment(data.user?.created_at).format("ddd, MM a")}
          </span>
        </div>
        <div className={styles.contactInfo}>
          <div className="">
            <span className={styles.icon}>
              <TfiEmail className={styles.icon} />
            </span>

            <span className={styles.contact}>{data.user?.email}</span>
          </div>

          <div className="">
            <span className={styles.icon}>
              <IoCallOutline className={styles.icon} />
            </span>

            <span className={styles.contact}>{data.user?.phone}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default Customers;
