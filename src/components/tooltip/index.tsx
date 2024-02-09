import React from "react";

const ToolTip = ({
  children,
  label,
}: {
  children: JSX.Element;
  label?: string;
}) => {
  return (
    <div className="relative group w-fit">
      {children}
      {label !== "" && (
        <span className="z-50 w-full absolute  scale-0 transition-all left-1/2 -translate-x-1/2 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
          {label}
        </span>
      )}
    </div>
  );
};

export default ToolTip;
