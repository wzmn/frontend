import React from "react";
import { useDrag } from "react-dnd";

type Props = {
  id: string | number;
  section: string;
  accept: string;
  children: JSX.Element;
};

export function Drage({ children, id, section, accept }: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: accept,
    item: { id, section },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div className={`border ${isDragging && "hidden"}`} ref={drag}>
      <div className="bg-white text-center py-2">{children}</div>
    </div>
  );
}
