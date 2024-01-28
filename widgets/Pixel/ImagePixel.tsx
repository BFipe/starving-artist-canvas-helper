import { Pixel } from "@/types";
import React from "react";

type PixelProps = {
  pixelColor: string;
  pixelId: number;
  isUsed: boolean;
  handleClick: (id: number) => void;
};

const ImagePixel = ({
  pixelColor,
  pixelId,
  isUsed,
  handleClick,
}: PixelProps) => {
  const outline = isUsed ? "3px solid red" : "3px solid black";

  const HandlePixelClick = () => {
    handleClick(pixelId);
  };

  return (
    <div
      onClick={HandlePixelClick}
      style={{
        width: "25px",
        height: "25px",
        backgroundColor: `#${pixelColor}`,
        outline: outline,
      }}
    ></div>
  );
};

export default ImagePixel;
