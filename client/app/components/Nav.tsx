"use client";

/* Core */
import Link from "next/link";
import { usePathname } from "next/navigation";
import Modal from "./Modal";
import { authSlice, useDispatch, useSelector } from "@/lib/redux";
/* Instruments */

export const Nav = () => {
  const pathname = usePathname();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { userinfo } = useSelector((state) => state.auth);

  return (
    pathname.slice(0, 6) != "/admin" && (
      <div className="bg-gray-900 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-600 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              BurgerBar
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
            <Modal />

            <button className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2 text-center">
              <Link
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 "
                href="/admin"
              >
                ADMIN
              </Link>
            </button>
            {isLoggedIn ? (
              <div className="flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
                <button
                  onClick={() => dispatch(authSlice.actions.logout())}
                  className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Logout
                </button>
                <img
                  src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png"
                  className="h-8 w-8 rounded-full"
                  alt="avatar"
                />
                <h2 className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white">
                  {userinfo.name}
                </h2>
              </div>
            ) : (
              <button className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2 text-center">
                <Link
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 "
                  href="/authenticate"
                >
                  Login
                </Link>
              </button>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-600 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
                  href="/menu"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
                  href="/faq"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
                  href="/authenticate"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};