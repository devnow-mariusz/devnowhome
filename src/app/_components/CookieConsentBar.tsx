"use client";
import { useTranslation } from "react-i18next";
import { useCookieConsent } from "../context/CookieConsentContext";

const CookieConsentBar: React.FC = () => {
  const { t } = useTranslation();
  const { consentGiven, setConsent } = useCookieConsent();

  if (consentGiven !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-neutral-950 text-base-100 flex flex-col md:flex-row justify-between items-center z-50">
      <p className="mb-4 md:mb-0 md:mr-4 text-center md:text-left">
        {t("cookies.cookies_consent_bar.content_paragraph")}
      </p>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <button
          onClick={() => setConsent(true)}
          className="btn btn-wide mb-2 md:mb-0 md:mr-2 md:w-auto"
        >
          {t("cookies.button_accept")}
        </button>
        <button
          onClick={() => setConsent(false)}
          className="btn btn-wide mb-2 md:mb-0 md:mr-2 md:w-auto"
        >
          {t("cookies.button_reject")}
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBar;
