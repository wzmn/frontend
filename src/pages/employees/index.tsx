import Button from "components/button";
import { Drop } from "components/drop-zone";
import { DragProps, Drage } from "components/drop-zone/drage";
import Filterbtn from "components/filterBtn";
import Input from "components/input";
import Menu from "components/menu";
import { CompanyFilter, DateFilter } from "components/pages/company/helper";
import Pagination from "components/pagination";
import { EMPLOYEE_LISTING } from "constants/api";
import { Link } from "gatsby";
import moment from "moment";
import { useRightBarContext } from "providers/right-bar-provider";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ImSpinner10 } from "react-icons/im";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { request } from "services/http-request";
import * as commonStyles from "styles/pages/common.module.scss";
import { toast, ToastContainer } from "react-toastify";
import {
  EmployeeDataStateType,
  EmployeeDataType,
  EmployeeRole,
} from "type/employee";
import cssVar from "utility/css-var";
import { findMatchingId } from "utility/find-matching-id";
import View from "./view";
// For skeleton
import Placeholder from "../../components/skeleton";

type DropItemType = { id: number; section: EmployeeRole };

const Employees = () => {
  const [data, setData] = useState<
    Record<EmployeeRole, EmployeeDataStateType[]>
  >({
    Admin: [],
    Agent: [],
    Auditor: [],
    "Field Worker": [],
    Manager: [],
  });
  // For skeleton
  const [loading, setLoading] = useState(false);
  const [dataIsUpdating, setDataIsUpdating] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
    limit: 10,
    totalRecords: 0,
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

  async function fetchData() {
    if (dataIsUpdating) {
      return;
    }
    setDataIsUpdating(true);
    try {
      setLoading(true);
      const response = await request<EmployeeDataType>({
        url: EMPLOYEE_LISTING,
        params: {
          limit: pagination.limit,
          offset: pagination.offset,
        },
      });

      const filterData = { ...data };

      //this is to make all record empty before calling this function otherwise it will stack
      Object.keys(data).map(
        (item) => (filterData[item as EmployeeRole].length = 0)
      );

      setPagination((prev) => ({
        ...prev,
        totalRecords: Number(response?.data?.count),
      }));

      response?.data?.results?.forEach((item) => {
        console.log(item.role);
        filterData[item.role! as EmployeeRole].push({ ...item, status: false });
      });

      setData(() => filterData);
      setDataIsUpdating(false);
    } catch (error: any) {
      toast.error(error.response.data.detail);
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

  const { btnCont, tableCont } = commonStyles;
  return (
    <>
      <div className={btnCont}>
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

        <div className="">
          <Input placeholder="Search" />
        </div>

        {/* <div className=""> */}
        <Filterbtn>
          <Menu title="Date">
            <DateFilter />
          </Menu>
          <Menu title="Manager">
            <CompanyFilter />
          </Menu>
        </Filterbtn>
        {/* </div> */}
      </div>

      <div className={`${tableCont} drop-container`} ref={table}>
        {(Object.keys(data) as EmployeeRole[]).map((dropName, index) => {
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
                  data[dropName].map((dragItem) => {
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
    <ToastContainer/>
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
    </>
  );
};

export function List({
  data,
  loading,
}: {
  data: EmployeeDataStateType;
  loading: boolean;
}) {
  const { card, cardInfo, contactInfo, icon, contact } = commonStyles;
  const { open, setElement, toggle } = useRightBarContext();

  return (
    <div
      onClick={() => {
        !open && toggle();

        setElement(
          <View data={data} />,
          `Customer ID: ${data.id}`,
          <>
            <IoEyeOutline
              onClick={() => {
                window.open(`employee-details/?employee=${data.id}`, "_blank");
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
          <p className="title">{data.user?.first_name}</p>
          <span className="">
            {" "}
            created on: {moment(data.user?.created_at).format("ddd, MM a")}
          </span>
        </div>
        <div className={contactInfo}>
          <div className="">
            <span className={icon}>
              <TfiEmail className={icon} />
            </span>

            <span className={contact}>{data.user?.email}</span>
          </div>

          <div className="">
            <span className={icon}>
              <IoCallOutline className={icon} />
            </span>

            <span className={contact}>{data.user?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
