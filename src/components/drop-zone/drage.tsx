import React from "react";
import { useDrag } from "react-dnd";

type Props = {
  title: string;
  id: string | number;
  section: string;
  accept: string;
};

export function Drage({ title, id, section, accept }: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: accept,
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
