import React from "react";
import {LuTrash} from "react-icons/lu"
import { getInitials } from "../../utils/helper.js";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group m-2 md:m-4" onClick={onSelect}>
      <div className="rounded-lg p-3 lg:p-4 cursor-pointer relative" style={{ background: colors.bgcolor }}>
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-md flex items-center justify-center mr-3 lg:mr-4">
            <span className="text-sm lg:text-lg font-semibold text-black">{getInitials(role)}</span>
          </div>
          <div className="flex-grow min-w-0 pr-8 lg:pr-12">
            <div className="flex justify-between items-start">
              <div className="min-w-0 flex-1">
                <h2 className="text-sm lg:text-[17px] font-medium truncate pr-2">{role}</h2>
                <p className="text-xs text-gray-900 line-clamp-2 lg:line-clamp-1 mt-1 lg:mt-0 leading-tight">{topicsToFocus}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="hidden group-hover:flex items-center gap-1 lg:gap-3 text-xs text-rose-500 font-medium bg-rose-50 px-2 lg:px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-2 lg:top-0 right-2 lg:right-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash className="w-3 h-3" />
          <span className="hidden lg:inline">Delete</span>
        </button>
      </div>
      <div className="px-2 lg:px-3 pb-3">
        <div className="flex flex-wrap items-center gap-2 mt-3 lg:mt-4">
          <div className="text-[9px] lg:text-[10px] font-medium text-black px-2 lg:px-3 py-1 border-[0.5px] border-gray-900 rounded-full whitespace-nowrap">
            Exp: {experience}{experience == 1 ? "Y" : "Y"}
          </div>
          <div className="text-[9px] lg:text-[10px] font-medium text-black px-2 lg:px-3 py-1 border-[0.5px] border-gray-900 rounded-full whitespace-nowrap">
            {questions} Q&A
          </div>
          <div className="text-[9px] lg:text-[10px] font-medium text-black px-2 lg:px-3 py-1 border-[0.5px] border-gray-900 rounded-full whitespace-nowrap">
            Updated: {lastUpdated}
          </div>
        </div>
        <p className="text-[11px] lg:text-[12px] text-gray-500 font-medium line-clamp-2 mt-3 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default SummaryCard;