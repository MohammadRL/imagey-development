import React, { useEffect, useRef, useContext } from "react";
import { imageContext } from "../App";
import instaFilterValues from "../insta-filters/instaFilterValues";
import "../insta-filters/instagram.min.css";
import appwriteService from "../appwrite/config";
import Img from "./Img";
function ImageField({ recievedImage }) {
  const { instaFilterIndex, image, setImage, uploadedImageFile } =
    useContext(imageContext);

  const uploadFileRef = useRef(null);

  function handleClick() {
    uploadedImageFile.current && uploadedImageFile.current.click();
  }
  function handleChange() {
    console.log(uploadedImageFile.current.files[0]);

    uploadedImageFile.current.files[0] &&
      setImage(URL.createObjectURL(uploadedImageFile.current.files[0]));
  }
  useEffect(() => {
    recievedImage && !uploadedImageFile.current.files[0]
      ? setImage(appwriteService.getFilePreview(recievedImage.imageName))
      : null;
  }, [recievedImage, uploadedImageFile]);

  return (
    <>
      <div
        className="bg-gray-200 w-[90%] md:w-[60%] flex justify-center items-center cursor-pointer rounded m-auto md:m-0 md:mr-6 min-h-[50vh] max-h-[55vh] md:max-h-[65vh] overflow-hidden"
        onClick={handleClick}
      >
        {image ? (
          <Img
            instaFilterIndex={instaFilterIndex}
            instaFilterValues={instaFilterValues}
            image={image}
          />
        ) : (
          <p className="text-center">Upload Image</p>
        )}
        <input
          type="file"
          name="image"
          hidden
          ref={uploadedImageFile}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default ImageField;
