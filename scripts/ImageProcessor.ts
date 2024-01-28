import { Pixel } from "@/types";

function _rgbaToHex({ r, g, b }: { r: number; g: number; b: number }) {
  function componentToHex(component: number) {
    const hex = component.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  const hexR = componentToHex(r);
  const hexG = componentToHex(g);
  const hexB = componentToHex(b);

  return hexR + hexG + hexB;
}

async function processImage(src: string): Promise<Array<Pixel>> {
  const img = new Image();
  img.src = src;

  await img.decode(); // Ensure the image is loaded

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");

  ctx!.drawImage(img, 0, 0);

  const array = new Array<Pixel>();

  const width = Math.min(img.width, 32);
  const height = Math.min(img.height, 32);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const imageData = ctx!.getImageData(x, y, 1, 1).data;
      const hex = _rgbaToHex({
        r: imageData[0],
        g: imageData[1],
        b: imageData[2],
      });

      const pixel: Pixel = {
        hex: hex,
        pos: [x, y],
        isUsed: false,
      };

      array.push(pixel);
    }
  }

  return array;
}

export default processImage;
