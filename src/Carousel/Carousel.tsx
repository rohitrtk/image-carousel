import { useState, useEffect } from "react";
import { CarouselPage } from "./CarouselPage";
import { motion } from "framer-motion";

interface IProps {
  images: string[];
  imageWidth: number;
  shuffle?: boolean;
  setImageOpen?: Function;
}

const choose = (possibilities: string[], num: number = 10): string[] => {
  const _possible = [...possibilities];
  const chosen: string[] = [];

  for (let i = 0; i < num; i++) {
    const index = Math.floor(Math.random() * _possible.length);
    chosen.push(_possible.splice(index, 1)[0]);
  }

  return chosen;
}

export const Carousel: React.FC<IProps> = ({ images, imageWidth, shuffle, setImageOpen }) => {

  const [imageArray, setImageArray] = useState<string[]>(images);

  const openImage = (src: string) => {
    if (setImageOpen) {
      setImageOpen(src);
    }
  }

  useEffect(() => {
    if (shuffle) {
      setImageArray(choose(imageArray, imageArray.length));
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: "100%",
          height: 200
        }}
      >
        <CarouselPage numImages={imageArray.length} imageWidth={imageWidth}>
          {
            ({ index }) => {
              const mod = index % imageArray.length;
              const imageIndex = mod < 0 ? imageArray.length + mod : mod;

              return (
                <motion.img
                  draggable={false}
                  alt=""
                  style={{
                    width: "100%",
                    position: "relative",
                    zIndex: 0
                  }}
                  src={imageArray[imageIndex]}
                  whileHover={{
                    scale: 1.1,
                    zIndex: 50
                  }}
                  onClick={(event) => {
                    if (event.detail === 2) {
                      openImage(imageArray[imageIndex]);
                    }
                  }}
                />
              );
            }
          }
        </CarouselPage>
      </div>
    </div >
  );
}
