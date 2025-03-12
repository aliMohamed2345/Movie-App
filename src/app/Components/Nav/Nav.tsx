"use client";
// import SearchArea from "@/app/Components/Nav/SearchArea";
import Theme from "@/app/Components/Nav/Theme";
import Link from "next/link";
import SideMenu from "./SideMenu";
import { usePathname } from "next/navigation";
// import ResponsiveSearchArea from "@/app/Components/Nav/ResponsiveSearchArea";
const Nav = () => {
  const pathname = usePathname(); // Get current path
  return (
    <header className="bg-secondary text-text_color fixed w-full z-10 shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <SideMenu />
            <Link
              href="/"
              className="text-xl text-movie_color font-extrabold flex items-center gap-2 px-4 py-2 hover:text-text_color rounded-full transition-transform transform hover:scale-105"
            >
              <span className="tracking-wide">MovFlex</span>
            </Link>
          </div>
          {/* Tabs */}
          <div className="hidden gap-6 sm:flex">
            <Link
              href="/"
              className={`${
                pathname === `/` && `bg-background_hover`
              } hover:bg-background_hover px-4 py-2 rounded-full transition-all hover:text-text_color flex items-center gap-1`}
            >
              Home
            </Link>
            <Link
              href="/movie"
              className={`${
                pathname === `/movies` && `bg-background_hover`
              } hover:bg-background_hover px-4 py-2 rounded-full transition-all hover:text-text_color flex items-center gap-1`}
            >
              Movies
            </Link>
            <Link
              href="/tv"
              className={`${
                pathname === `/tv` && `bg-background_hover`
              } hover:bg-background_hover px-4 py-2 rounded-full transition-all hover:text-text_color flex items-center gap-1`}
            >
              TV shows
            </Link>
            <Link
              href="/actors"
              className={`${
                pathname === `/actors` && `bg-background_hover`
              } hover:bg-background_hover px-4 py-2 rounded-full transition-all hover:text-text_color`}
            >
              Actors
            </Link>
          </div>
          <Theme />
        </div>
      </div>
    </header>
  );
};

export default Nav;
