import Head from "next/head";
import { useTranslation } from "react-i18next";
import CallOrderForm from "./CallOrderForm";

const CallOrderModal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <>
      <Head>
        <script
          src={`https://www.google.com/recaptcha/api.js?hl=${locale}`}
          async
          defer
        />
      </Head>
      <dialog id="call-order-modal" className="modal">
        <div className="modal-box bg-[#ff8c00] text-base-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost focus-visible:outline-none absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl mb-3">
            {t("call_order_modal.content_title")}
          </h3>
          <p className="mb-3">{t("call_order_modal.content_paragraph")}</p>
          <CallOrderForm />
        </div>
      </dialog>
    </>
  );
};

export default CallOrderModal;
