import React, { useState, useRef } from "react";
import "./ImageGenerator.css";
import default_image from "../assets/default_image.svg";

const ImageGenerator = () => {
  const [imageUrl, SetimageURl] = useState("/");
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }

    const response = await fetch('https://api.openai.com/v1/images/generations',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer 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 ",
        "User-Agent":"Chrome"
      },
      body:JSON.stringify({
        prompt:`${inputRef.current.value}`,
        n:1,
        size:"512x512"
      })
    });
    const data = await response.json();

    console.log(data)
  };
  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai image <span>Generator</span>
      </div>
      <div className="image-loading">
        <img src={imageUrl === "/" ? default_image : imageUrl} alt="" />
      </div>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          name=""
          id=""
          placeholder="Describe what you want to see"
          ref={inputRef}
        />
        <button className="generate-btn" onClick={imageGenerator}>Generate</button>
      </div>
    </div>
  );
};

export default ImageGenerator;
