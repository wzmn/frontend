import { Combobox, Transition } from "@headlessui/react";
import React, {
  ChangeEvent,
  ForwardedRef,
  Fragment,
  forwardRef,
  useState,
} from "react";
import { IoIosArrowDown } from "react-icons/io";
import * as styles from "./styles.module.scss";

export type ComboBoxDataT = Partial<
  {
    label: string;
  } & {
    [keyof in string]: any;
  }
>;

type ComboBoxT<T> = React.InputHTMLAttributes<HTMLInputElement> & {
  data: ComboBoxDataT[];
  label?: string;
  handleSelect?: (e: T & ComboBoxDataT) => void;
  // handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ComboBox = forwardRef(
  <T extends unknown>(
    props: ComboBoxT<T>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { data, label, handleSelect } = props;
    const [inputLabel, setInputLabel] = useState<string>();

    const filterProps = JSON.parse(JSON.stringify(props));
    delete filterProps["data"];
    return (
      <div className="z-50 w-full">
        <Combobox
          value={inputLabel}
          onChange={(e) => {
            const data = e as any as ComboBoxDataT;
            setInputLabel(data.label);
            if (handleSelect) handleSelect(e as any);
          }}
        >
          <div className="relative mt-1">
            <div className={styles.boxInputCont}>
              <Combobox.Button className="w-full">
                <Combobox.Input
                  {...filterProps}
                  ref={ref}
                  autoComplete="off"
                  className={styles.boxInput}
                  // displayValue={() => value ?? ""}
                />
              </Combobox.Button>
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
                {data?.length === 0 ? (
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
  }
);

export default ComboBox as <T extends unknown>(
  props: ComboBoxT<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => JSX.Element;
