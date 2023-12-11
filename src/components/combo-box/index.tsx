import { Combobox, Transition } from "@headlessui/react";
import React, { ChangeEvent, Fragment } from "react";
import { IoIosArrowDown } from "react-icons/io";
import * as styles from "./styles.module.scss";

type Data = {
  [keyof in string]: any;
} & {
  label: string;
};

type ComboBoxT = React.InputHTMLAttributes<HTMLInputElement> & {
  data: Data[];
  value: string;
  handleSelect: (e: any) => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ComboBox = (props: ComboBoxT) => {
  const { data, value, handleSelect, handleInput } = props;
  return (
    <div className=" z-50 w-full">
      <Combobox value={value} onChange={handleSelect}>
        <div className="relative mt-1">
          <div className={styles.boxInputCont}>
            <Combobox.Input
              {...props}
              className={styles.boxInput}
              displayValue={() => value}
              onChange={handleInput}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <IoIosArrowDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            //   afterLeave={() => setValue("")}
          >
            <Combobox.Options className={styles.boxOptions}>
              {data?.length === 0 && value !== "" ? (
                <div className={styles.option}>Nothing found.</div>
              ) : (
                data?.map((item) => (
                  <Combobox.Option
                    key={item.label}
                    className={({ active }) =>
                      `${styles.option} ${active && styles.active}
                        }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.label}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default ComboBox;
