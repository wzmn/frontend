import Button from "components/button";
import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Filterbtn from "components/filterBtn";
import Input from "components/input";
import Menu from "components/menu";
import * as menuStyle from "components/menu/styles.module.scss";
import Modal from "components/modal";
import { SortFilter } from "components/pages/common";
import Pagination from "components/pagination";
import Placeholder from "components/skeleton";
import { COMPANY_LISTING } from "constants/api";
import { Link } from "gatsby";
import moment from "moment";
import { useAppContext } from "providers/app-provider";
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
import { request } from "services/http-request";
import UserIdentifyer from "services/user-identifyer";
import * as styles from "styles/pages/common.module.scss";
import {
  CompanyDataType,
  CompanyExtraDataType,
  CompanyStateStatus,
  CompanyStatus,
} from "type/company";
import cssVar from "utility/css-var";
import { debounce } from "utility/debounce";
import { findMatchingId } from "utility/find-matching-id";
import { List } from "../../components/pages/company/helper";

export const CompanyTypeData = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Installer",
    value: "buyer",
  },
  {
    label: "Seller",
    value: "seller",
  },
];

type DropItemType = { id: number; section: CompanyStatus };

const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

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
    label: "Modified On",
    value: "-upadted_at",
  },
];

const Company = () => {
  const {
    company: { status },
  } = useAppContext();

  const [data, setData] = useState({} as CompanyStateStatus);
  const [selectionRange, setSelectionRange] = useState(selectionRangeInit);
  const [comType, setComType] = useState(CompanyTypeData[0].value);

  // For skeleton
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sort, setSort] = useState(sortType[0].value);

  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
    limit: 10,
    totalRecords: 0,
  });

  const userRole = UserIdentifyer();
  // const companyListFilterHandlerId = companyListFilterHandler();

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

  async function handleDrop(
    item: DropItemType,
    section: CompanyStatus,
    make: boolean = true
  ) {
    console.log(item, section);
    if (item.section === section) return;
    const copyData = { ...data };
    let idx = findMatchingId(data, item.id, item.section);

    if (idx !== undefined) {
      const pop = copyData[item.section].splice(idx, 1)[0];
      copyData[section].unshift({ ...pop, status: make });
      setData(() => copyData);

      updateData(item, section, idx);
    }
  }

  async function fetchData(params?: Record<any, any>) {
    try {
      setLoading(true);
      const response = await request<CompanyDataType>({
        url: COMPANY_LISTING,
        params: {
          limit: pagination.limit,
          offset: pagination.offset,
          // company__in: companyListFilterHandlerId.toString(),
          ordering: sort,
          created_at__gte: selectionRange.startDate
            ? moment(selectionRange.startDate).format("YYYY-MM-DDT00:00")
            : undefined,
          created_at__lte: selectionRange.endDate
            ? moment(selectionRange.endDate).format("YYYY-MM-DDT23:59")
            : undefined,
          company_type: comType,
          ...params,
        },
      });

      const filterData = JSON.parse(JSON.stringify(status));

      //this is to make all record empty before calling this function otherwise it will stack
      Object.keys(data).map(
        (item) => (filterData[item as CompanyStatus].length = 0)
      );

      setPagination((prev) => ({
        ...prev,
        totalRecords: Number(response?.data?.count),
      }));

      response?.data?.results?.forEach((item) => {
        console.log(item.company_status);
        filterData[item.company_status! as CompanyStatus].push({
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
    to: CompanyStatus,
    index: number
  ) {
    const datap = {
      company_status: to,
      company_verified: ["verified", "operational"].includes(
        to.toLocaleLowerCase()
      ),
    };
    try {
      const response = await request<CompanyDataType[]>({
        // url: COMPANY_LISTING + item.id + "/approval/",
        url: COMPANY_LISTING + item.id + "/",
        method: "patch",
        data: datap,
      });

      const copyData = { ...data };
      let idx = findMatchingId(data, item.id, to);

      if (idx !== undefined) {
        copyData[to][idx].status = false;
        copyData[to][idx].company_status = to;
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

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    fetchData({ search: e.target.value });
  });

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
  }, []);

  useEffect(() => {
    // For skeleton
    if (JSON.stringify(status) !== "{}") fetchData();
  }, [
    pagination.page,
    pagination.limit,
    status,
    // JSON.stringify(companyListFilterHandlerId),
    sort,
    JSON.stringify(selectionRange),
    comType,
  ]);

  return (
    <>
      <div className={styles.btnCont}>
        <div className="">
          <Link to={`company-registration`}>
            <Button
              width="full"
              title="Create Company"
              icon={<AiOutlinePlus />}
              className="flex-row-reverse"
              name="create-company"
            />
          </Link>
        </div>

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
        <Filterbtn icon={<IoIosArrowDown />} title="Filter">
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
              data={CompanyTypeData}
              defaultChecked={comType}
              setValue={(e) => {
                setComType(e);
              }}
            />
          </Menu>
        </Filterbtn>
        <div className="w-32">
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
      </div>

      <div className={`${styles.tableCont} drop-container`} ref={table}>
        {(Object.keys(data) as CompanyStatus[]).map((dropName, index) => {
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
                  data[dropName].map(
                    (dragItem: CompanyExtraDataType, index: number) => {
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
                              <List
                                data={dragItem}
                                loading={dragItem.status}
                                index={index}
                                refetch={fetchData}
                              />
                            </>
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
        label="Companies"
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

export default Company;

// company
// {
//   "username": "c1@example.com",
//   "password": "Test@4321"
// }
