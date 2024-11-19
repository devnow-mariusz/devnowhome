"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useTranslation, Trans } from "react-i18next";
import ContactForm from "../ContactForm";
import { monda } from "../../../fonts";

const Contact: React.FC = () => {
  const [addressVisible, setAddressVisible] = useState(false);
  const [modal, setModal] = useState<HTMLDialogElement | null>(null);
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  useEffect(() => {
    const modalElement = document.getElementById(
      "call-order-modal"
    ) as HTMLDialogElement;
    setModal(modalElement);
  }, []);

  const openModal = () => {
    modal?.show();
  };

  return (
    <>
      <Head>
        <script
          src={`https://www.google.com/recaptcha/api.js?hl=${locale}`}
          async
          defer
        />
      </Head>
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          <div className="divider divider-start divider-multicolor-single mb-12">
            <h1
              className={`card-title text-3xl text-default text-center font-bold uppercase ${monda.className}`}
            >
              {t("page_title")}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-6">
              <div>
                <p className="text-justify pb-5">
                  {t("paragraph_section.paragraph1")}
                </p>
                <p className="text-justify">
                  <Trans
                    i18nKey="paragraph_section.paragraph2"
                    components={{
                      1: <Link className="link link-accent" href="/wycena" />,
                    }}
                  />
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-5">
                  {t("company_details")}
                </h2>
                {addressVisible ? (
                  <p>DEVNOW, ul. Marsa 24b/13, 80-299 Gdańsk</p>
                ) : (
                  <button
                    onClick={() => setAddressVisible(true)}
                    className="btn btn-primary"
                  >
                    {t("button_show")}
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-5">
                  {t("phone_call")}
                </h2>
                <button onClick={() => openModal()} className="btn btn-primary">
                  {t("button_phone_call")}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold mb-4">{t("form_title")}</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
