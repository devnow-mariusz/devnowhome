import Script from "next/script";
import classNames from "classnames";
import type { Metadata } from "next";
import { dir } from "i18next";
import { inter } from "../fonts";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import PageWrapper from "../_components/PageWrapper";
import Providers from "../providers";
import i18nConfig from "../../../i18nConfig";
import CallOrder from "../_components/CallOrder";
import withTranslations from "../_hoc/withTranslations";
import CookieConsentBar from "../_components/CookieConsentBar";
import "../globals.css";

export const metadata: Metadata = {
  title: "Tworzenie nowoczesnych stron i sklepów internetowych | DEVNOW",
  description:
    "Zadbamy o Twój biznes. Strony i sklepy WWW już od 1900zł, zoptymalizowane pod SEO i urządzenia mobilne. Spotkajmy się w Trójmieście (Gdańsk / Gdynia / Sopot) lub zrealizujmy projekt całkowicie zdalnie.",
  keywords: [
    "tworzenie stron www",
    "tworzenie stron internetowych",
    "sklep internetowy",
    "strony internetowe",
    "strony internetowe gdansk",
    "strony internetowe trojmiasto",
    "strony www",
    "strona internetowa",
    "strona www",
    "web development",
    "app development",
    "Devnow",
    "software house",
    "software house gdansk",
    "software house trojmiasto",
    "software agency",
    "development agency",
    "software development",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export const viewport = "width=device-width, initial-scale=1.0";

export const generateStaticParams = () => {
  return i18nConfig.locales.map((locale) => ({ locale }));
};

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  const { locale } = await params;
  const TranslatedCallOrder = await withTranslations({
    params,
    namespaces: ["common", "forms"],
    children: <CallOrder />,
  });
  return (
    <html lang={locale} dir={dir(locale)} data-theme="light">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-X035PBTTVT"
        strategy="afterInteractive"
        async
        defer
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        defer
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-X035PBTTVT');
              `,
        }}
      />
      <body
        className={classNames(
          inter.className,
          "bg-gradient-to-b from-third to-fourth"
        )}
      >
        <Providers params={{ locale }}>
          <Navbar />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
          {TranslatedCallOrder}
          <CookieConsentBar />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
