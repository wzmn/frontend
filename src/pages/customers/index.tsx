import Badge from "components/badge";
import Button from "components/button";
import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Filterbtn from "components/filterBtn";
import Input from "components/input";
import Menu from "components/menu";
import * as menuStyle from "components/menu/styles.module.scss";
import Modal from "components/modal";
import { SortFilter } from "components/pages/common";
import CustList from "components/pages/customer/cust-card";
import { usefetchData } from "components/pages/customer/helper";
import Pagination from "components/pagination";
import Placeholder from "components/skeleton";
import { CUSTOMER_LISTING, EXPORT_CUST } from "constants/api";
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
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import companyIdFetcher from "services/company-id-fetcher";
import { request } from "services/http-request";
import UserIdentifyer from "services/user-identifyer";
import * as styles from "styles/pages/common.module.scss";
import {
  CustomerDataExtraType,
  CustomerDataType,
  CustomerStatus,
} from "type/customer";
import cssVar from "utility/css-var";
import { debounce } from "utility/debounce";
import { findMatchingId } from "utility/find-matching-id";
import * as locStyles from "./styles.module.scss";
import moment from "moment";
import TimeFormat from "services/time-format";

type DropItemType = { id: number; section: CustomerStatus };

const selectionRangeInit = {
  startDate: undefined,
  endDate: undefined,
  key: "selection",
};

const sortType = [
  {
    label: "Created On",
    value: "-created_at",
  },
  {
    label: "Last Active",
    value: "-user__last_login",
  },
  {
    label: "Modified On",
    value: "-upadted_at",
  },
];

const custTypeData = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Residential",
    value: "Residential",
  },
  {
    label: "Business",
    value: "Business",
  },
];

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
  // const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectionRange, setSelectionRange] = useState(
    JSON.parse(JSON.stringify(selectionRangeInit))
  );
  const [sort, setSort] = useState(sortType[0].value);
  const [custType, setCustType] = useState(custTypeData[0].value);

  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
    limit: 10,
    totalRecords: 0,
  });

  const table = useRef<HTMLDivElement>(null);

  const userRole = UserIdentifyer();
  const id = companyIdFetcher(userRole);

  const { fetchData, loading } = usefetchData({
    params: {
      limit: pagination.limit,
      offset: pagination.offset,
      company__id: id,
      ordering: sort,
      created_at__gte: selectionRange.startDate
        ? TimeFormat(selectionRange.startDate)
        : undefined,
      created_at__lte: selectionRange.endDate
        ? TimeFormat(selectionRange.endDate)
        : undefined,
      custType: custType,
    },
    data,
    setData,
    setPagination,
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

  // async function fetchData(params?: Record<any, any>) {
  //   try {
  //     setLoading(true);
  //     const response = await request<CustomerDataType>({
  //       url: CUSTOMER_LISTING,
  //       params: {
  //         limit: pagination.limit,
  //         offset: pagination.offset,
  //         company__id: id,
  //         ordering: sort,
  //         created_at__gte: selectionRange.startDate,
  //         created_at__lte: selectionRange.endDate,
  //         ...params,
  //       },
  //     });

  //     const filterData = { ...data } as Record<
  //       CustomerStatus,
  //       CustomerDataExtraType[]
  //     >;

  //     //this is to make all record empty before calling this function otherwise it will stack
  //     Object.keys(data).map(
  //       (item) => (filterData[item as CustomerStatus].length = 0)
  //     );

  //     setPagination((prev) => ({
  //       ...prev,
  //       totalRecords: Number(response?.data?.count),
  //     }));

  //     response?.data?.results?.forEach((item) => {
  //       filterData[item.cust_status].push({
  //         ...item,
  //         status: false,
  //       } as CustomerDataExtraType);
  //     });

  //     setData(() => filterData);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function exportCust() {
    try {
      const response = await toast.promise(
        request({
          url: EXPORT_CUST,
          method: "get",
          params: {
            file_format: "CSV",
          },
        }),
        {
          pending: "Wait...",
          success: "Exported! ",
          error: "Cannot export try again later",
        }
      );
    } catch (error) {}
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

  function clearFilters() {
    setSelectionRange(() => selectionRangeInit);
    setCustType(() => custTypeData[0].value);
  }

  useEffect(() => {
    table.current!.addEventListener("wheel", handleScroll);
    return () => {
      table.current?.removeEventListener("wheel", handleScroll);
    };
  }, [table]);

  useEffect(() => {
    // For skeleton
    fetchData();
  }, [
    pagination.page,
    pagination.limit,
    id,
    sort,
    JSON.stringify(selectionRange.endDate),
    custType,
  ]);

  return (
    <>
      <div className={locStyles.btnCont}>
        <Link to="customer-registration" className={locStyles.alignWithCard}>
          <Button
            width="default"
            title="Create Customer"
            icon={<AiOutlinePlus />}
            className="flex-row-reverse"
          />
        </Link>
        <div className={locStyles.alignWithCard}>
          <Input
            name="company-search"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>

        {/* <div className="w-64">
          <SelectBox color="full-white" data={dataList} />
        </div> */}
        <div className={locStyles.alignWithCard}>
          <Filterbtn icon={<IoIosArrowDown />} title="Filter">
            <div className="relative h-32">
              <div
                onClick={() => {
                  setVisible((prev) => !prev);
                }}
                className={menuStyle.menu}
              >
                <button>Date</button>
              </div>

              <Menu title="Customer Type" dropPosition={styles.menuPos}>
                <SortFilter
                  data={custTypeData}
                  defaultChecked={custType}
                  setValue={(e) => {
                    setCustType(e);
                  }}
                />
              </Menu>
              <Badge
                label="clear"
                className="absolute bottom-2 left-0 text-blue-600 cursor-pointer"
                onClick={() => {
                  clearFilters();
                }}
              />
            </div>
          </Filterbtn>
        </div>

        <div className="w-32">
          {" "}
          <Filterbtn icon={<img src="/assets/icons/sort.svg" />} title="Sort">
            <SortFilter
              data={sortType}
              defaultChecked={sort}
              setValue={(e) => {
                setSort(e);
              }}
            />
          </Filterbtn>
        </div>

        {/* <div className="w-44 flex gap-3">
          <div className={locStyles.impExpBtn}>
            <Button
              icon={<CiImport />}
              className={`flex-row-reverse`}
              color={"white"}
              title="Import"
            />
          </div>

          <div className={locStyles.impExpBtn}>
            <Button
              icon={<CiExport />}
              className={`flex-row-reverse`}
              color={"white"}
              title="Export"
              onClick={() => exportCust()}
            />
          </div>
        </div> */}
      </div>

      <div className={`${styles.tableCont} drop-container`} ref={table}>
        {(Object.keys(data) as CustomerStatus[]).map((dropName, index) => {
          return (
            <Drop
              key={dropName}
              titleRingColor={getColumnColor(index)}
              accept="company"
              handleDrop={handleDrop}
              section={dropName}
              title={dropName?.toLocaleUpperCase()?.replace("_", " ")}
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
            console.log({
              startDate: e.selection.startDate,
              endDate: e.selection.endDate,
            });
            setSelectionRange((prev: any) => ({
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
