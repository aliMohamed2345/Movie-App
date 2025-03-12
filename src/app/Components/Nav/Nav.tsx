"use client";
import Theme from "@/app/Components/Nav/Theme";
import Link from "next/link";
import SideMenu from "./SideMenu";
import { usePathname } from "next/navigation";
import Search from "./Search";
const Nav = () => {
  const pathname = usePathname();
  return (
    <header className="bg-secondary text-text_color fixed w-full z-10 shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <SideMenu />
            <Link
              href="/"
              className="text-xl text-movie_color hover:text-movie_color_hover font-extrabold flex items-center gap-2 px-4 py-2 rounded-full transition-transform transform hover:scale-105"
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
          <div className="flex gap-1 items-center">
            <Search />
            <Theme />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
