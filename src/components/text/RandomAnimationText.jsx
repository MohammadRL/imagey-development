import React, { useEffect, useState } from "react";
import "../../random-animation-text.css";
let xPos = 0;
let yPos = 0;
let duration = 0.1;
const RandomAnimationText = ({ text }) => {
  const [convertedText, setConvertedText] = useState(null);
  const textToArr = () => {
    setConvertedText(text && text.split(" "));
  };
  useEffect(() => {
    textToArr();
  }, [text]);
  return (
    <div
      className="cascading-text cascading-text--random"
      data-animated="data-animated"
    >
      {convertedText &&
        convertedText.map((char, index) => {
          xPos >= 150 ? (xPos = xPos - 125) : (xPos += 80);
          yPos >= 256 ? (yPos -= 300) : (yPos += 95);
          duration += 0.1;
          return (
            <div
              className={`cascading-text__letter font-playWrite text-slate-200`}
              key={index}
              style={{
                transform: `translateX(${xPos}%) translateY(${yPos}%)`,
                // animationName: "random",
                // animationDelay: `${duration}s`,
              }}
            >
              {char}
            </div>
          );
        })}
    </div>
  );
};

export default RandomAnimationText;
