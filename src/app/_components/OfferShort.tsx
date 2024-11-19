"use client";
import { useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";

const OfferShort = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="mt-10" ref={ref}>
      <h2 className="text-3xl text-base-100 text-center lg:text-left font-bold mb-7">
        {t("offer_short.header")}
      </h2>
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          type: "spring",
          damping: 45,
          stiffness: 100,
          duration: 0.8,
        }}
      >
        <div className="card glass bg-[#b87cdbc4] w-full lg:w-80 shadow-xl transition duration-300 ease-in-out hover:bg-[#c290e6d9]">
          <div className="card-body text-base-100 ">
            <h2 className="card-title font-light text-4xl pb-5">
              <Trans
                i18nKey="offer_short.basic_site.title"
                components={{ 1: <br /> }}
              />
            </h2>
            <p>{t("offer_short.basic_site.description")}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => router.push("/oferta")}
                className="btn btn-primary border-none hover:bg-primary max-w-[60%]"
              >
                {t("offer_short.button")}
              </button>
            </div>
          </div>
        </div>
        <div className="card glass bg-[#00000087] w-full lg:w-80 shadow-xl transition duration-300 ease-in-out hover:bg-[#2e2e2e87]">
          <div className="card-body text-base-100">
            <h2 className="card-title font-light text-4xl pb-5">
              <Trans
                i18nKey="offer_short.complex_site.title"
                components={{ 1: <br /> }}
              />
            </h2>
            <p>{t("offer_short.complex_site.description")}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => router.push("/oferta")}
                className="btn btn-primary border-none hover:bg-primary max-w-[60%]"
              >
                {t("offer_short.button")}
              </button>
            </div>
          </div>
        </div>
        <div className="card glass bg-[#748c35] w-full lg:w-80 shadow-xl transition duration-300 ease-in-out hover:bg-[#91a54f]">
          <div className="card-body text-base-100">
            <h2 className="card-title font-light text-4xl pb-5">
              <Trans
                i18nKey="offer_short.online_shop.title"
                components={{ 1: <br /> }}
              />
            </h2>
            <p>{t("offer_short.online_shop.description")}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => router.push("/oferta")}
                className="btn btn-primary border-none hover:bg-primary max-w-[60%]"
              >
                {t("offer_short.button")}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OfferShort;
