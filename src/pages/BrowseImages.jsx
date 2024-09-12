import React from "react";
import appwriteService from "../appwrite/config";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../components/Container";
import ImageCard from "../components/ImageCard";
import { useSelector } from "react-redux";
import "../BrowseImages.css";
function BrowseImages() {
  const [images, setImages] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService.getImagesRecords(userData.$id).then((images) => {
      if (images) {
        setImages(images.documents);
      }
    });
  }, []);
  if (images.length === 0) {
    return (
      <div className="w-full py-8 overflow-hidden">
        <Container>
          <div className="flex justify-center items-center text-lg w-full absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 ">
            <h1 className="text-slate-50">
              You Don't Have Any Images On The Cloud Yet...
            </h1>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="mt-20">
      <Container>
        <div className="flex  flex-wrap items-center justify-evenly ">
          {images.map((image) => (
            <ImageCard {...image} key={image.$id} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default BrowseImages;
