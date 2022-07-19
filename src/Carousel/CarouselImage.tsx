import { useMemo } from "react";
import { motion, MotionStyle, MotionValue, PanInfo } from "framer-motion";

interface IProps {
  index: number;
  x: MotionValue;
  renderPage: (props: { index: number }) => JSX.Element;
  onDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
}

const pageStyle: MotionStyle = {
  position: "absolute",
  width: 200,
  height: "100%"
}

export const CarouselImage: React.FC<IProps> = ({
  index,
  x,
  onDragEnd,
  renderPage,
}) => {
  const rp = useMemo(() => renderPage({ index }), [index, renderPage]);

  return (
    <motion.div
      style={{
        ...pageStyle,
        x,
        left: `${index * 200}px`,
        right: `${index * 200}px`,
        margin: 10,
        scale: 0.8
      }}
      draggable
      drag="x"
      dragElastic={0.1}
      onDragEnd={onDragEnd}
    >
      {
        rp
      }
    </motion.div>
  );
}
