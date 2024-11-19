import { useTranslation } from "react-i18next";
import Link from "next/link";
import { menuElements } from "../_static-data/constants";
import LanguageSwitch from "./LanguageSwitch";
// import UserInfo from "./UserInfo";
// import { UserProfile } from "@auth0/nextjs-auth0/client";

// interface IDesktopMenuProps {
//   user: UserProfile | undefined;
// }

const DesktopMenu: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <ul className="menu menu-horizontal !active:bg-transparent items-center text-accent_secondary font-medium">
        {menuElements.map((el) =>
          el.visible ? (
            <li key={String(el.id)}>
              <Link
                className="hover:text-primary focus:outline-none focus:text-primary transition-colors duration-200 ease-in-out"
                href={el.path}
              >
                {t(`${el.locale}`)}
              </Link>
            </li>
          ) : null
        )}
        {/* {user ? (
          <UserInfo />
        ) : (
          <li>
            <a href="/api/auth/login">Zaloguj</a>
          </li>
        )} */}
      </ul>
      <LanguageSwitch />
    </div>
  );
};

export default DesktopMenu;
