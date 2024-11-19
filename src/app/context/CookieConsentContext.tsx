"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface CookieConsentContextType {
  consentGiven: boolean | null;
  setConsent: (isGranted: boolean) => void;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConsent = () => {
      const savedConsent = localStorage.getItem("cookie-consent");
      setConsentGiven(
        savedConsent === "true" ? true : savedConsent === "false" ? false : null
      );

      if (savedConsent === "true") {
        updateGtmConsent(true);
      } else if (savedConsent === "false") {
        updateGtmConsent(false);
      }

      setIsLoading(false);
    };

    loadConsent();
  }, []);

  const updateGtmConsent = (isGranted: boolean) => {
    if (typeof window === "undefined") return;

    window.gtag("consent", "update", {
      analytics_storage: isGranted ? "granted" : "denied",
    });
  };

  const setConsent = (isGranted: boolean) => {
    localStorage.setItem("cookie-consent", isGranted ? "true" : "false");
    setConsentGiven(isGranted);
    updateGtmConsent(isGranted);
  };

  return (
    <CookieConsentContext.Provider value={{ consentGiven, setConsent }}>
      {!isLoading && children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider"
    );
  }
  return context;
};
