import { useState, useEffect } from "react";
import { animate, AnimationOptions, motion, MotionStyle, PanInfo, useMotionValue } from "framer-motion";
import { CarouselImage } from "./CarouselImage";

interface IProps {
  numImages: number;
  imageWidth: number;
  children: (props: { index: number }) => JSX.Element;
}

const containerStyle: MotionStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflowX: "hidden",
  overflowY: "hidden",
  backgroundColor: "rgba(0, 0, 0, 0.4)"
}

const transition: AnimationOptions<any> = {
  type: "spring",
  bounce: 0
}

export const CarouselPage: React.FC<IProps> = ({ children, numImages, imageWidth }) => {
  const [index, setIndex] = useState<number>(0);
  const [range] = useState<number[]>(Array.from(Array(numImages).keys()).map(val => val - 1));
  const x = useMotionValue(0);

  const calcX = () => -index * imageWidth;

  const onDragEnd = (event: Event, info: PanInfo) => {
    const { offset } = info;

    if (offset.x > imageWidth / 4) {
      setIndex(index - 1);
    } else if (offset.x < -imageWidth / 4) {
      setIndex(index + 1);
    } else {
      animate(x, calcX(), transition);
    }
  }

  useEffect(() => {
    const controls = animate(x, calcX(), transition);
    return controls.stop;
  }, [index]);

  return (
    <motion.div style={containerStyle}>
      {
        range.map((val: number) => {
          return (
            <CarouselImage
              key={val + index}
              index={val + index}
              x={x}
              onDragEnd={onDragEnd}
              renderPage={children}
            />
          );
        })
      }
    </motion.div>
  );
}
