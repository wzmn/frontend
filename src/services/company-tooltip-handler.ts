import React from "react";
import companyFilter from "./company-list-filter-handler";

export default function companyListIdTooltipHandler() {
  const companyFilterId = companyFilter();
  if (companyFilterId.length > 1) return "Please Select only 1 company";
  else if (companyFilterId.length === 0)
    return "Please Select atleast 1 company";
  else return "";
}
