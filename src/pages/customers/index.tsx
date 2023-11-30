import Button from "components/button";
import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Input from "components/input";
import Pagination from "components/pagination";
import SelectBox from "components/selectBox";
import { CUSTOMER_LISTING } from "constants/api";
import { Link } from "gatsby";
import moment from "moment";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ImSpinner10 } from "react-icons/im";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { CustomerDataType, CustomerStatus } from "type/customer";
import cssVar from "utility/css-var";
import View from "./view";
const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

export type CustomerDataExtraType = CustomerDataType & {
  status: boolean;
  index: number;
};

const Customers = () => {
  const [data, setData] = useState<
    Record<CustomerStatus, CustomerDataExtraType[]>
  >({
    NEW: [],
    CONTACTED: [],
    COMPLETED: [],
    WON: [],
    LOST: [],
  });

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

      response.data.forEach((item: any) => {
        filterData["NEW"].push({ ...item, status: false });
      });

      setData(() => filterData);
    } catch (error) {
      console.log(error);
    }
  }

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
            title="Create Customer"
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
                {data[dropName].map((dragItem, index) => {
                  return (
                    <Fragment key={dragItem.id}>
                      <Drage
                        key={dragItem.id} //you can`t use index from map id should be unique
                        accept={"company"}
                        section={dropName}
                        id={dragItem.id as number}
                        loading={dragItem.status}
                      >
                        <List
                          data={dragItem}
                          loading={dragItem.status}
                          index={index}
                        />
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
  index,
}: {
  data: CustomerDataExtraType;
  loading: boolean;
  index: number;
}) {
  // target="_blank" href={`customer-details/?customer=${data.id}`}
  const { open, setElement, toggle } = useRightBarContext();

  return (
    <div
      onClick={() => {
        {
          !open && toggle();
        }
        setElement(
          <View data={data} />,
          `Customer ID: ${data.id}`,
          <>
            <IoEyeOutline
              onClick={() => {
                window.open(`customer-details/?customer=${data.id}`, "_blank");
              }}
            />
          </>
        );
      }}
    >
      <div className={styles.card}>
        <div className="absolute right-3 top-1">
          <ImSpinner10 className="animate-spin" />
        </div>
        <div className={styles.cardInfo}>
          <p className="title">{data.user?.first_name}</p>
          <span className="">
            {" "}
            Created on: {moment(data.user?.created_at).format("ddd, MM a")}
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
        <div className={styles.badgeContainer}>
          <div
            className={`badge text-white px-2 py-1 text-xs rounded-sm`}
            style={
              {
                // backgroundColor: index % 2 == 0 ? colors.buyer : colors.seller,
              }
            }
          >
            {index % 2 == 0 ? "BUYER" : "SELLER"}
          </div>
          <div
            className="badge text-white px-2 py-1 text-xs rounded-sm"
            // style={{ backgroundColor: colors.reminder }}
          >
            REMINDER: {index++}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
