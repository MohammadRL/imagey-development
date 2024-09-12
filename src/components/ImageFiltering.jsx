import React, { useContext, useRef } from "react";
import { imageContext } from "../App";
import instaFilterValues from "../insta-filters/instaFilterValues";

import Img from "./Img";
function ImageFiltering() {

  const { image, instaFilterIndex } =
    useContext(imageContext);
  return (
    <div className="flex justify-center  md:w-[75%]">
      <div className="bg-gray-200 flex justify-center items-center rounded-md min-h-60 max-h-[70vh] overflow-hidden">
        {image && (
          <Img
            instaFilterIndex={instaFilterIndex}
            instaFilterValues={instaFilterValues}
            image={image}
          />
        )}
      </div>
    </div>
  );
}

export default ImageFiltering;
