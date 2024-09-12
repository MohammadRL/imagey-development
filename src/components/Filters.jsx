import React from "react";
import { useRef, useState } from "react";

import SelectFilters from "./SelectFilters";
import CustomFilters from "./custom-filter/CustomFilters";

function Filters() {
  const [clicked, setClicked] = useState(true);
  const instaRef = useRef(null);
  const customRef = useRef(null);
  function handleClick(e) {
    e.target.parentElement.id === "insta-filters"
      ? setClicked(true)
      : setClicked(false);
  }
  return (
    <div className="bg-transparent w-full md:w-[25%] rounded-md p-1 border-[2px] border-slate-400 border-solid max-h-[80vh] flex flex-col md:overflow-hidden">
      <div className="flex  font-bold justify-evenly items-center gap-1 basis-[15%] p-1">
        <button
          id="insta-filters"
          className={`relative flex items-center justify-center overflow-hidden font-medium text-indigo-600  w-10 h-10 md:w-20 md:h-20  shadow-2xl group cursor-pointer 
               transition-all duration-1000 ${
                 clicked ? "opacity-100  rounded-full" : "opacity-20 rounded-lg"
               }`}
          onClick={handleClick}
          ref={instaRef}
        >
          <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-gray-400 rounded-full blur-md ease"></span>
          <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
            <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-gray-700 rounded-full blur-md"></span>
            <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-orange-300 rounded-full blur-md"></span>
          </span>
          <span className="relative text-white text-[12px]">Insta Filters</span>
        </button>

        <button
          id="custom-filters"
          className={`relative flex items-center justify-center overflow-hidden font-medium text-indigo-600 w-10 h-10 md:w-20 md:h-20 shadow-2xl group cursor-pointer
          transition-all duration-1000
          ${!clicked ? "opacity-100  rounded-full" : "opacity-20 rounded-lg"}`}
          onClick={handleClick}
          ref={customRef}
        >
          <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-gray-400 rounded-full blur-md ease"></span>
          <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
            <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-gray-700 rounded-full blur-md"></span>
            <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-orange-300 rounded-full blur-md"></span>
          </span>
          <span className="relative text-white text-[12px]">Custom Filter</span>
        </button>
      </div>

      {clicked ? <SelectFilters /> : <CustomFilters />}
    </div>
  );
}

export default Filters;
