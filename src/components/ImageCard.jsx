import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import "../BrowseImages.css";
function ImageCard({ $id, imageName }) {
  return (
    <>
      <Link
        to={`/imagey/image/${$id}`}
        className="border-[15px] md:border-[30px] border-slate-50 sm:basis-[25%] m-3 grow md:grow-0"
      >
        <div className="w-full">
          <img
            src={appwriteService.getFilePreview(imageName)}
            alt={$id}
            className="w-full "
          />
        </div>
      </Link>
    </>
  );
}

export default ImageCard;
