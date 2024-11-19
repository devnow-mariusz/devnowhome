import TranslationsProvider from "../../_utils/translationsProvider";
import initTranslations from "../../i18n";
import PrivacyPolicy from "./_components/PrivacyPolicy";

interface IPolitykaPrywatnosciPageProps {
  params: Promise<{ locale: string }>;
}

const PolitykaPrywatnosciPage: React.FC<
  IPolitykaPrywatnosciPageProps
> = async ({ params }) => {
  const { locale } = await params;
  const i18nNamespaces = ["privacy-policy"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <PrivacyPolicy />
    </TranslationsProvider>
  );
};

export default PolitykaPrywatnosciPage;
