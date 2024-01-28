"use client";

import { Pixel } from "@/types";
import { Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import processImage from "@/scripts/ImageProcessor";
import styles from "./ImageDisplayer.module.scss";
import ImagePixel from "../Pixel/ImagePixel";
import clipboardCopy from "clipboard-copy";

enum DisplayerMode {
  EmptyNoImage,
  EmptyImage,
  Pixels,
}

type ImageDisplayerProps = {
  HandleChangeMode: () => void;
};

const ImageDisplayer = ({ HandleChangeMode }: ImageDisplayerProps) => {
  const [displayerMode, setDisplayerMode] = useState<DisplayerMode | null>();
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [pixels, setPixels] = useState<Array<Pixel> | null>();

  useEffect(() => {
    const lsDisplayerPixels = localStorage.getItem("displayerPixels");

    if (lsDisplayerPixels == null) {
      const lsImage = localStorage.getItem("image");

      if (lsImage != null) {
        setImageUrl(lsImage);
        setDisplayerMode(DisplayerMode.EmptyImage);
      } else {
        setDisplayerMode(DisplayerMode.EmptyNoImage);
      }
    } else {
      setPixels(JSON.parse(lsDisplayerPixels));
      setDisplayerMode(DisplayerMode.Pixels);
    }
  }, []);

  useEffect(() => {
    if (pixels) {
      localStorage.setItem("displayerPixels", JSON.stringify(pixels));
    }
  }, [pixels]);

  const HandleProcessImage = () => {
    if (imageUrl) {
      processImage(imageUrl).then((array) => {
        localStorage.setItem("displayerPixels", JSON.stringify(array));
        setPixels(array);
        setDisplayerMode(DisplayerMode.Pixels);
      });
    }
  };

  const HandlePixelClick = (id: number) => {
    console.log("Clicked pixel", id);

    const newPixelState = !pixels![id].isUsed;

    setPixels((prevPixels) => {
      const updatedPixels = [...prevPixels!];
      updatedPixels[id].isUsed = newPixelState;
      return updatedPixels;
    });

    clipboardCopy(pixels![id].hex);
  };

  return (
    <>
      {displayerMode == null && <Spin size="large" />}
      {displayerMode == DisplayerMode.EmptyNoImage && (
        <>
          <p>You dont have any images uploading</p>
          <Button onClick={HandleChangeMode}>Go to image uploader</Button>
        </>
      )}
      {displayerMode == DisplayerMode.EmptyImage && (
        <>
          <p>
            You have uploaded image! Click button to start recreating image.
          </p>
          <Button onClick={HandleProcessImage}>Convert image</Button>
        </>
      )}
      {displayerMode == DisplayerMode.Pixels && pixels && (
        <div className={styles.pixelViewer}>
          <div className={styles.pixelContainer}>
            {pixels.map((pixel, index) => {
              return (
                <ImagePixel
                  pixelColor={pixel.hex}
                  isUsed={pixel.isUsed}
                  pixelId={pixel.pos[0] + 32 * pixel.pos[1]}
                  handleClick={HandlePixelClick}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageDisplayer;
