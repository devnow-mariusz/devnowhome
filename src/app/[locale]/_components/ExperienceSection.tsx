"use client";
import { useTranslation } from "react-i18next";

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center text-base-100 w-full mt-7 mb-10">
      <h2 className="text-3xl text-center font-bold mb-6">
        {/* Przekujmy Twój pomysł w realne rozwiązanie */}
        {t("experience.header")}
      </h2>
      <p className="text-center">{t("experience.content")}</p>
    </div>
  );
};

export default ExperienceSection;
