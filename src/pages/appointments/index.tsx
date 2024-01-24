import Button from "components/button";
import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Filterbtn from "components/filterBtn";
import Input from "components/input";
import * as menuStyle from "components/menu/styles.module.scss";
import Modal from "components/modal";
import ApptList from "components/pages/appointment/appt-list";
import PublishModal from "components/pages/appointment/publish-modal";
import { SortFilter } from "components/pages/common";
import Pagination from "components/pagination";
import Placeholder from "components/skeleton";
import { APPOINTMENT_LISTING, REQUEST_QUOTE } from "constants/api";
import { navigate } from "gatsby";
import { useAppContext } from "providers/app-provider";
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { DateRangePicker } from "react-date-range";
import { IoIosArrowDown } from "react-icons/io";
import companyIdFetcher from "services/company-id-fetcher";
import { request } from "services/http-request";
import UserIdentifyer from "services/user-identifyer";
import * as commonStyles from "styles/pages/common.module.scss";
import * as styles from "styles/pages/common.module.scss";

import Badge from "components/badge";
import CombineCombo from "components/combine-combo";
import Menu from "components/menu";
import { WorkTypeFilter } from "services/filters";
import TimeFormat from "services/time-format";
import {
  AppointmentDataType,
  AppointmentExtraDataType,
  AppointmentStatusType,
  ApptStateStatus,
  ApptStatuesResp,
} from "type/appointment";
import cssVar from "utility/css-var";
import { debounce } from "utility/debounce";
import { findMatchingId } from "utility/find-matching-id";
import * as locStyles from "./styles.module.scss";
import { CustTypeData } from ".././../constants";
import { colAccepList } from "components/pages/appointment/helper";
import MsgToast from "services/msg-toast";

const selectionRangeInit = {
  startDate: undefined,
  endDate: undefined,
  key: "selection",
};

type DropItemType = { id: number; section: AppointmentStatusType };

let apptStatuesResp = [] as ApptStatuesResp[];
let apptStatusState = {} as Record<
  AppointmentStatusType,
  AppointmentExtraDataType[]
>;

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

const assessment = ["audited", "reassessment", "snippit audited"];

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

const Appintments = () => {
  const {
    appointment: { status, statusData },
  } = useAppContext();

  const [data, setData] = useState({} as ApptStateStatus);

  // For skeleton
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [publishMod, setPublishMod] = useState(false);

  const [selectionRange, setSelectionRange] = useState({
    ...selectionRangeInit,
  });
  const [sort, setSort] = useState(sortType[0].value);
  const [snippitAudited, setSnippitAudited] = useState<string[]>([]);
  const [custType, setCustType] = useState(CustTypeData[0].value);
  const [quoteReqLoading, setQuoteReqLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
    limit: 10,
    totalRecords: 0,
  });

  const [workType, setWorkType] = useState<string[]>([]);

  const { btnCont, tableCont } = commonStyles;
  const table = useRef<HTMLDivElement>(null);

  const userRole = UserIdentifyer();
  const id = companyIdFetcher(userRole);

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
      cssVar("--color-blue_dress"),
    ];
    return colors[int % colors.length];
  }

  async function handleDrop(
    item: DropItemType,
    section: AppointmentStatusType,
    make: boolean = true
  ) {
    if (section === "Confirmed") {
      const dt = data[item.section].find((val) => val.id === item.id);
      navigate(`/jobs/create-appointment/?apptId=${dt?.id}`, {
        state: dt?.job,
      });
      return;
    }

    if (assessment.includes(section.toLowerCase())) {
      const dt = data[item.section].find((val) => val.id === item.id);
      navigate(`assessment`, {
        state: { wtId: dt?.job?.work_type?.id, apptId: dt?.id },
      });
      return;
    }

    console.log(item, section);
    if (item.section === section) return;
    const copyData: any = { ...data };
    let idx = findMatchingId(data, item.id, item.section);
    console.log(idx, " idddx");

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
      const response = await request<AppointmentDataType>({
        url: APPOINTMENT_LISTING,
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
          job__work_type__title__in: workType.toString(),
          customer__customer_type: custType,
          ...params,
        },
      });

      let filterData = JSON.parse(JSON.stringify(status)) as ApptStateStatus;

      setPagination((prev) => ({
        ...prev,
        totalRecords: Number(response?.data?.count),
      }));

      response?.data?.results?.forEach((item) => {
        item?.appointment_status &&
          filterData[item?.appointment_status! as AppointmentStatusType].push({
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
    to: AppointmentStatusType,
    index: number
  ) {
    const statueChangeFrom = statusData?.filter((item) => {
      return item.title === to;
    });
    console.log(statueChangeFrom, " statueChangeFrom");
    const datap = {
      appointment_status_id: statueChangeFrom![0].id,
    };
    try {
      const response = await request<AppointmentDataType[]>({
        url: APPOINTMENT_LISTING + item.id + "/",
        method: "patch",
        data: datap,
      });

      const copyData = { ...data! };
      let idx = findMatchingId(data, item.id, to);
      console.log(idx, "  idx");

      if (idx !== undefined) {
        copyData[to][idx].status = false;
        copyData[to][idx].appointment_status = to;
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

  async function requestQuote() {
    try {
      setQuoteReqLoading((prev) => !prev);
      const res = await request({
        url: REQUEST_QUOTE,
        method: "post",
        data: {
          assessments_id: snippitAudited,
          description: "Requested Quote",
        },
      });
      MsgToast("Quote Send!", "success");
      await fetchData();
    } catch (error) {
      MsgToast("Try Again Later", "error");
    } finally {
      setQuoteReqLoading((prev) => !prev);
    }
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

  function snippitAuditedCheckboxHandler(value: string) {
    let idChecker = null;
    const list = [...snippitAudited];
    for (let i = 0; i < snippitAudited.length; i++) {
      if (snippitAudited[i] === value) {
        list.splice(i, 1);
        idChecker = i;
        break;
      }
    }

    if (idChecker === null) {
      list.push(value);
    }

    setSnippitAudited(() => [...list]);
  }

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

  useEffect(() => {
    table.current!.addEventListener("wheel", handleScroll);
    return () => {
      table.current?.removeEventListener("wheel", handleScroll);
    };
  }, [table]);

  useEffect(() => {
    // For skeleton
    if (JSON.stringify(status) !== "{}") fetchData();
  }, [
    pagination.page,
    pagination.limit,
    status,
    id,
    sort,
    JSON.stringify(selectionRange),
    JSON.stringify(workType),
  ]);

  return (
    <>
      <div className={locStyles.filtersCont}>
        {/* <Link to="/jobs/create-job/" className={locStyles.alignWithCard}>
          <Button
            title="Create Job"
            icon={<AiOutlinePlus />}
            className="flex-row-reverse"
          />
        </Link> */}

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
            <div className="relative h-40">
              <div
                onClick={() => {
                  setVisible((prev) => !prev);
                }}
                className={menuStyle.menu}
              >
                <button>Date</button>
              </div>
              <Menu title="Work Type" dropPosition={styles.menuPos}>
                <WorkTypeFilter
                  workType={workType}
                  setValue={workTypeFilterHandler}
                />
              </Menu>

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
        </div>
        <CombineCombo
          data1={data1}
          data2={[]}
          handleSelectData1={(e) => {
            console.log(e);
          }}
          handleSelectData2={(e) => {
            console.log(e);
          }}
        />
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
        {snippitAudited.length > 0 && (
          <div className={locStyles.publishBtn}>
            <Button
              title="Request Quote"
              isLoading={quoteReqLoading}
              disabled={quoteReqLoading}
              onClick={() => requestQuote()}
            />
          </div>
        )}
      </div>

      <div className={`${tableCont} drop-container`} ref={table}>
        {(Object.keys(data) as AppointmentStatusType[]).map(
          (dropName, index) => {
            return (
              <Drop
                key={dropName}
                titleRingColor={getColumnColor(index)}
                accept={colAccepList[dropName] || []}
                handleDrop={handleDrop}
                section={dropName}
                title={dropName.toLocaleUpperCase()}
              >
                <>
                  {!loading ? (
                    data?.[dropName]?.map((dragItem) => {
                      return (
                        <Fragment key={dragItem.id}>
                          <Drage
                            key={dragItem.id} //you can`t use index from map id should be unique
                            accept={dropName}
                            section={dropName}
                            id={dragItem.id as number}
                            loading={dragItem.status}
                          >
                            <>
                              {/* {JSON.stringify(dropName)} */}
                              <ApptList
                                snippitAuditedCheckboxHandler={
                                  snippitAuditedCheckboxHandler
                                }
                                snippitAudited={snippitAudited}
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
          }
        )}
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
        label="Appointments"
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

      <Modal
        options={{
          title: "Request Quote",
          toggle: [publishMod, setPublishMod],
          buttons: [
            {
              type: "info",
              title: "Send",
              action: () => console.log("hi"),
            },
          ],
        }}
      >
        <PublishModal />
      </Modal>
    </>
  );
};

export default Appintments;
