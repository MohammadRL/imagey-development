import { useContext, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "../setCanvasPreview";
import { imageContext } from "../App";
import instaFilterValues from "../insta-filters/instaFilterValues";
const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");
  const { image, setImage, setToggleEditWindow, instaFilterIndex } =
    useContext(imageContext);

  const onSelectFile = (e) => {
    const file = image;
    if (!file) return;

    const imageElement = new Image();

    imageElement.src = image;

    imageElement.addEventListener("load", (e) => {
      if (error) setError("");
      const { naturalWidth, naturalHeight } = e.currentTarget;
      if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
        setError("Image must be at least 150 x 150 pixels.");
        return;
      }
    });
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {image && (
        <div className="flex  flex-col items-center justify-center w-full">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              className={`${instaFilterValues[instaFilterIndex].class}`}
              ref={imgRef}
              src={image}
              crossOrigin="anonymous"
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <button
            className="relative px-6 py-3 font-bold text-white group
              disabled:text-slate-400 disabled:cursor-not-allowed
              disabled:opacity-[10%] transition-all duration-1000 mt-2
              "
            onClick={() => {
              setCanvasPreview(
                imgRef.current, 
                previewCanvasRef.current, 
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              setImage(dataUrl);
              setToggleEditWindow({ toggle: false });
            }}
          >
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-3 translate-y-2 bg-gray-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full border-4 border-white"></span>
            <span className="relative">Crop Image</span>
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};
export default ImageCropper;
