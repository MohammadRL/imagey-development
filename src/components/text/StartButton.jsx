import React from "react";
import "../../start-btn.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StartButton = ({ text }) => {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const handleClick = () => {
    authStatus ? navigate("/imagey/image-center") : navigate("/imagey/login");
  };
  return (
    <>
      <button
        className="start-btn px-2 py-1 text-[40px] w-full"
        onClick={handleClick}
      >
        {text}
      </button>
    </>
  );
};

export default StartButton;
