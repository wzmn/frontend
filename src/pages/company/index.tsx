import Button from "components/button";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDrag, useDrop } from "react-dnd";
import Input from "components/input";
import SelectBox from "components/selectBox";
import * as styles from "./styles.module.scss";
import Pagination from "components/pagination";
const dataList = [
  { label: "Wade Cooper" },
  { label: "Arlene Mccoy" },
  { label: "Devon Webb" },
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const pg = [
  { label: "100" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
  { label: "1" },
];

const Company = () => {
  const [data, setData] = useState({
    pending: [
      {
        id: 1,
        title: "title1",
      },
      {
        id: 2,
        title: "title2",
      },
    ],
    approved: [
      {
        id: 3,
        title: "title3",
      },
      {
        id: 4,
        title: "title4",
      },
    ],
    rejected: [
      {
        id: 5,
        title: "title5",
      },
      {
        id: 6,
        title: "title6",
      },
    ],
  });

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
          title="Create Company"
          icon={<AiOutlinePlus />}
          className="flex-row-reverse"
        />

        <Input placeholder="Search" />

        {/* <div className="w-64">
          <SelectBox color="full-white" data={dataList} />
        </div> */}
      </div>

      <div className="flex gap-7 flex-wrap mb-5">
        <MyDropTarget
          handleDrop={handleDrop}
          section="pending"
          title="Pending"
          data={data.pending}
        />
        <MyDropTarget
          handleDrop={handleDrop}
          section="approved"
          title="Approved"
          data={data.approved}
        />
        <MyDropTarget
          handleDrop={handleDrop}
          section="rejected"
          title="Rejected"
          data={data.rejected}
        />
      </div>
      <Pagination />
    </>
  );
};

export default Company;

function DraggableComponent({ title, id, section }: any) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "company",
    item: { id, section },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div className={`border ${isDragging && "hidden"}`} ref={drag}>
      <p className="bg-white text-center py-2">{title}</p>
    </div>
  );
}

function MyDropTarget({ data, title, section, handleDrop }: any) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "company",
    drop: (item) => handleDrop(item, section),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`${styles.dropCont}   `}>
      <p className={styles.dropContTitle}>{title}</p>
      <div className={`${styles.content} ${isOver && styles.over}`}>
        {data?.map((item: any, index: number) => {
          return (
            <DraggableComponent
              section={section}
              key={item.id}
              id={item.id}
              title={item.title}
            />
          );
        })}
      </div>
    </div>
  );
}
