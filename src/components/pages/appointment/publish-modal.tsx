import Input from "components/input";
import Label from "components/label";
import Radio from "components/radio";
import React from "react";
import * as locStyles from "./styles.module.scss";

const PublishModal = () => {
  return (
    <div className="px-10">
      <div className="flex gap-4">
        <Radio label="UP" value="up" name="bidtype" />
        <Radio label="DOWN" value="down" name="bidtype" />
        <Radio label="BID ONLY" value="bid" name="bidtype" />
      </div>
      <div className={locStyles.publishGrid}>
        <div className="">
          <Label title="Start Date" />

          <Input type="date" />
        </div>
        <div className="">
          <Label title="End Date" />

          <Input type="date" />
        </div>
        <div className="">
          <Label title="Start Time" />

          <Input type="time" />
        </div>
        <div className="">
          <Label title="End Time" />
          <label htmlFor="end_time">
            <Input id="end_time" type="time" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
