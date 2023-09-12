import React from "react";
import imageCard from "../../assets/imageCard.svg";

const ImageDetail = ({ img }) => {
  const imageStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: "350px",
    height: "318px",
    borderRadius: "10px"
  };

  return (
    <div style={imageStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 361 328"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_48_2599)">
          {/* Aquí definimos la imagen dentro del SVG */}
          <image href={imageCard} width="100%" height="100%" />
        </g>
      </svg>
    </div>
  );
};

export default ImageDetail;