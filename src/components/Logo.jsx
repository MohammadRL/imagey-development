import React from "react";

function Logo({ width = "100%" }) {
  return (
    <div className="font-embedCode text-[#eee] text-[30px] font-bold relative">
      Imagey
      <p className="absolute top-[99%] left-[50%] translate-x-[-50%] text-center w-full text-[8px] font-light">
        Create The Future
      </p>
    </div>
  );
}

export default Logo;
