"use client";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { homePathnames } from "../_static-data/constants";

const PageWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div
      className={classNames("min-h-dvh", {
        "container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl pt-8 pb-8":
          !homePathnames.includes(pathname),
      })}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
