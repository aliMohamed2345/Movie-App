"use client";
import { useState } from "react";
import { PiListBold } from "react-icons/pi";
// import { sideMenuOptions } from "../../utils/Object";
import { IoArrowBackSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname(); // Get current path

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="p-1 rounded-full transition-all ease-in-out hover:bg-background_hover font-bold sm:hidden opacity-80 hover:opacity-100 text-text_color"
      >
        <PiListBold size={25} />
      </button>

      <div
        className={`h-full fixed ${
          isOpen ? `left-0` : `left-[-500px]`
        } min-w-[250px] lg:min-w-[300px] z-10 top-0 transition-all bg-primary  flex-col shadow-lg flex justify-start gap-10`}
      >
        <div className="flex content-start gap-3 items-center my-5 ml-4">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="hover:bg-background_hover hover:opacity-100 rounded-full transition-all p-1 text-text_color"
          >
            <IoArrowBackSharp size={25} />
          </button>

          <div className="text-center ">
            <Link
              href="/"
              className="text-xl text-movie_color font-extrabold flex items-center gap-2 px-4 py-2 hover:text-text_color rounded-full transition-transform transform hover:scale-105"
            >
              <span className="tracking-wide">MovFlex</span>
            </Link>
          </div>
        </div>
        <ul className="space-y-2">
          <Link
            title={`Home`}
            href={`/`}
            className={`flex ${
              pathname === "/" && `bg-movie_color text-white`
            } items-center justify-start gap-5 rounded-2xl p-2 font-bold hover:bg-movie_color dark:hover:text-white transition-all mx-4 text-lg text-text_color`}
          >
            Home
          </Link>
          <Link
            title={`Movies`}
            href={`/movie`}
            className={`flex ${
              pathname === "/movie" && `bg-movie_color text-white`
            } items-center justify-start gap-5 rounded-2xl p-2 font-bold hover:bg-movie_color dark:hover:text-white transition-all mx-4 text-lg text-text_color`}
          >
            Movies
          </Link>
          <Link
            title={`TV Shows`}
            href={`/tv`}
            className={`flex ${
              pathname === "/tv" && `bg-movie_color text-white`
            } items-center justify-start gap-5 rounded-2xl p-2 font-bold hover:bg-movie_color dark:hover:text-white transition-all mx-4 text-lg text-text_color`}
          >
            TV Shows
          </Link>
          <Link
            title={`Actors`}
            href={`/actors`}
            className={`flex ${
              pathname === "/actors" && `bg-movie_color text-white`
            } items-center justify-start gap-5 rounded-2xl p-2 font-bold hover:bg-movie_color dark:hover:text-white transition-all mx-4 text-lg text-text_color`}
          >
            Actors
          </Link>
        </ul>
      </div>
      {
        // Overlay for the side menu
        isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-5"
          ></div>
        )
      }
    </>
  );
};

export default SideMenu;
