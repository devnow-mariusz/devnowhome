import { useState } from "react";
import { menuElements } from "../_static-data/constants";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./LanguageSwitch";
import Link from "next/link";

const MobileMenu: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>
  ) => {
    const detailsElement = e.currentTarget.closest(
      "details"
    ) as HTMLDetailsElement;
    if (detailsElement) {
      detailsElement.removeAttribute("open");
      setIsOpen(false);
    }
  };

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    setIsOpen(e.currentTarget.open);
  };

  return (
    <details className="dropdown" onToggle={handleToggle}>
      <summary
        className="btn btn-primary btn-circle"
        id="mobile-menu"
        aria-controls="mobile-menu"
        title="Google Map"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        )}
      </summary>
      <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 p-2 shadow w-screen !-right-2">
        {menuElements.map((el) =>
          el.visible ? (
            <li className="pt-3 pb-3" key={String(el.id)}>
              <Link
                href={el.path}
                onClick={handleLinkClick}
                className="link link-hover"
              >
                {t(`${el.locale}`)}
              </Link>
            </li>
          ) : null
        )}
        <div className="divider m-0"></div>
        <div onClick={handleLinkClick} className="flex justify-center">
          <LanguageSwitch />
        </div>
      </ul>
    </details>
  );
};

export default MobileMenu;
