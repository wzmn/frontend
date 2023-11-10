import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import * as styles from "./styles.module.scss";

type DataProp = {
  label: string;
};

type color = "gray" | "white" | "transparent1" | "full-white";

type Props = {
  data: DataProp[];
  color?: color;
  placeholder?: string;
  asterisk?: boolean;
};

function varientHandler(varient: color = "transparent1") {
  switch (varient) {
    case "gray":
      return styles.gray;
    case "white":
      return styles.white;
    case "full-white":
      return styles.fullWhite;
    default:
      return styles.transparent1;
  }
}

export default function SelectBox({
  data,
  color,
  placeholder = "select",
  asterisk,
}: Props) {
  // const renderData = [{ label: placeholder }, ...data];
  const [selected, setSelected] = useState<DataProp>();

  return (
    <div className="w-full ">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 border ">
          <Listbox.Button
            className={`${styles.lstBoxBtn} ${varientHandler(color)}`}
          >
            <span className="block truncate">
              {selected?.label ?? placeholder}
              {!selected?.label && asterisk && (
                <span className="text-red-500">&nbsp;*</span>
              )}
            </span>
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
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 pr-4 ${
                    active ? "bg-white80 text-amber-900" : "text-gray-900"
                  }`
                }
                value=""
              ></Listbox.Option>
              {data?.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 pr-4 ${
                      active ? "bg-white80 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {/* {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      > */}
                  {item.label}
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
