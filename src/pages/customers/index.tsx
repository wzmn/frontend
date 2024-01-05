import Button from "components/button";
import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Filterbtn from "components/filterBtn";
import Input from "components/input";
import Menu from "components/menu";
import * as menuStyle from "components/menu/styles.module.scss";
import Modal from "components/modal";
import { CompanyFilter } from "components/pages/company/helper";
import CustList from "components/pages/customer/cust-card";
import Pagination from "components/pagination";
import Placeholder from "components/skeleton";
import { CUSTOMER_LISTING } from "constants/api";
import { Link } from "gatsby";
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { DateRangePicker } from "react-date-range";
import { AiOutlinePlus } from "react-icons/ai";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import {
  CustomerDataExtraType,
  CustomerDataType,
  CustomerStatus,
} from "type/customer";
import cssVar from "utility/css-var";
import { debounce } from "utility/debounce";
import { findMatchingId } from "utility/find-matching-id";

type DropItemType = { id: number; section: CustomerStatus };

const selectionRangeInit = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const Customers = () => {
  const [data, setData] = useState<
    Record<CustomerStatus, CustomerDataExtraType[]>
  >({
    fresh: [],
    contacted: [],
    converted: [],
    not_interested: [],
  });

  // For skeleton
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectionRange, setSelectionRange] = useState(selectionRangeInit);

  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
    limit: 10,
    totalRecords: 0,
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

  async function handleDrop(
    item: DropItemType,
    section: CustomerStatus,
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

  async function updateData(
    item: DropItemType,
    to: CustomerStatus,
    index: number
  ) {
    const datap = {
      cust_status: to,
    };
    try {
      const response = await request<CustomerDataType>({
        url: CUSTOMER_LISTING + item.id + "/",
        method: "patch",
        data: datap,
      });

      const copyData = { ...data };
      let idx = findMatchingId(data, item.id, to);

      if (idx !== undefined) {
        copyData[to][idx].status = false;
        copyData[to][idx].cust_status = to;
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

  async function fetchData(params?: Record<any, any>) {
    try {
      setLoading(true);
      const response = await request<CustomerDataType>({
        url: CUSTOMER_LISTING,
        params: {
          limit: pagination.limit,
          offset: pagination.offset,
          ...params,
        },
      });

      const filterData = { ...data } as Record<
        CustomerStatus,
        CustomerDataExtraType[]
      >;

      //this is to make all record empty before calling this function otherwise it will stack
      Object.keys(data).map(
        (item) => (filterData[item as CustomerStatus].length = 0)
      );

      setPagination((prev) => ({
        ...prev,
        totalRecords: Number(response?.data?.count),
      }));

      response?.data?.results?.forEach((item) => {
        filterData[item.cust_status].push({
          ...item,
          status: false,
        } as CustomerDataExtraType);
      });

      setData(() => filterData);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    fetchData({ search: e.target.value });
  });

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
    // For skeleton
    fetchData().finally(() => setLoading(false));
  }, [pagination.page, pagination.limit]);

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
        <div className="">
          <Input
            name="company-search"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>

        {/* <div className="w-64">
          <SelectBox color="full-white" data={dataList} />
        </div> */}
        <Filterbtn>
          <div
            onClick={() => {
              setVisible((prev) => !prev);
            }}
            className={menuStyle.menu}
          >
            <button>Date</button>
          </div>
          <Menu title="Company Type">
            <CompanyFilter />
          </Menu>
        </Filterbtn>
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
                {!loading ? (
                  data[dropName].map((dragItem, index) => {
                    return (
                      <Fragment key={dragItem.id}>
                        <Drage
                          key={dragItem.id} //you can`t use index from map id should be unique
                          accept={"company"}
                          section={dropName}
                          id={dragItem.id as number}
                          loading={dragItem.status}
                        >
                          <CustList
                            data={dragItem}
                            loading={dragItem.status}
                            index={index}
                          />
                        </Drage>
                      </Fragment>
                    );
                  })
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
        label="Customers"
      />

      <Modal
        options={{
          title: "Date Picker",
          toggle: [visible, setVisible],
        }}
      >
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={(e: any) => {
            // console.log({
            //   startDate: e.selection.startDate,
            //   endDate: e.selection.endDate,
            // });
            setSelectionRange((prev) => ({
              ...prev,
              startDate: e.selection.startDate,
              endDate: e.selection.endDate,
            }));
          }}
        />
      </Modal>
    </>
  );
};

export default Customers;
