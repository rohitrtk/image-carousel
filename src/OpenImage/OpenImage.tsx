import { useState, useEffect, useRef } from "react";
import { motion, MotionStyle } from "framer-motion";

interface IProps {
  imageOpen: string;
  setImageOpen: Function;
}

const imageStyle: MotionStyle = {
  width: 800
}

export const OpenImage: React.FC<IProps> = ({ imageOpen, setImageOpen }) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState<number>(800);
  const openImageRef = useRef<HTMLImageElement | null>(null);

  const fetchImage = async (url: string) => {
    const res = await fetch(url);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImage(imageObjectURL);
  }

  useEffect(() => {
    fetchImage(imageOpen.slice(0, imageOpen.lastIndexOf(".")) + "-h.png");
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.75)"
      }}
      onClick={(event) => {
        if (event.target !== openImageRef.current) {
          setImageOpen(null);
          setImageWidth(0);
          openImageRef.current = null;
        }
      }}
    >
      <div
        className="bg"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 51
        }}
      >
        {
          image ?
            <motion.img
              ref={openImageRef}
              style={{
                ...imageStyle,
                scale: 4
              }}
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
              exit={{
                scale: 0,
                opacity: 0
              }}
              src={image}
              alt="Open Image"
              draggable="false"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
            />
            :
            <h1>
              Loading
            </h1>
        }
      </div>
    </div>
  );
}