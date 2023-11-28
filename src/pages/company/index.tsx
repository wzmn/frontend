import Button from "components/button";
import { Drop } from "components/drop-zone";
import { DragProps, Drage } from "components/drop-zone/drage";
import Input from "components/input";
import Pagination from "components/pagination";
import { COMPANY_LISTING } from "constants/api";
import { Link } from "gatsby";
import Filterbtn from "components/filterBtn";
import Menu from "components/menu";
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { request } from "services/http-request";
import * as styles from "styles/pages/common.module.scss";
import {
  CompanyDataType,
  CompanyStatus,
  CompanyExtraDataType,
} from "type/company";
import cssVar from "utility/css-var";
import { debounce } from "utility/debounce";
import { findMatchingId } from "utility/find-matching-id";
import {
  CompanyFilter,
  DateFilter,
  List,
} from "../../components/pages/company/helper";
const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

type DropItemType = { id: number; section: CompanyStatus };

const Company = () => {
  const [data, setData] = useState<
    Record<CompanyStatus, CompanyExtraDataType[]>
  >({
    "upload info": [],
    "document review": [],
    verified: [],
    operational: [],
    rejected: [],
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
      const response = await request<CompanyDataType[]>({
        url: COMPANY_LISTING,
        params,
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

  async function updateData(
    item: DropItemType,
    to: CompanyStatus,
    index: number
  ) {
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
  }, [table]);

  useEffect(() => {
    fetchData();
  }, []);
  // width: 14.796rem;
  //
  return (
    <>
      <div className={styles.btnCont}>
        <div className="">
          <Link to="company-registration">
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
        <Filterbtn>
          <Menu title="Date">
            <DateFilter />
          </Menu>
          <Menu title="Company Type">
            <CompanyFilter />
          </Menu>
        </Filterbtn>
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
                {data[dropName].map((dragItem: CompanyExtraDataType) => {
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

export default Company;

// company
// {
//   "username": "c1@example.com",
//   "password": "Test@4321"
// }
