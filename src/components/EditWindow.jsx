import React, { useContext } from "react";
import Filters from "./Filters";
import { imageContext } from "../App";
import ImageCropper from "./ImageCropper";
import ImageFiltering from "./ImageFiltering";
import TextToImage from "../pages/TextToImage";
function EditWindow() {
  const { toggleEditWindow, setToggleEditWindow, filteredImage } =
    useContext(imageContext);
  return (
    <div
      className="relative z-[60]"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center max-h-[80vh]">
          <div className="relative w-[95%] sm:w-[80%] h-fit max-h-[90vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all overflow-y-auto">
            <div className="px-5 py-4 flex flex-col sm:flex-row gap-2 h-full">
              {toggleEditWindow.tool === "filters" ? (
                <>
                  <ImageFiltering />
                  <Filters />
                </>
              ) : toggleEditWindow.tool === "crop" ? (
                <ImageCropper />
              ) : (
                <TextToImage />
              )}
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none fixed top-2 right-4
                w-16 h-16"
                onClick={() => {
                  setToggleEditWindow(false);
                  console.log(filteredImage);
                }}
              >
                <svg
                  className="w-full h-full "
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                    stroke="#1F2937"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                    stroke="#767171"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditWindow;
