import React from "react";
import { useDrag } from "react-dnd";
import * as styles from "./styles.module.scss";

export type DragProps = {
  id: number;
  section: string;
  accept: string;
  isEnabled?: boolean;
  loading: boolean;
  children: JSX.Element;
};

export function Drage({ children, id, section, accept, loading }: DragProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: accept,
      item: { id, section },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      // canDrag(monitor) {
      //   return !!isEnabled;
      // },
    }),
    [section, accept]
  );

  return (
    <div
      className={`border ${isDragging && "hidden"} ${styles.card} ${
        loading ? styles.loading : ""
      } `}
      ref={drag}
    >
      {/* {JSON.stringify(isEnabled)} */}
      <div className="card">{children}</div>
    </div>
  );
}
