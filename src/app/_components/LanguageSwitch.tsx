import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../../i18nConfig";

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <label className="swap text-base-100 p-3 text-center">
      <input type="checkbox" checked={currentLocale === "pl"} readOnly />
      <div
        className="swap-on bg-primary p-1 cursor-pointer"
        onClick={() => handleChange("pl")}
      >
        EN
      </div>
      <div
        className="swap-off bg-primary p-1 cursor-pointer"
        onClick={() => handleChange("en")}
      >
        PL
      </div>
    </label>
  );
};

export default LanguageSwitch;
