import React, { useState } from "react";
import Button from "components/button";
import { AiOutlinePlus } from "react-icons/ai";
import Input from "components/input";
import SelectBox from "components/selectBox";
import Pagination from "components/pagination";
import { Drop } from "components/drop-zone";
import cssVar from "utility/css-var";
import { demoDndData } from "constants/demo-dnd-data";
import * as styles from "styles/pages/common.module.scss";
const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const Employees = () => {
  const [data, setData] = useState(demoDndData);

  const drop1Color = cssVar("--color-blue_dress");
  const drop2Color = cssVar("--color-candlelight");
  const drop3Color = cssVar("--color-aqua_blue");

  function handleDrop(item: any, section: string) {
    if (item.section === section) return;

    const dt: any = { ...data };
    let idx;
    dt[item.section].some((itm: any, key: any) => {
      console.log(item.id, itm.id);
      if (item.id === itm.id) {
        idx = key;
        return true;
      }
    });

    if (idx !== undefined) {
      const pop = dt[item.section].splice(idx, 1)[0];
      dt[section].unshift(pop);

      setData(() => dt);
    }
  }

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <div className={styles.btnCont}>
        <Button
          title="Create Employee"
          icon={<AiOutlinePlus />}
          className="flex-row-reverse"
        />

        <Input placeholder="Search" />

        <div className="w-64">
          <SelectBox color="full-white" data={dataList} />
        </div>
      </div>

      <div className={styles.tableCont}>
        <Drop
          titleRingColor={drop1Color}
          accept="company"
          handleDrop={handleDrop}
          section="auditor"
          title="AUDITOR"
          data={data.auditor}
        />
        <Drop
          titleRingColor={drop2Color}
          accept="company"
          handleDrop={handleDrop}
          section="admin"
          title="ADMIN"
          data={data.admin}
        />
        <Drop
          titleRingColor={drop3Color}
          accept="company"
          handleDrop={handleDrop}
          section="manager"
          title="MANAGER"
          data={data.manager}
        />

        <Drop
          titleRingColor={drop3Color}
          accept="company"
          handleDrop={handleDrop}
          section="agent"
          title="AGENT"
          data={data.agent}
        />
        <Drop
          titleRingColor={drop3Color}
          accept="company"
          handleDrop={handleDrop}
          section="fieldworkar"
          title="FIELDWORKER"
          data={data.fieldworkar}
        />
      </div>
      <Pagination />
    </>
  );
};

export default Employees;
