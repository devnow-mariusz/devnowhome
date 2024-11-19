import TranslationsProvider from "../../_utils/translationsProvider";
import initTranslations from "../../i18n";
import Offer from "./_components/Offer";

interface IOfferPageProps {
  params: Promise<{ locale: string }>;
}

const OfferPage: React.FC<IOfferPageProps> = async ({ params }) => {
  const { locale } = await params;
  const i18nNamespaces = ["offer"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Offer />
    </TranslationsProvider>
  );
};

export default OfferPage;
