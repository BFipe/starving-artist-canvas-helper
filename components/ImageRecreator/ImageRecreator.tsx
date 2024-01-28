"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import ImageInput from "../../widgets/ImageInput/ImageInput";
import { LoginOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import styles from "./ImageRecreator.module.scss";

enum Mode {
  Uploading,
  Recreating,
}

const ImageRecreator = () => {
  const [mode, setMode] = useState<Mode | null>(null);

  useLayoutEffect(() => {
    const lsMode = localStorage.getItem("mode");

    console.log(lsMode);

    if (lsMode !== null) {
      setMode(Number(lsMode) as Mode);
      console.log(lsMode);
    } else {
      setMode(Mode.Uploading);
    }
  }, []);

  useEffect(() => {
    console.log("I recieved mode", mode);
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
          <h1>Uploading mode</h1>
          <ImageInput onStartRecreating={HandleImageRecreation} />
        </>
      )}

      {mode == Mode.Recreating && (
        <>
          <h1>Recreating mode</h1>
        </>
      )}
    </>
  );
};

export default ImageRecreator;
