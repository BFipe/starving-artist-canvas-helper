"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { LoginOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import styles from "./ImageRecreator.module.scss";
import ImageInput from "@/widgets/ImageInput/ImageInput";
import ImageDisplayer from "@/widgets/ImageDisplayer/ImageDisplayer";

enum Mode {
  Uploading,
  Recreating,
}

const ImageRecreator = () => {
  const [mode, setMode] = useState<Mode | null>(null);

  useLayoutEffect(() => {
    const lsMode = localStorage.getItem("mode");

    if (lsMode !== null) {
      setMode(Number(lsMode) as Mode);
    } else {
      setMode(Mode.Uploading);
    }
  }, []);

  useEffect(() => {
    if (mode != null) {
      localStorage.setItem("mode", mode.toString());
    }
  }, [mode]);

  const HandleImageRecreation = () => {
    setMode(Mode.Recreating);
  };

  const HandleSwitchMode = () => {
    setMode(mode == Mode.Recreating ? Mode.Uploading : Mode.Recreating);
  };

  const HandleChangeToUpload = () => {
    setMode(Mode.Uploading);
  };

  return (
    <>
      <Button
        className={styles.button}
        onClick={HandleSwitchMode}
        icon={<LoginOutlined />}
      >
        Switch mode
      </Button>

      {mode == null && <Spin size="large" />}

      {mode == Mode.Uploading && (
        <>
          <h2>Uploading mode</h2>
          <ImageInput onStartRecreating={HandleImageRecreation} />
        </>
      )}

      {mode == Mode.Recreating && (
        <>
          <h2>Recreating mode</h2>
          <span>Click on the pixel to copy its hex value!</span>
          <ImageDisplayer HandleChangeMode={HandleChangeToUpload} />
        </>
      )}
    </>
  );
};

export default ImageRecreator;
