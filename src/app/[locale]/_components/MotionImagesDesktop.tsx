import { motion, useScroll, useTransform } from "framer-motion";
import mcBukImg from "../../../../public/mcbuk-min.png";
import browserContentImg from "../../../../public/browser_content.png";

interface IMotionImagesDesktopProps {
  isPortrait: boolean;
}

const MotionImagesDesktop: React.FC<IMotionImagesDesktopProps> = ({
  isPortrait,
}) => {
  const { scrollY } = useScroll();
  const browserContentY = useTransform(scrollY, [0, 400], [0, -1200]);
  const browserY = useTransform(scrollY, [0, 400], [0, -900]);
  const laptopY = useTransform(
    scrollY,
    [0, 300],
    [isPortrait ? 300 : 0, -1500]
  );

  return (
    <motion.div
      style={{ y: laptopY }}
      className="absolute top-1/4 left-1/3 transform -translate-x-1/2 z-10"
    >
      <div className="flex justify-center relative items-center">
        <img
          src={mcBukImg.src}
          alt="Computer"
          className="w-auto h-auto object-contain transition-transform duration-500 ease-out"
        />
        <div className="absolute flex justify-center w-2/3 h-2/3">
          <motion.div
            style={{ y: browserY }}
            className="flex justify-center flex-col mockup-browser border h-3/4 w-full"
          >
            <div className="mockup-browser-toolbar bg-purple z-10 !m-0 pt-3 pb-3">
              <div className="input border-base-300 border">www.devnow.net</div>
            </div>
            <div className="bg-accent_secondary border-base-300 flex justify-center border-t h-full">
              <motion.img
                src={browserContentImg.src}
                alt="BrowserContent"
                style={{ y: browserContentY, height: "100%" }}
                className="transform -translate-x-1/2 -translate-y-1/4 w-11/12 h-auto object-contain transition-transform duration-500 ease-out"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MotionImagesDesktop;
