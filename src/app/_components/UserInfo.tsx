// import { useUser } from "@auth0/nextjs-auth0/client";
import { useRef } from "react";

const UserInfo: React.FC = () => {
  // const { user } = useUser();
  const tmp = useRef<HTMLDivElement>(null);

  const defaultUserPicture =
    "https://w7.pngwing.com/pngs/505/761/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png";

  const toggleOpenDropdown = () => {
    tmp?.current?.classList.toggle("dropdown-open");
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  // if (user) {
  //   return (
  //     <div
  //       className="dropdown dropdown-end pt-1 ml-4"
  //       ref={tmp}
  //       onClick={toggleOpenDropdown}
  //     >
  //       <div
  //         tabIndex={0}
  //         role="button"
  //         className="btn btn-sm btn-ghost btn-circle avatar"
  //       >
  //         <div className="w-10 rounded-full">
  //           <img
  //             alt="Tailwind CSS Navbar component"
  //             src={user?.picture || defaultUserPicture}
  //           />
  //         </div>
  //       </div>
  //       <ul
  //         tabIndex={0}
  //         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
  //       >
  //         <li>
  //           <a href="/api/auth/logout">Wyloguj</a>
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // }
  return null; //TODO temporary auth disabled
};
export default UserInfo;
