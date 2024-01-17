import React, { Fragment, useEffect, useRef, useState } from "react";
import * as styles from "./styles.module.scss";
const data = [
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1fa.svg",
    country: "Australia",
    code: "au",
  },
  {
    flag: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg",
    country: "United States",
    code: "us",
  },
];

type Props = {
  outerLimit?: number;
};

const SelectList = ({ outerLimit = 5 }: Props) => {
  const selectRef = useRef<HTMLInputElement[] | null[]>([]);
  const [toggle, setToggle] = useState(false);
  const [state, setState] = useState<any>({});

  const outerCircles = data.slice(0, outerLimit);
  const extraList = data.slice(outerLimit);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className={`${styles.selectListCont}`}>
      {outerCircles.map((item, index) => {
        return (
          <Fragment key={item.code}>
            <input
              ref={(el) => (selectRef.current[index] = el)}
              type="checkbox"
              checked={state[item.code]}
            />
            <div
              style={{ zIndex: data.length - index }}
              className={styles.checkbox}
              onClick={() => {
                setState((prev: any) => ({
                  ...prev,
                  [item.code]: !selectRef.current[index]!.checked,
                }));
                // selectRef.current[index]!.checked =
                //   !selectRef.current[index]!.checked;
              }}
            >
              <img src={item.flag} alt="" />
            </div>
          </Fragment>
        );
      })}
      {extraList.length > 0 && (
        <div
          style={{ background: "gray", zIndex: 0 }}
          className={styles.extra}
          onClick={(e) => {
            handleToggle();
          }}
        >
          +{extraList.length}
        </div>
      )}
      {toggle && (
        <Dropdown
          data={extraList}
          handleToggle={handleToggle}
          setState={setState}
          state={state}
        />
      )}
    </div>
  );
};

function Dropdown({ data, handleToggle, setState, state }: any) {
  const elRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLInputElement[] | null[]>([]);

  function eventHandler(e: MouseEvent) {
    e.preventDefault();
    const node = e.target as Node | null;
    if (
      elRef.current !== node &&
      !elRef.current!.contains(node) &&
      node !== elRef.current?.previousSibling
    ) {
      handleToggle();
    }
  }
  useEffect(() => {
    document.addEventListener("click", eventHandler, true);
    return () => {
      document.removeEventListener("click", eventHandler, true);
    };
  }, []);

  return (
    <div ref={elRef} className={styles.extraList}>
      {data?.map((item: any, index: number) => {
        return (
          <label
            key={item.code}
            className={styles.item}
            htmlFor={String(item.code)}
            onClick={(e) => {
              setState((prev: any) => ({
                ...prev,
                [item.code]: !listRef.current[index]?.checked,
              }));
            }}
          >
            <input
              ref={(el) => (listRef.current[index] = el)}
              id={String(item.code)}
              type="checkbox"
              checked={state[item.code]}
            />
            <div className={styles.imgCont}>
              <img src={item.flag} alt="" />
            </div>
            <p className="">{item.country}</p>
          </label>
        );
      })}
    </div>
  );
}

export default SelectList;
