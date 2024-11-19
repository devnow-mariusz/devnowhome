import TranslationsProvider from "../_utils/translationsProvider";
import initTranslations from "../i18n";
import Hero from "./_components/Hero";
import FloatingTechnologies from "../_components/FloatingTechnologies";
import Stats from "./_components/Stats";
import ExperienceSection from "./_components/ExperienceSection";
import OfferShort from "../_components/OfferShort";
import CooperationStages from "../_components/CooperationStages";

interface IHomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage: React.FC<IHomePageProps> = async ({ params }) => {
  const { locale } = await params;
  const i18nNamespaces = ["home", "contact", "forms"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Hero />
      <div className="w-full flex justify-center">
        <div className="flex flex-col p-5 sm:w-10/12 lg:w-full max-w-screen-xl">
          <ExperienceSection />
          <Stats />
          <OfferShort />
          <CooperationStages />
          <iframe
            title="Devnow Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2321.4265047011686!2d18.477551276832486!3d54.42010297262016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd9fe91c1df3cf%3A0xa7fc5316abf034ab!2sDEVNOW%20-%20Nowoczesne%20strony%20i%20sklepy%20WWW!5e0!3m2!1spl!2spl!4v1731496836850!5m2!1spl!2spl"
            className="h-96 w-full rounded-lg"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <FloatingTechnologies />
    </TranslationsProvider>
  );
};

export default HomePage;
