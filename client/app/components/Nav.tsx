"use client";

/* Core */
import Link from "next/link";
import { usePathname } from "next/navigation";
import Modal from "./Modal";

/* Instruments */

export const Nav = () => {
  const pathname = usePathname();

  return (
   pathname.slice(0,6) != "/admin" && 
    <div className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
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

        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                href="/menu"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                href="/authenticate"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
