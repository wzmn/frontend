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
import { EmployeeDataType, EmployeeRole } from "type/employee";
import { findMatchingId } from "utility/find-matching-id";
import { DragProps, Drage } from "components/drop-zone/drage";
import { request } from "services/http-request";
import { EMPLOYEE_LISTING } from "constants/api";
import Filterbtn from "components/filterBtn";
import Menu from "components/menu";
import { CompanyFilter, DateFilter } from "pages/company/helper";
import { Link } from "gatsby";
const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const Employees = () => {
  const [data, setData] = useState<Record<EmployeeRole, EmployeeDataType[]>>({
    admin: [],
    agent: [],
    auditor: [],
    field_worker: [],
    manager: [],
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
        // filterData[item.company_status!].push({ ...item, status: false });
      });

      setData(() => filterData);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData(item: DragProps, to: EmployeeRole, index: number) {
    const datap = {
      company_status: to,
    };
    try {
      const response = await request<EmployeeDataType[]>({
        url: EMPLOYEE_LISTING + item.id + "/approval/",
        method: "patch",
        data: datap,
      });

      const copyData = { ...data };
      let idx = findMatchingId(data, item.id, to);

      if (idx !== undefined) {
        // copyData[to][idx].status = false;
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
      <pre>{JSON.stringify(data, null, 4)}</pre>
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
                        loading={false}
                      >
                        <>
                          {/* <List data={dragItem} loading={dragItem.status} /> */}
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

export default Employees;
