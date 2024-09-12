import React, { useContext, useState } from "react";
import domtoimage from "dom-to-image";
import { imageContext } from "../App";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import instaFilterValues from "../insta-filters/instaFilterValues";
import LoadingButton from "./LoadingButton";
import UploaderIcon from "./UploaderIcon";
function DownloadAndSaveImage({ recievedImage }) {
  const userData = useSelector((state) => state.auth.userData);
  const [loader, setLoader] = useState(false);
  const { image, uploadedImageFile, instaFilterIndex, customFilters } =
    useContext(imageContext);

  const createImageforSave = () => {
    const imageForSave = new Image();
    imageForSave.src = image;
    imageForSave.className = `${instaFilterValues[instaFilterIndex].class} absolute z-[-10000] top-0 left-0 max-w-[1920px] max-h-[1080px]`;
    imageForSave.style = `${
      instaFilterIndex == 0
        ? `filter: contrast(${customFilters.contrast}%) brightness(${customFilters.brightness}%) saturate(${customFilters.saturate}%) sepia(${customFilters.sepia}%) grayScale(${customFilters.gray}%)`
        : null
    }`;
    document.body.appendChild(imageForSave);

    console.log(imageForSave);
    return imageForSave;
  };

  const handleDownloadImage = async () => {
    const imageForSave = createImageforSave();
    setLoader(true);

    document.body.classList.add("overflow-hidden");
    await domtoimage.toPng(imageForSave).then(function (dataUrl) {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = uploadedImageFile.current.files[0]
        ? uploadedImageFile.current.files[0].name
        : "image.png";
      link.click();
    });

    setLoader(false);

    document.body.classList.remove("overflow-hidden");
    document.body.removeChild(imageForSave);
  };
  const handleSaveToCloud = async () => {
    setLoader(true);
    document.body.classList.add("overflow-hidden");

    if (recievedImage) {
      let imageFile;
      const imageForSave = createImageforSave();
      await domtoimage.toBlob(imageForSave).then(function (imageBlob) {
        imageFile = new File(
          [imageBlob],
          uploadedImageFile.current.files[0]
            ? uploadedImageFile.current.files[0].name.replace(/\.[^/.]+$/, "")
            : "imageOnCloud",
          {
            type: imageBlob.type,
          }
        );
      });
      document.body.removeChild(imageForSave);
      const file = imageFile
        ? await appwriteService.uploadFile(imageFile)
        : null;

      if (file) {
        appwriteService.deleteFile(recievedImage.imageName);
      }
      const uploadedImage = await appwriteService.updateRecord(
        recievedImage.$id,
        {
          imageName: file ? file.$id : undefined,
        }
      );
      if (uploadedImage) {
      }
    } else {
      let imageFile;
      const imageForSave = createImageforSave();

      await domtoimage.toBlob(imageForSave).then(function (imageBlob) {
        imageFile = new File(
          [imageBlob],
          uploadedImageFile.current.files[0]
            ? uploadedImageFile.current.files[0].name.replace(/\.[^/.]+$/, "")
            : "imageOnCloud",
          {
            type: imageBlob.type,
          }
        );
      });

      const file = await appwriteService.uploadFile(imageFile);
      document.body.removeChild(imageForSave);
      if (file) {
        const fileId = file.$id;
        const uploadedImage = await appwriteService.createImageRecord({
          userID: userData.$id,
          imageName: fileId,
        });

        if (uploadedImage) {
        }
      }
    }
    setLoader(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div className="flex justify-center ">
      <LoadingButton
        handleDownloadImage={handleDownloadImage}
        btText={loader ? `loading` : "download"}
        disabled={image ? false : true}
      />

      <LoadingButton
        handleSaveToCloud={handleSaveToCloud}
        btText={
          loader ? `loading` : recievedImage ? "Update Image" : "Save To Cloud"
        }
        disabled={image ? false : true}
      />
      {loader && (
        <div
          className={` absolute top-0 left-0 w-full h-full bg-[#131315e3] flex justify-center items-center text-slate-50 font-bold
            ${
              loader ? "opacity-100" : "opacity-0"
            } transition-opacity delay-500`}
        >
          <UploaderIcon />
          Loading
        </div>
      )}
    </div>
  );
}

export default DownloadAndSaveImage;
