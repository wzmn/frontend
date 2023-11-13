import React, { Fragment, useEffect, useState } from "react";
import Button from "components/button";
import { AiOutlinePlus } from "react-icons/ai";
import Input from "components/input";
import SelectBox from "components/selectBox";
import Pagination from "components/pagination";
import { Drop } from "components/drop-zone";
import cssVar from "utility/css-var";
import { demoDndData } from "constants/demo-dnd-data";
import * as styles from "styles/pages/common.module.scss";
import {
  EmployeeDataStateType,
  EmployeeDataType,
  EmployeeRole,
} from "type/employee";
import { findMatchingId } from "utility/find-matching-id";
import { DragProps, Drage } from "components/drop-zone/drage";
import { request } from "services/http-request";
import { EMPLOYEE_LISTING } from "constants/api";
import Filterbtn from "components/filterBtn";
import Menu from "components/menu";
import { CompanyFilter, DateFilter } from "components/pages/company/helper";
import { Link } from "gatsby";
import { IoCallOutline } from "react-icons/io5";
import moment from "moment";
import { ImSpinner10 } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

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

  const drop1Color = cssVar("--color-blue_dress");
  const drop2Color = cssVar("--color-candlelight");
  const drop3Color = cssVar("--color-aqua_blue");

  async function handleDrop(
    item: any,
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
    try {
      const response = await request<EmployeeDataType[]>({
        url: EMPLOYEE_LISTING,
      });

      const filterData = { ...data };

      Object.keys(data).map(
        (item) => (filterData[item as EmployeeRole].length = 0)
      );

      response.data.forEach((item) => {
        console.log(item.role);
        filterData[item.role! as EmployeeRole].push({ ...item, status: false });
      });

      setData(() => filterData);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData(item: DragProps, to: EmployeeRole, index: number) {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.btnCont}>
        <Link to="employee-registration">
          <Button
            title="Create Employee"
            icon={<AiOutlinePlus />}
            className="flex-row-reverse"
          />
        </Link>

        <Input placeholder="Search" />

        {/* <div className="w-64">
          <SelectBox color="full-white" data={dataList} />
        </div> */}

        <Filterbtn>
          <Menu title="Date">
            <DateFilter />
          </Menu>
          <Menu title="Manager">
            <CompanyFilter />
          </Menu>
        </Filterbtn>
      </div>

      <div className={styles.tableCont}>
        {Object.keys(data).map((dropName) => {
          console.log(dropName);
          return (
            <Drop
              key={dropName}
              titleRingColor={drop1Color}
              accept="company"
              handleDrop={handleDrop}
              section={dropName}
              title={dropName.toLocaleUpperCase()}
            >
              <>
                {data[dropName as EmployeeRole].map((dragItem) => {
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
}: {
  data: EmployeeDataStateType;
  loading: boolean;
}) {
  return (
    <div className={styles.card}>
      {/* <p className="">{data.status ? "Loading" : "ll"}</p> */}
      <div className="absolute right-3 top-1">
        <ImSpinner10 className="animate-spin" />
      </div>
      {/* <div className={styles.header}>
       
        <span>{data.user?.first_name}</span>
      </div> */}
      <div className={styles.cardInfo}>
        <p className="">{data.user?.first_name}</p>
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

          <span className={styles.contact}>{data.user?.phone}</span>
        </div>

        <div className="">
          <span className={styles.icon}>
            <IoCallOutline className={styles.icon} />
          </span>

          <span className={styles.contact}>{data.user?.email}</span>
        </div>
      </div>
    </div>
  );
}

export default Employees;
