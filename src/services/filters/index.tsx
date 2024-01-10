import React from "react";
import Checkbox from "components/checkbox";
import { useAppContext } from "providers/app-provider";
import * as styles from "./styles.module.scss";
import { UseFormRegister } from "react-hook-form";
import { FilterT } from "type/filters";

type WorkTypeFilterProps = {
  setValue: (e: string) => void;
};

export const WorkTypeFilter = ({ setValue }: WorkTypeFilterProps) => {
  const { workTypes } = useAppContext();

  const Label = ({ title }: { title: string }) => {
    return <p className={styles.wtFilters}>{title}</p>;
  };

  return (
    <div className={styles.wtFiltersCont}>
      {workTypes?.map((item) => {
        return (
          <Checkbox
            key={item.id}
            id={item.title}
            label={<Label title={item.title} />}
            name="workType"
            value={item.title}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        );
      })}
    </div>
  );
};
