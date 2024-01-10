import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import * as commonStyles from "./common.module.scss";
import { GoPencil } from "react-icons/go";
import { IoTrashBinOutline } from "react-icons/io5";

export function ActionBtn() {
  return (
    <>
      <div className="">
        <p className="font-bold text-center text-sm mt-2">Actions</p>
        {/* <div className="flex gap-3 mt-3 items-center justify-center"> */}
        <div className="flex justify-between gap-4 px-8 py-1 mt-4 cursor-pointer hover:bg-slate-400/30">
          <span className="icon ">
            <GoPencil className={commonStyles.actionSvg} />
          </span>
          <p className="text-xs">Edit</p>
        </div>
        <div className="flex justify-between gap-4 px-8 py-1 mt-2 cursor-pointer hover:bg-slate-400/30">
          <span className="icon ">
            <IoTrashBinOutline className={commonStyles.actionSvg} />
          </span>
          <p className="text-xs">Delete</p>
        </div>
      </div>
    </>
  );
}

type SortCompanyFilterT = {
  data: {
    label: string;
    value: string;
  }[];
  setValue: (e: string) => void;
  defaultChecked?: string;
};

export function SortCompanyFilter({
  data,
  setValue,
  defaultChecked,
}: SortCompanyFilterT) {
  return (
    <div className={commonStyles.sortCont}>
      {data.map((item) => {
        return (
          <div key={item.value} className={commonStyles.filter}>
            <label className="">
              <input
                defaultChecked={defaultChecked === item.value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                type="radio"
                name="companyType"
                id=""
                value={item.value}
              />
              <span className="">{item.label}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
