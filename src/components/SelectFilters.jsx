import React, { useContext } from "react";
import instaFilterValues from "../insta-filters/instaFilterValues";
import { imageContext } from "../App";
function SelectFilters() {
  const { instaFilterIndex, setinstaFilterIndex, image } =
    useContext(imageContext);

  function handleChange(e) {
    console.log(e);

    setinstaFilterIndex(e.target.parentElement.id);

    console.log(instaFilterIndex);
  }
  return (
    <div className="w-full flex-1 md:overflow-y-auto">
      <div className="w-full max-h-full p-2 flex items-start gap-2 md:block overflow-x-auto md:overflow-x-visible ">
        {instaFilterValues.map((filter, i) => (
          <div
            key={filter.name}
            className={`w-full  my-2 cursor-pointer  transition-all duration-700 rounded-md border-solid border-slate-200 sm:overflow-hidden relative max-h-[150px]
              md:flex md:justify-center md:items-center`}
            id={i}
            onClick={handleChange}
          >
            <img
              src={image}
              className={`${filter.class} w-[65px] max-h-full md:w-[300px] md:w-full h-fit md:h-auto object-contain`}
            />
            <span
              className=" text-slate-100 font-playWrite inline-block mt-1
            absolute bottom-0 left-0 w-full p-2 text-center bg-[#0f131987]
            text-[12px] md:text-sm"
            >
              {filter.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectFilters;
