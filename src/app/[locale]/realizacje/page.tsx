import TranslationsProvider from "../../_utils/translationsProvider";
import initTranslations from "../../i18n";
import Realizations from "./_components/Realizations";

interface IRealizacjePageProps {
  params: Promise<{ locale: string }>;
}

const RealizacjePage: React.FC<IRealizacjePageProps> = async ({ params }) => {
  const { locale } = await params;
  const i18nNamespaces = ["realizations"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Realizations />
    </TranslationsProvider>
  );
};

export default RealizacjePage;
