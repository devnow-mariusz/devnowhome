import { ReactNode } from "react";
import TranslationsProvider from "../_utils/translationsProvider";
import initTranslations from "../i18n";

interface IWithTranslationsProps {
  params: { locale: string };
  namespaces: string[];
  children: ReactNode;
}

const withTranslations = async ({
  params,
  namespaces,
  children,
}: IWithTranslationsProps) => {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, namespaces);

  return (
    <TranslationsProvider
      namespaces={namespaces}
      locale={locale}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  );
};

export default withTranslations;
