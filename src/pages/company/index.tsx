import Button from "components/button";
import { Drop } from "components/drop-zone";
import { Drage } from "components/drop-zone/drage";
import Input from "components/input";
import Pagination from "components/pagination";
import SelectBox from "components/selectBox";
import { COMPANY_LISTING } from "constants/api";
import { demoDndData } from "constants/demo-dnd-data";
import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import { CompanyDataType, CompanyStatus } from "type/company";
import cssVar from "utility/css-var";
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
  const [data, setData] = useState(demoDndData);
  const [d, setD] = useState<Record<CompanyStatus, DProps[]>>({
    "upload info": [],
    "document review": [],
    verified: [],
    operational: [],
    rejected: [],
  });

  const drop1Color = cssVar("--color-blue_dress");
  const drop2Color = cssVar("--color-candlelight");
  const drop3Color = cssVar("--color-aqua_blue");

  function handleDrop(item: any, section: string, make: boolean = false) {
    console.log(item, section);
    if (item.section === section) return;
    // console.log(item);
    const dt: any = { ...d };
    let idx;
    dt[item.section]?.some((itm: any, key: any) => {
      console.log(item.id, itm.id);
      if (item.id === itm.id) {
        idx = key;
        return true;
      }
    });

    if (idx !== undefined) {
      const pop = dt[item.section].splice(idx, 1)[0];
      dt[section].unshift({ ...pop, status: make });

      setD(() => dt);
      // if(make){
      //   updateData(item,section)
      // }
    }
  }

  async function fetchData() {
    try {
      const response = await request<CompanyDataType[]>({
        url: COMPANY_LISTING,
      });

      const filterData = { ...d };

      response.data.forEach((item) => {
        console.log(item.company_status);
        filterData[item.company_status!].push({ ...item, status: false });
      });

      setData((prev) => ({ ...prev, filterData }));
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData(item: any, to: string) {
    const data = {
      company_status: to,
    };
    try {
      const response = await request<CompanyDataType[]>({
        url: COMPANY_LISTING + item.id + "/approval/",
        method: "patch",
        data,
      });
    } catch (error) {
      handleDrop(item, to);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <pre>{JSON.stringify(d, null, 4)}</pre> */}
      <div className={styles.btnCont}>
        <Link to="add-edit-company">
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
        {Object.keys(d).map((dropName) => {
          return (
            <Drop
              key={dropName}
              titleRingColor={drop1Color}
              accept="company"
              handleDrop={handleDrop}
              section={dropName}
              title={dropName.toLocaleUpperCase()}
              data={d[dropName as CompanyStatus]}
            >
              <>
                {d[dropName as CompanyStatus].map((dragItem) => {
                  return (
                    <Drage
                      key={dragItem.id} //you can`t use index from map id should be unique
                      accept={dragItem.status ? "" : "company"}
                      section={dropName}
                      id={dragItem.id as number}
                    >
                      <List
                        // currentSection={dropName}
                        // nextSection
                        data={dragItem}
                      />
                    </Drage>
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
let count = 0;
function List({ data }: { data: any }) {
  const [v, sV] = useState();

  useEffect(() => {
    console.log(data.id, "ini");
  }, []);
  useEffect(() => {
    count++;
    console.log(data.id, "rend");
  }, [v]);
  return (
    <div className="">
      <p className="">{count}</p>
      {data.id}
    </div>
  );
}

export default Company;
