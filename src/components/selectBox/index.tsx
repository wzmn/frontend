import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import * as styles from "./styles.module.scss";

type DataProp = {
  name: string;
};

type color = "gray" | "white";

type Props = {
  data: DataProp[];
  color?: color;
};

function varientHandler(varient: color = "white") {
  switch (varient) {
    case "gray":
      return styles.gray;
    case "white":
      return styles.white;
    default:
      styles.white;
  }
}

export default function SelectBox({ data, color }: Props) {
  const renderData = [{ name: "select" }, ...data];
  const [selected, setSelected] = useState<DataProp>(renderData[0]);

  return (
    <div className="  w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`${styles.lstBoxBtn} ${varientHandler(color)} `}
          >
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IoIosArrowDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`${styles.selectBoxScrollBar} z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm`}
            >
              {renderData?.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-white80 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {/* {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      > */}
                  {person.name}
                  {/* </span> */}
                  {/* {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                  {/* </> */}
                  {/* //   )} */}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
