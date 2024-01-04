import React from "react";
import Checkbox from "components/checkbox";
import { useAppContext } from "providers/app-provider";
import * as styles from "./styles.module.scss";
import { UseFormRegister } from "react-hook-form";
import { FilterT } from "type/filters";

type WorkTypeFilterProps = {
  register: UseFormRegister<Pick<FilterT, "workType">>;
};

export const WorkTypeFilter = ({ register }: WorkTypeFilterProps) => {
  const { workTypes } = useAppContext();

  const Label = ({ title }: { title: string }) => {
    return <p className={styles.wtFilters}>{title}</p>;
  };

  return (
    <div className={styles.wtFiltersCont}>
      {workTypes?.map((item) => {
        return (
          <Checkbox
            id={item.title}
            label={<Label title={item.title} />}
            {...register("workType")}
            value={item.id}
          />
        );
      })}
    </div>
  );
};
