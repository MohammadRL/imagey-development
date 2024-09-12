import React from "react";
import FiltersLabels from "./FiltersLabels";
import RangeSlider from "./RangeSlider";

function CustomFilters() {
  const slider = [
    { label: "Contrast", defaultValue: 100, field: "contrast" },
    { label: "Brightness", defaultValue: 100, field: "brightness" },
    { label: "Saturation", defaultValue: 100, field: "saturate" },
    { label: "Sepia", defaultValue: 0, field: "sepia" },
    { label: "Gray Scale", defaultValue: 0, field: "gray" },
  ];
  return (
    <div>
      {slider.map((slide) => (
        <RangeSlider slide={slide} key={slide.field} labelName={slide.label} />
      ))}
    </div>
  );
}

export default CustomFilters;
