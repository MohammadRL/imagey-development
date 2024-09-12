import React, { useContext, useState, useEffect } from "react";
import { imageContext } from "../../App";
function RangeSlider({ slide }) {
  const { customFilters, setCustomFilters, setinstaFilterIndex } =
    useContext(imageContext);
  const { label, defaultValue, field } = slide;
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setCustomFilters({ ...customFilters, [field]: value });
  }, [value]);
  const handleSliderValue = (e) => {
    setValue(e.target.value);
    setinstaFilterIndex(0);
  };
  return (
    <div>
      <label
        htmlFor="default-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <input
        id={field}
        type="range"
        value={value}
        onChange={handleSliderValue}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        max={200}
      />
    </div>
  );
}

export default RangeSlider;
