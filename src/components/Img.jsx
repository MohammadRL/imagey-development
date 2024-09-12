import React, { useContext } from "react";
import { imageContext } from "../App";

function Img({ image, instaFilterIndex, instaFilterValues }) {
  const { imageRef, customFilters } = useContext(imageContext);
  return (
    <>
      <img
        src={image}
        className={`w-full h-full object-contain  ${instaFilterValues[instaFilterIndex].class}`}
        ref={imageRef}
        style={
          instaFilterIndex == 0
            ? {
                filter: `contrast(${customFilters.contrast}%) brightness(${customFilters.brightness}%) saturate(${customFilters.saturate}%) sepia(${customFilters.sepia}%) grayScale(${customFilters.gray}%)`,
              }
            : null
        }
      />
    </>
  );
}

export default Img;
