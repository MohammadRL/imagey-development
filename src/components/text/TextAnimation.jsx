import React from "react";
import "../../text-animation.css";
const TextAnimation = ({
  mainText,
  text1,
  text2,
  text3,
  text4,

}) => {
  return (
    <div className="content__container">
      <p className="content__container__text">{mainText}</p>

      <ul className="content__container__list" >
        <li className="content__container__list__item">{text1}</li>
        <li className="content__container__list__item">{text2}</li>
        <li className="content__container__list__item">{text3}</li>
        <li className="content__container__list__item">{text4}</li>
      </ul>
    </div>
  );
};

export default TextAnimation;
