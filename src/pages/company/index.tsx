import Button from "components/button";
import { Drop } from "components/drop-zone";
import { DragProps, Drage } from "components/drop-zone/drage";
import Input from "components/input";
import Pagination from "components/pagination";
import SelectBox from "components/selectBox";
import { COMPANY_LISTING } from "constants/api";
import { Link } from "gatsby";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ImSpinner10 } from "react-icons/im";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { CompanyDataType, CompanyStatus } from "type/company";
import cssVar from "utility/css-var";
import * as companyStyles from "./styles.module.scss";
import { findMatchingId } from "utility/find-matching-id";
const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

type DProps = CompanyDataType & {
  status: boolean;
};

const Company = () => {
  const [data, setData] = useState<Record<CompanyStatus, DProps[]>>({
    "upload info": [],
    "document review": [],
    verified: [],
    operational: [],
    rejected: [],
  });

  const drop1Color = cssVar("--color-blue_dress");
  const drop2Color = cssVar("--color-candlelight");
  const drop3Color = cssVar("--color-aqua_blue");

  async function handleDrop(
    item: any,
    section: CompanyStatus,
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
      const response = await request<CompanyDataType[]>({
        url: COMPANY_LISTING,
      });

      const filterData = { ...data };

      Object.keys(data).map(
        (item) => (filterData[item as CompanyStatus].length = 0)
      );

      response.data.forEach((item) => {
        console.log(item.company_status);
        filterData[item.company_status!].push({ ...item, status: false });
      });

      setData(() => filterData);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData(item: DragProps, to: CompanyStatus, index: number) {
    const datap = {
      company_status: to,
    };
    try {
      const response = await request<CompanyDataType[]>({
        url: COMPANY_LISTING + item.id + "/approval/",
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
        <Link to="company-registration">
          <Button
            title="Create Company"
            icon={<AiOutlinePlus />}
            className="flex-row-reverse"
          />
        </Link>

        <Input placeholder="Search" />

        <div className="w-64">
          <SelectBox color="full-white" data={dataList} />
        </div>
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
                {data[dropName as CompanyStatus].map((dragItem: DProps) => {
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
                          <List data={dragItem} loading={dragItem.status} />
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
function List({ data, loading }: { data: DProps; loading: boolean }) {
  return (
    <div className={companyStyles.list}>
      {/* <p className="">{data.status ? "Loading" : "ll"}</p> */}
      <div className="absolute right-3 top-1">
        <ImSpinner10 className="animate-spin" />
      </div>
      <div className={companyStyles.abnNo}>
        <span className="">ABN No. </span>
        <span className={companyStyles.id}>{data.id}</span>
      </div>
      <div className={companyStyles.companyInfo}>
        <p className="">{data.company_name}</p>
        <span className="">
          {" "}
          created on: Mon,3.40 am{moment(data.created_at).format("ddd,MM a")}
        </span>
      </div>
      <div className="contactInfo"></div>
    </div>
  );
}

export default Company;

// company
// {
//   "username": "c1@example.com",
//   "password": "Test@4321"
// }
