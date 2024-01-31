import Button from "components/button";
import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Filterbtn from "components/filterBtn";
import Input from "components/input";
import Menu from "components/menu";
import { CompanyFilter } from "components/pages/company/helper";
import Pagination from "components/pagination";
import { EMPLOYEE_LISTING } from "constants/api";
import { Link } from "gatsby";
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { request } from "services/http-request";
import * as commonStyles from "styles/pages/common.module.scss";
import { EmpStateStatus, EmployeeDataType, EmployeeRole } from "type/employee";
import cssVar from "utility/css-var";
import { findMatchingId } from "utility/find-matching-id";
// For skeleton
import * as menuStyle from "components/menu/styles.module.scss";
import Modal from "components/modal";
import { SortFilter } from "components/pages/common";
import { EmpList } from "components/pages/employee/emp-list";
import { useAppContext } from "providers/app-provider";
import { DateRangePicker } from "react-date-range";
import { IoIosArrowDown } from "react-icons/io";
import companyIdFetcher from "services/company-id-fetcher";
import MsgToast from "services/msg-toast";
import UserIdentifyer from "services/user-identifyer";
import { debounce } from "utility/debounce";
import Placeholder from "../../components/skeleton";

type DropItemType = { id: number; section: EmployeeRole };
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

const createEmpRole = ["superadmin", "admin", "owner"];

const Employees = () => {
  const {
    emp: { status },
  } = useAppContext();

  const [data, setData] = useState({} as EmpStateStatus);
  // For skeleton
  const [loading, setLoading] = useState(false);
  const [selectionRange, setSelectionRange] = useState(selectionRangeInit);
  const [visible, setVisible] = useState(false);
  const [sort, setSort] = useState(sortType[0].value);

  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
    limit: 10,
    totalRecords: 0,
  });

  const userRole = UserIdentifyer();
  const id = companyIdFetcher(userRole);

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
    section: EmployeeRole,
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

  async function fetchData(params?: Record<any, any>) {
    try {
      setLoading(true);
      const response = await request<EmployeeDataType>({
        url: EMPLOYEE_LISTING,
        params: {
          limit: pagination.limit,
          offset: pagination.offset,
          license_id__company__id: id,
          created_at__gte: selectionRange.startDate,
          created_at__lte: selectionRange.endDate,
          ordering: sort,
          ...params,
        },
      });

      const filterData = JSON.parse(JSON.stringify(status));

      //this is to make all record empty before calling this function otherwise it will stack
      // Object?.keys(data).map(
      //   (item) => (filterData[item as EmployeeRole].length = 0)
      // );

      setPagination((prev) => ({
        ...prev,
        totalRecords: Number(response?.data?.count),
      }));

      response?.data?.results?.forEach((item) => {
        console.log(item.role);
        filterData[item.role! as EmployeeRole]?.push({
          ...item,
          status: false,
        });
      });

      console.log(filterData, "$$$$$$$$$$$$$$$4444");

      setData(() => filterData);
    } catch (error: any) {
      console.log(" errorrrrrrrrrrrrrrrrr", error);
      MsgToast(error.response?.data?.detail, "error");
    } finally {
      setLoading(false);
    }
  }

  async function updateData(
    item: DropItemType,
    to: EmployeeRole,
    index: number
  ) {
    const datap = {
      role: to,
    };
    try {
      const response = await request<EmployeeDataType[]>({
        url: EMPLOYEE_LISTING + item.id + "/update-role/",
        method: "patch",
        data: datap,
      });

      const copyData = { ...data };
      let idx = findMatchingId(data, item.id, to);

      if (idx !== undefined) {
        copyData[to][idx].status = false;
        copyData[to][idx].role = to;
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

  const table = useRef<HTMLDivElement>(null);
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

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    fetchData({ search: e.target.value });
  });

  useEffect(() => {
    table.current!.addEventListener("wheel", handleScroll);
    return () => {
      table.current?.removeEventListener("wheel", handleScroll);
    };
  }, [table]);

  useEffect(() => {
    // For skeleton
    console.log("render emppppppppp");
    if (JSON.stringify(status) !== "{}") fetchData();
  }, [
    pagination.page,
    pagination.limit,
    status,
    id,
    sort,
    JSON.stringify(selectionRange),
  ]);

  const { btnCont, tableCont } = commonStyles;
  return (
    <>
      <div className={btnCont}>
        {createEmpRole.includes(userRole) && (
          <div className="">
            <Link to="employee-registration">
              <Button
                width="full"
                title="Create Employee"
                icon={<AiOutlinePlus />}
                className="flex-row-reverse"
              />
            </Link>
          </div>
        )}

        <div className="">
          <Input placeholder="Search" onChange={handleSearch} />
        </div>

        <Filterbtn icon={<IoIosArrowDown />} title="Filter">
          <div
            onClick={() => {
              setVisible((prev) => !prev);
            }}
            className={menuStyle.menu}
          >
            <button>Date</button>
          </div>
          {/* <Menu title="Manager">
            <CompanyFilter />
          </Menu> */}
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
      <div className={`${tableCont} drop-container`} ref={table}>
        {(Object?.keys(data) as EmployeeRole[])?.map((dropName, index) => {
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
                  data[dropName]?.map((dragItem) => {
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
                            <EmpList
                              loading={dragItem.status}
                              data={dragItem}
                            />
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
      <ToastContainer />
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
        label="Employees"
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

export default Employees;
