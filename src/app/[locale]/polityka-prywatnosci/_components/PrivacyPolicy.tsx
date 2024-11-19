"use client";

import { useTranslation, Trans } from "react-i18next";

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  const getItems = (key: string): string[] => {
    const items = t(key, { returnObjects: true });
    return Array.isArray(items) ? items : [];
  };

  const rightsItems: string[] = getItems("privacyPolicy.sections.rights.items");
  const contactFormItems: string[] = getItems(
    "privacyPolicy.sections.dataCollection.contactFormItems"
  );
  const offerFormItems: string[] = getItems(
    "privacyPolicy.sections.dataCollection.offerFormItems"
  );
  const cookiesItems: string[] = getItems(
    "privacyPolicy.sections.dataCollection.cookiesItems"
  );
  const processingPurposesItems: string[] = getItems(
    "privacyPolicy.sections.processingPurposes.items"
  );
  const legalBasisItems: string[] = getItems(
    "privacyPolicy.sections.legalBasis.items"
  );

  return (
    <div className="card mx-auto max-w-4xl p-1 md:p-6 bg-base-100 shadow-lg rounded-2xl">
      <div className="card-body">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-4 uppercase">
            {t("privacyPolicy.title")}
          </h1>
          <p className="mb-2">
            <Trans
              i18nKey="privacyPolicy.effectiveDate"
              values={{ date: "17.09.2024" }}
              components={{ strong: <strong /> }}
            />
          </p>
          <p>
            <Trans
              i18nKey="privacyPolicy.introduction.part1"
              components={{ strong: <strong /> }}
            />
          </p>
          <p className="mt-2">
            <Trans
              i18nKey="privacyPolicy.introduction.part2"
              components={{ strong: <strong /> }}
            />
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            {t("privacyPolicy.sections.dataController.title")}
          </h2>
          <p>
            <Trans
              i18nKey="privacyPolicy.sections.dataController.content"
              components={{ strong: <strong /> }}
            />
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            {t("privacyPolicy.sections.dataCollection.title")}
          </h2>
          <h3>
            {t("privacyPolicy.sections.dataCollection.contactForm.title")}
          </h3>
          <h3>
            {t("privacyPolicy.sections.dataCollection.contactForm.content")}
          </h3>
          <ul className="list-disc pl-6 mb-4">
            {contactFormItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3>{t("privacyPolicy.sections.dataCollection.offerForm.title")}</h3>
          <h3>
            {t("privacyPolicy.sections.dataCollection.offerForm.content")}
          </h3>
          <ul className="list-disc pl-6 mb-4">
            {offerFormItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3>{t("privacyPolicy.sections.dataCollection.cookies.title")}</h3>
          <h3>{t("privacyPolicy.sections.dataCollection.cookies.content")}</h3>
          <ul className="list-disc pl-6 mb-4">
            {cookiesItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3>{t("privacyPolicy.sections.dataCollection.recaptcha.title")}</h3>
          <p className="mb-4">
            {t("privacyPolicy.sections.dataCollection.recaptcha.content")}
          </p>
          <h3>
            {t("privacyPolicy.sections.dataCollection.googleAnalytics.title")}
          </h3>
          <p>
            {t("privacyPolicy.sections.dataCollection.googleAnalytics.content")}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            {t("privacyPolicy.sections.processingPurposes.title")}
          </h2>
          <p>{t("privacyPolicy.sections.processingPurposes.content")}</p>
          <ul className="list-disc pl-6">
            {processingPurposesItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            {t("privacyPolicy.sections.legalBasis.title")}
          </h2>
          <p>{t("privacyPolicy.sections.legalBasis.content")}</p>
          <ul className="list-disc pl-6">
            {legalBasisItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            {t("privacyPolicy.sections.dataRetention.title")}
          </h2>
          <p>{t("privacyPolicy.sections.dataRetention.content")}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            {t("privacyPolicy.sections.rights.title")}
          </h2>
          <p>{t("privacyPolicy.sections.rights.content")}</p>
          <ul className="list-disc pl-6">
            {rightsItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="mt-4">
            <Trans
              i18nKey="privacyPolicy.sections.rights.contact"
              components={{ strong: <strong /> }}
            />
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            {t("privacyPolicy.sections.dataRecipients.title")}
          </h2>
          <p>
            <Trans
              i18nKey="privacyPolicy.sections.dataRecipients.content"
              components={{ strong: <strong /> }}
            />
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            {t("privacyPolicy.sections.policyChanges.title")}
          </h2>
          <p>
            <Trans
              i18nKey="privacyPolicy.sections.policyChanges.content"
              components={{ strong: <strong /> }}
            />
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            {t("privacyPolicy.sections.contact.title")}
          </h2>
          <p>
            <Trans
              i18nKey="privacyPolicy.sections.contact.content"
              components={{ strong: <strong /> }}
            />
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
