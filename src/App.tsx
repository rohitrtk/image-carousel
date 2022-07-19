import { useState, } from "react";
import { AnimatePresence } from "framer-motion";
import { Carousel } from "./Carousel/Carousel";
import { OpenImage } from "./OpenImage/OpenImage";

const images = [
  "images/aran.png",
  "images/evan.png",
  "images/lumi.png",
  "images/mercedes.png",
  "images/phantom.png",
  "images/blazewizard.png",
  "images/dawnwarrior.png",
  "images/nightwalker.png",
  "images/thunderbreaker.png",
  "images/windarcher.png",
  "images/ribbonpig.png",
  "images/shroom.png",
  "images/slime.png",
];

const App = () => {

  const [imageOpen, setImageOpen] = useState<string | null>(null);

  return (
    <div
      style={{ position: "relative", backgroundImage: "url('images/fairyfountain.jpg')", height: "100vh" }}
    >
      <h1 style={{
        padding: 0,
        margin: 0
      }}>Image Carousel</h1>
      <h4>Drag the carousel to the left or the right to see more images</h4>
      <h4>Double click on an image to enlarge it</h4>
      <Carousel images={images} imageWidth={200} shuffle={true} setImageOpen={setImageOpen} />
      <AnimatePresence>
        {
          imageOpen &&
          <OpenImage imageOpen={imageOpen} setImageOpen={setImageOpen} />
        }
      </AnimatePresence>
    </div>
  );
}

export default App;
