"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import heroImg from "../../../../public/hero_27_0_1_0-min.jpg";

const MotionImagesDesktop = dynamic(() => import("./MotionImagesDesktop"));

const Hero: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [quality, setQuality] = useState(75);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    window.innerWidth > 768 && setIsDesktop(true);
    setQuality(isDesktop ? 100 : 80);

    const checkOrientation = () =>
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);

    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return (
    <div className="relative h-[calc(100vh-64px)] md:h-screen min-h-[620px] w-full overflow-hidden">
      <Image
        src={heroImg.src}
        alt="HeroBackground"
        className="absolute inset-0 object-cover z-0"
        fill
        priority
        quality={quality}
      />
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className="hero min-h-screen">
          <div className="hero-content text-neutral-content text-left h-full w-full min-w-full justify-start p-0">
            <div className="max-w-md h-full flex flex-col justify-center p-10">
              <div className="bg-opacity-60">
                <h1 className="mb-5 text-5xl font-bold text-base-100">
                  {t("home_hero_header")}
                </h1>
              </div>
              <button
                onClick={() => router.push("/wycena")}
                className="btn btn-neutral border-none hover:bg-purple_light max-w-[60%] mr-5 text-base-100"
              >
                {t("home_button_hero")}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isDesktop ? <MotionImagesDesktop isPortrait={isPortrait} /> : null}
    </div>
  );
};

export default Hero;
