import Badge from "components/badge";
import Button from "components/button";
import CombineCombo from "components/combine-combo";
import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Filterbtn from "components/filterBtn";
import Input from "components/input";
import Menu from "components/menu";
import * as menuStyle from "components/menu/styles.module.scss";
import Modal from "components/modal";
import { SortFilter } from "components/pages/common";
import JobList from "components/pages/job/job-card";
import Pagination from "components/pagination";
import Placeholder from "components/skeleton";
import { JOB_LISTING } from "constants/api";
import { Link } from "gatsby-link";
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
import companyIdFetcher from "services/company-id-fetcher";
import { WorkTypeFilter } from "services/filters";
import { request } from "services/http-request";
import TimeFormat from "services/time-format";
import UserIdentifyer from "services/user-identifyer";
import * as commonStyles from "styles/pages/common.module.scss";
import * as styles from "styles/pages/common.module.scss";
import { JobDataStateType, JobDataType, JobStatusRole } from "type/job";
import cssVar from "utility/css-var";
import { debounce } from "utility/debounce";
import { findMatchingId } from "utility/find-matching-id";
import { CustTypeData } from ".././../constants";
import moment from "moment";

type DropItemType = { id: number; section: JobStatusRole };

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

const data1 = [
  {
    label: "State",
    value: "state",
  },
  {
    label: "Suburb",
    value: "Suburb",
  },
  {
    label: "LGA",
    value: "LGA",
  },
  {
    label: "Pincode",
    value: "Pincode",
  },
];

const Jobs = () => {
  const [data, setData] = useState<Record<JobStatusRole, JobDataStateType[]>>({
    waiting: [],
    open: [],
    close: [],
  });

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    ...selectionRangeInit,
  });
  const [workType, setWorkType] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
    limit: 10,
    totalRecords: 0,
  });
  const [sort, setSort] = useState(sortType[0].value);
  const [custType, setCustType] = useState(CustTypeData[0].value);

  const { btnCont, tableCont } = commonStyles;

  const table = useRef<HTMLDivElement>(null);

  // const {
  //   register: registerFilters,
  //   watch: watchFilters,
  //   setValue: setValueFilters,
  // } = useForm<FilterT>();

  const userRole = UserIdentifyer();
  const id = companyIdFetcher(userRole);

  // const workType = watchFilters("workType");

  function clearFilters() {
    setSelectionRange(() => selectionRangeInit);
    setWorkType(() => []);
    setCustType(() => CustTypeData[0].value);
  }

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

  async function fetchData(params?: Record<any, any>) {
    try {
      setLoading(true);
      const response = await request<JobDataType>({
        url: JOB_LISTING,
        params: {
          limit: pagination.limit,
          offset: pagination.offset,
          work_type__title__in: workType.toString(),
          customer__company__in: id,
          ordering: sort,
          created_at__gte: selectionRange.startDate
            ? moment(selectionRange.startDate).format("YYYY-MM-DDT00:00")
            : undefined,
          created_at__lte: selectionRange.endDate
            ? moment(selectionRange.endDate).format("YYYY-MM-DDT23:59")
            : undefined,
          customer__customer_type: custType,

          ...params,
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

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    fetchData({ search: e.target.value });
  });

  function workTypeFilterHandler(value: string) {
    let idChecker = null;
    const list = [...workType];
    for (let i = 0; i < workType.length; i++) {
      if (workType[i] === value) {
        list.splice(i, 1);
        idChecker = i;
        break;
      }
    }

    if (idChecker === null) {
      list.push(value);
    }

    setWorkType(() => [...list]);
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
    fetchData();
  }, [
    pagination.page,
    pagination.limit,
    id,
    JSON.stringify(workType),
    sort,
    JSON.stringify(selectionRange),
    custType,
  ]);

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
          <div className="relative h-40">
            <Menu title="Work Type" dropPosition={styles.menuPos}>
              <WorkTypeFilter
                workType={workType}
                setValue={workTypeFilterHandler}
              />
            </Menu>
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
                data={CustTypeData}
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

        {/* <CombineCombo
          data1={data1}
          data2={[]}
          handleSelectData1={(e) => {
            console.log(e);
          }}
          handleSelectData2={(e) => {
            console.log(e);
          }}
        /> */}

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
                            <JobList
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
        label="Jobs"
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

export default Jobs;
