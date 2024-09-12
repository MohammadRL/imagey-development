import React, { useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { imageContext } from "../App";
import Input from "../components/Input";
import Button from "../components/Button";
function TextToImage() {
  const { genImage, setGenImage, setToggleEditWindow, setImage } =
    useContext(imageContext);
  const { register, handleSubmit } = useForm();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const getImage = async (data) => {
    const form = new FormData(formRef.current);
    console.log("start");
    setLoading(true);
    await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key":
          "61d4e95fa1a16776bb6ea9ff6256b238673c0d6fdbf90ef67ce59a24ed4ce7aee49955beac925299be55967d6afcc808",
      },
      body: form,
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        //buffer here is a binary representation of the returned image
        console.log(buffer);
        let typedArray = new Uint8Array(buffer);
        const stringChar = typedArray.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, "");
        let base64String1 = btoa(stringChar);
        setGenImage(`data:image/png;base64, ${base64String1}`);
      });
    setLoading(false);
  };
  function clickBtn() {
    console.log("clickeddd");
    setImage(genImage);
    setToggleEditWindow(false);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <form
          onSubmit={handleSubmit(getImage)}
          ref={formRef}
          className="flex flex-col items-center self-start w-full"
        >
          <Input
            label="Text To Image : "
            placeholder="Enter Text That You Want To Be An Image"
            type="text"
            {...register("prompt", {
              required: true,
            })}
            className="flex-1 "
          />

          <Button
            type="submit"
            className={` mt-4 ${
              loading
                ? "disabled:opacity-0 disabled:cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            textColor="text-[#eee]"
            bgColor="bg-[#242529]"
            disabled={loading ? true : false}
          >
            Generate
          </Button>
        </form>
        <br />
        {genImage && (
          <div className="w-full">
            <img src={genImage} alt="Gnerated Image" className="w-full" />
            <div className="w-full">
              <Button
                className=" mt-4 mr-auto ml-auto block border-[2px] border-solid border-[#eee]"
                textColor="text-[#eee]"
                bgColor="bg-[#242529]"
                onClick={clickBtn}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TextToImage;
