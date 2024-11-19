// import { UserProvider } from "@auth0/nextjs-auth0/client"; //TO DO temporary auth disabled
import TranslationsProvider from "./_utils/translationsProvider";
import initTranslations from "./i18n";
import { CookieConsentProvider } from "./context/CookieConsentContext";

interface IProvidersProps {
  children: React.ReactNode;
  params: { locale: string };
}

const Providers: React.FC<IProvidersProps> = async ({ children, params }) => {
  const { locale } = await params;
  const i18nNamespaces = ["common"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    // <UserProvider>
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <CookieConsentProvider>{children}</CookieConsentProvider>
    </TranslationsProvider>
    // </UserProvider>
  );
};

export default Providers;
