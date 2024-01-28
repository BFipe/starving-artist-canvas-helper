"use client";

import { Spin, UploadProps } from "antd";
import { UploadOutlined, CheckOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, message, Upload } from "antd";
import styles from "./ImageInput.module.scss";
import "./extra.scss";

type ImageInputParams = {
  onStartRecreating: () => void;
};

const ImageInput = ({ onStartRecreating }: ImageInputParams) => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = localStorage.getItem("image");
    if (image) {
      setImageSrc(image);
    }

    setIsLoading(false);
  }, []);

  let reader: FileReader | null = null;

  if (typeof FileReader !== "undefined") {
    reader = new FileReader();
  }

  const props: UploadProps = {
    name: "file",
    onChange(info) {
      if (info.file.status === "done") {
        const blob = info.file.originFileObj as Blob;
        if (reader) {
          reader.readAsDataURL(blob);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  if (reader) {
    reader.onload = (event) => {
      if (event.target) {
        const result = event.target.result;
        checkImageSize(result as string);
      }
    };
  }

  const checkImageSize = (imageSrc: string) => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      if (img.width === 32 && img.height === 32) {
        message.success(`File uploaded successfully`);

        setImageSrc(imageSrc);
        localStorage.setItem("image", imageSrc);
      } else {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        canvas.width = 32;
        canvas.height = 32;

        ctx.drawImage(img, 0, 0, 32, 32);

        const centeredImageSrc = canvas.toDataURL("image/png");

        message.success("Image was sized down to 32 by 32");

        setImageSrc(centeredImageSrc);
        localStorage.setItem("image", centeredImageSrc);
      }
    };
  };

  if (isLoading) {
    return (
      <>
        <Spin size="large" />
      </>
    );
  }

  return (
    <>
      <h2 className={styles.header}>Upload your 32 x 32 image here</h2>
      <Upload {...props} maxCount={1}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      {imageSrc && (
        <>
          <img
            className={styles.image}
            height={300}
            width={300}
            src={imageSrc as string}
            alt="Preview"
          />
          <Button
            onClick={() => {
              onStartRecreating();
            }}
            icon={<CheckOutlined />}
          >
            Start recreating image
          </Button>
        </>
      )}
    </>
  );
};

export default ImageInput;
