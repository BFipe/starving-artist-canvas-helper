"use client";

import ImageInput from "../ImageInput/ImageInput";

const ImageRecreator = () => {
  const HandleImageRecreation = (imgSrc: string) => {
    console.log(imgSrc);
  };

  return (
    <>
      <ImageInput onStartRecreating={HandleImageRecreation} />
    </>
  );
};

export default ImageRecreator;