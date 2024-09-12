import React from "react";
import DownloadAndSaveImage from "../components/DownloadAndSaveImage";
import ImageField from "../components/ImageField";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useEffect, useState, useContext } from "react";
import { imageContext } from "../App";
import EditWindow from "../components/EditWindow";

function ImageCenter() {
  const [recievedImage, setRecievedImage] = useState(null);
  const { imageID } = useParams();
  const navigate = useNavigate();
  const {
    toggleEditWindow,
    setToggleEditWindow,
    setImage,
    image,
    setinstaFilterIndex,
  } = useContext(imageContext);
  useEffect(() => {
    setinstaFilterIndex(0);
    if (imageID) {
      appwriteService.getImageRecord(imageID).then((image) => {
        if (image) {
          setRecievedImage(image);
        } else {
          navigate("/");
        }
      });
    } else {
      setRecievedImage(null);
      setImage(null);
    }
  }, []);
  return (
    <div className="image-center">
      <div className=" py-20">
        <div className=" flex flex-col justify-center md:flex-row items-center md:items-stretch ">
          <ImageField recievedImage={recievedImage} />
          <div className="p-2 flex items-start md:items-stretch md:flex-col w-fit gap-4  justify-center md:justify-around m-auto mt-2 md:m-0">
            {/* Filter Button */}
            <button
              className="relative inline-flex items-center justify-center  p-4 px-3 py-1.5 md:px-5 md:py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group cursor-pointer
              disabled:text-slate-400 disabled:cursor-not-allowed disabled:opacity-[10%] transition-all duration-1000"
              id="filters"
              onClick={(e) =>
                setToggleEditWindow({
                  toggle: true,
                  tool: e.currentTarget.id,
                })
              }
              disabled={image ? false : true}
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-gray-400 rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-gray-700 rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-orange-300 rounded-full blur-md"></span>
              </span>
              <span className="relative text-white">Filters</span>
            </button>
            {/* Crop Button */}
            <button
              className="relative px-3 py-1.5 md:px-6 md:py-3 font-bold text-white group
              disabled:text-slate-400 disabled:cursor-not-allowed
              disabled:opacity-[10%] transition-all duration-1000"
              id="crop"
              onClick={(e) =>
                setToggleEditWindow({
                  toggle: true,
                  tool: e.currentTarget.id,
                })
              }
              disabled={image ? false : true}
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-gray-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full border-4 border-white"></span>
              <span className="relative">Crop</span>
            </button>
            {/* Text To Image Button */}
            <button
              className="group relative inline-flex items-center justify-start overflow-hidden rounded-xl bg-gray-700 font-medium transition-all
              p-2 md:px-5 md:py-3"
              id="text-to-image"
              onClick={(e) =>
                setToggleEditWindow({
                  toggle: true,
                  tool: e.currentTarget.id,
                })
              }
            >
              <span className="absolute right-0 top-0 inline-block h-5 w-5 rounded bg-[#141414] transition-all duration-500 ease-in-out group-hover:-mr-2 md:group-hover:-mr-4 group-hover:-mt-2 md:group-hover:-mt-4">
                <span className="absolute right-0 top-0 h-5 w-5 -translate-y-1/2 translate-x-1/2 rotate-45 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 h-full w-full -translate-x-full translate-y-full rounded-2xl bg-[#141414] transition-all delay-200 duration-500 ease-in-out group-hover:mb-10 md:group-hover:mb-14 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white text-[12px] md:text-sm">
                Text To Image With{" "}
                <span className="font-embedCode md:text-lg">AI</span>
              </span>
            </button>
            ;
          </div>
        </div>
      </div>

      <DownloadAndSaveImage recievedImage={recievedImage} />

      {toggleEditWindow.toggle && <EditWindow />}
    </div>
  );
}

export default ImageCenter;
