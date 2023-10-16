import SelectBox from "components/selectBox";
import React from "react";

const data = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const AddEditCompany = () => {
  return (
    <>
      <SelectBox data={data} />
    </>
  );
};

export default AddEditCompany;
