import TranslationsProvider from "../../_utils/translationsProvider";
import initTranslations from "../../i18n";
import ValuationWizard from "./_components/ValuationWizard";

interface IWycenaPageProps {
  params: Promise<{ locale: string }>;
}

const WycenaPage: React.FC<IWycenaPageProps> = async ({ params }) => {
  const { locale } = await params;
  const i18nNamespaces = ["valuation", "forms"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <ValuationWizard />
    </TranslationsProvider>
  );
};

export default WycenaPage;
