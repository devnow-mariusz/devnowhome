import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCookieConsent } from "../context/CookieConsentContext";

const CookieConsentModal: React.FC = () => {
  const [modal, setModal] = useState<HTMLDialogElement | null>(null);
  const { setConsent } = useCookieConsent();
  const { t } = useTranslation();

  useEffect(() => {
    const modalElement = document.getElementById(
      "cookies-modal"
    ) as HTMLDialogElement;
    setModal(modalElement);
  }, []);

  return (
    <dialog className="modal" id="cookies-modal">
      <div className="modal-box bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost focus-visible:outline-none absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2 className="font-bold text-2xl mb-3">
          {t("cookies.cookies_modal.content_title")}
        </h2>
        <p className="mb-6">{t("cookies.cookies_modal.content_paragraph")}</p>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => {
              setConsent(true);
              modal?.close();
              window.location.reload();
            }}
            className="btn btn-wide"
          >
            {t("cookies.button_accept")}
          </button>
          <button
            onClick={() => {
              setConsent(false);
              modal?.close();
              window.location.reload();
            }}
            className="btn btn-wide"
          >
            {t("cookies.button_reject")}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CookieConsentModal;
