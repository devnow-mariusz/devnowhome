"use client";
import { usePathname } from "next/navigation";
// import { useUser } from "@auth0/nextjs-auth0/client";
import classNames from "classnames";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { homePathnames } from "../_static-data/constants";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  // const { user } = useUser();

  return (
    <div
      className={classNames(
        "navbar backdrop-blur-md max-h-16 top-0 left-0 right-0 z-50 transition-colors duration-300 sticky",
        {
          "bg-neutral/35": homePathnames.includes(pathname),
          "bg-navbar/35": !homePathnames.includes(pathname),
        }
      )}
    >
      <div className="flex-1">
        <a className="btn btn-ghost text-xl shiny-logo" href="/">
          {"<Devnow />"}
        </a>
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>
      <div className="hidden md:block">
        <DesktopMenu />
      </div>
    </div>
  );
};

export default Navbar;
