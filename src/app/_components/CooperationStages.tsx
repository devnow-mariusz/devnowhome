"use client";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";

const CooperationStages: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="mt-14 mb-14" ref={ref}>
      <h2 className="text-3xl text-base-100 text-center lg:text-left font-bold mb-7">
        {t("cooperation_stages.header")}
      </h2>
      <motion.div
        className="join join-vertical w-full text-base-100"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          type: "spring",
          damping: 45,
          stiffness: 100,
          duration: 0.8,
        }}
      >
        <div className="collapse collapse-arrow bg-[#dfc9eb21] join-item">
          <input type="radio" name="cooperation-stages" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            {t("cooperation_stages.step_one.title")}
          </div>
          <div className="collapse-content">
            <p>{t("cooperation_stages.step_one.content")}</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-[#dfc9eb21] join-item">
          <input type="radio" name="cooperation-stages" />
          <div className="collapse-title text-xl font-medium">
            {t("cooperation_stages.step_two.title")}
          </div>
          <div className="collapse-content">
            <p>{t("cooperation_stages.step_two.content")}</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-[#dfc9eb21] join-item">
          <input type="radio" name="cooperation-stages" />
          <div className="collapse-title text-xl font-medium">
            {t("cooperation_stages.step_three.title")}
          </div>
          <div className="collapse-content">
            <p>{t("cooperation_stages.step_three.content")}</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-[#dfc9eb21] join-item">
          <input type="radio" name="cooperation-stages" />
          <div className="collapse-title text-xl font-medium">
            {t("cooperation_stages.step_four.title")}
          </div>
          <div className="collapse-content">
            <p>{t("cooperation_stages.step_four.content")}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CooperationStages;
