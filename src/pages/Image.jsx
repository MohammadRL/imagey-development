import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import appwriteService from "../appwrite/config";
import Button from "../components/Button";
import Container from "../components/Container";

import { useSelector } from "react-redux";

function Image() {
  const [image, setImage] = useState(null);
  const { imageID } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = image && userData ? image.userID === userData.$id : false;

  useEffect(() => {
    if (imageID) {
      appwriteService.getImageRecord(imageID).then((image) => {
        if (image) {
          setImage(image);
        } else {
          navigate("/imagey/");
        }
      });
    }
  }, [imageID, navigate]);
  const deleteRecord = () => {
    appwriteService.deleteRecord(image.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(image.imageName);
        navigate("/imagey/");
      }
    });
  };
  return image ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-around items-center md:items-start md:mb-4 md:mt-12 relative gap-2 h-[80vh] md:h-fit">
          <img
            src={appwriteService.getFilePreview(image.imageName)}
            alt={image.imageName}
            className="rounded-xl max-w-[90vw] max-h-[50vh] md:max-w-[60vw] md:max-h-[80vh] min-w-[40%]"
          />
          {isAuthor && (
            <div className=" flex flex-col gap-2 justify-center  mt-3 w-[30%] font-bold ">
              <Link to={`/imagey/image-center/${image.$id}`}>
                <Button bgColor="bg-gray-500" className="mr-3 block w-full">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deleteRecord}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Image;
