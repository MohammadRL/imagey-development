import React from "react";
import "../Home.css";
import RandomAnimationText from "../components/text/RandomAnimationText";
import Magic from "../components/text/Magic";
import TextAnimation from "../components/text/TextAnimation";
import StartButton from "../components/text/StartButton";
function Home() {
  return (
    <div className="">
      <div className="absolute top-0 left-0 bg-layer-bg h-screen opacity-10 filter grayscale  w-full "></div>
      <div className="absolute top-0 left-0 w-full h-screen bg-landing-bg bg-contain bg- bg-no-repeat bg-right  fil-img"></div>

      <div className=" absolute top-[15%] md:top-[30%]  md:translate-y-[-50%] left-[0%] flex justify-center md:left-[10%] z-30 w-full md:w-auto hidden">
        <RandomAnimationText text="Bring Your Image To Life With" />
      </div>
      <div className=" absolute top-[25%] left-[50%] translate-x-[-50px] md:top-[60%]  md:translate-y-[-50%] md:left-[10%] z-30 text-slate-100 font-embedCode font-extrabold text-[2rem] md:text-[4rem] overflow-hidden md:leading-[71px] h-[175px]">
        <TextAnimation
          mainText="Imag"
          text1="ey"
          text2="Filters"
          text3="Crop"
          text4="Generator"
        />
      </div>
      <div className="absolute top-[80%]  left-[50%] translate-x-[-50%] w-full md:w-auto lg:left-[15%] z-30 overflow-hidden">
        <StartButton text="Start" />
      </div>
      <Magic />
    </div>
  );
}

export default Home;
