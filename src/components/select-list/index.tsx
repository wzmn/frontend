import React, { Fragment, useEffect, useRef, useState } from "react";
import * as styles from "./styles.module.scss";
const data = [
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1e8.svg",
    country: "Ascension Island",
    code: "ac",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1e9.svg",
    country: "Andorra",
    code: "ad",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1ea.svg",
    country: "United Arab Emirates",
    code: "ae",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1eb.svg",
    country: "Afghanistan",
    code: "af",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1ec.svg",
    country: "Antigua & Barbuda",
    code: "ag",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1ee.svg",
    country: "Anguilla",
    code: "ai",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1f1.svg",
    country: "Albania",
    code: "al",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1f2.svg",
    country: "Armenia",
    code: "am",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1f4.svg",
    country: "Angola",
    code: "ad",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1f6.svg",
    country: "Antarctica",
    code: "aq",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1f7.svg",
    country: "Argentina",
    code: "ar",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1f8.svg",
    country: "American Samoa",
    code: "as",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1f9.svg",
    country: "Austria",
    code: "at",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1fa.svg",
    country: "Australia",
    code: "au",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1fc.svg",
    country: "Aruba",
    code: "aw",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1fd.svg",
    country: "Åland Islands",
    code: "ax",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1ff.svg",
    country: "Azerbaijan",
    code: "az",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e7-1f1e6.svg",
    country: "Bosnia & Herzegovina",
    code: "ba",
  },
  {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e7-1f1e7.svg",
    country: "Barbados",
    code: "bb",
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

export function Dropdown({ data, handleToggle, setState, state }: any) {
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
