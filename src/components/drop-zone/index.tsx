import React, { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import * as styles from "./styles.module.scss";
import { Drage } from "./drage";

type Props = {
  data: any;
  title: string;
  section: string;
  accept: string;
  titleRingColor?: string;
  handleDrop: (p1: any, p2: string) => void;
  children: JSX.Element;
};

export function Drop({
  title,
  section,
  handleDrop,
  accept,
  titleRingColor,
  children,
}: Props) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: accept,
    drop: (item) => handleDrop(item, section),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`${styles.dropCont}   `}>
      <p
        style={{ borderColor: titleRingColor }}
        className={styles.dropContTitle}
      >
        {title}
      </p>
      <div className={`${styles.content} ${isOver && styles.over}`}>
        {children}
        {/* {data?.map((item: any, index: number) => {
          return (
            <Drage
              key={item.id} //you can`t use index from map id should be unique
              accept={accept}
              section={section}
              id={item.id}
              title={item.title}
            />
          );
        })} */}
      </div>
    </div>
  );
}
