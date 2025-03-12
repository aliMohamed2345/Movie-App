import { setMedia } from "@/app/redux/Slices/MediaSlice";
import { setSearchQuery } from "@/app/redux/Slices/SearchSlice";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdClose, IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const PageSearchBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.Search);
  const { media } = useSelector((state: RootState) => state.Media);
  const initialMedia =
    media === "movie" || media === "tv" || media === "person" ? media : "movie";
  const [currentMedia, setCurrentMedia] = useState<"movie" | "tv" | "person">(
    initialMedia
  );
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  function handleSearchButton(
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLAnchorElement | SVGElement, MouseEvent>
  ): void {
    if ("key" in e && e.key !== "Enter") {
      return;
    }
    // Prevent default if the search query is empty.
    if (!searchQuery.trim()) {
      e.preventDefault();
      return;
    }
    // Trigger your specific action here.
    router.push(`/${searchQuery}/?q=${searchQuery}&media=${currentMedia}`);
  }

  const handleMediaSelection = (selectedMedia: "movie" | "tv" | "person") => {
    setCurrentMedia(selectedMedia);
    setIsDropdownOpened(false);
    dispatch(setMedia(selectedMedia));
  };

  return (
    <div className="pt-20 border-t-[1px] border-primary absolute left-1/2 z-[5] -translate-x-1/2 w-full flex items-center transition-all justify-center">
      <Link
        onClick={(e) => handleSearchButton(e)}
        href={{
          pathname: `/${searchQuery}`,
          query: { media: currentMedia, q: searchQuery },
        }}
        className="bg-movie_color p-2 rounded-l-full text-white h-12 flex items-center justify-center transition-all hover:bg-movie_color_hover"
      >
        <IoMdSearch size={18} />
      </Link>
      <div className="relative">
        <input
          onKeyDown={(e) => handleSearchButton(e)}
          autoFocus
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          type="text"
          placeholder="Search..."
          className="w-[65vw] sm:w-[50vw] bg-secondary outline-none text-lg pl-4 h-12"
        />
        <div className="absolute top-1/2 -translate-y-1/2 -right-[40px] w-20">
          <button
            onClick={() => setIsDropdownOpened((prev) => !prev)}
            className="bg-movie_color p-2 rounded-r-full text-sm sm:text-base hover:bg-movie_color_hover transition-all h-12 text-white flex gap-1 items-center justify-center font-bold w-16 sm:w-24"
          >
            {currentMedia === "movie"
              ? "Movies"
              : currentMedia === "tv"
              ? "TV"
              : "Actors"}{" "}
            <IoMdArrowDropdown className="hidden sm:block" />
          </button>
          {isDropdownOpened && (
            <div className="bg-secondary w-20 py-2 rounded-md absolute left-0 flex flex-col gap-2 transition-all px-1 z-10">
              <button
                className="hover:bg-background_hover rounded-md transition-all p-1"
                onClick={() => handleMediaSelection("movie")}
              >
                Movies
              </button>
              <button
                className="hover:bg-background_hover rounded-md transition-all p-1"
                onClick={() => handleMediaSelection("tv")}
              >
                TV
              </button>
              <button
                className="hover:bg-background_hover rounded-md transition-all p-1"
                onClick={() => handleMediaSelection("person")}
              >
                Actors
              </button>
            </div>
          )}
        </div>
        {searchQuery && (
          <IoMdClose
            size={24}
            onClick={() => dispatch(setSearchQuery(""))}
            className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer p-1 hover:bg-background_hover rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default PageSearchBar;
