import TranslationsProvider from "../../_utils/translationsProvider";
import initTranslations from "../../i18n";
import Contact from "./_components/Contact";

interface IKontaktPageProps {
  params: Promise<{ locale: string }>;
}

const KontaktPage: React.FC<IKontaktPageProps> = async ({ params }) => {
  const { locale } = await params;
  const i18nNamespaces = ["contact", "forms"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Contact />
    </TranslationsProvider>
  );
};

export default KontaktPage;
