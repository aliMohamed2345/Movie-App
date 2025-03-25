/* eslint-disable @next/next/no-img-element */
import { useDebounce } from "@/app/hooks/useDebounce";
import { IoMdArrowDropdown } from "react-icons/io";
import { useFetch } from "@/app/hooks/useFetch";
import Link from "next/link";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { MdBrokenImage } from "react-icons/md";
interface searchQueryProps {
  results: [
    {
      id: number;
      title: string;
      release_date: string;
      original_language: string;
      poster_path: string;
      name?: string;
      profile_path?: string;
      first_air_date?: string;
    }
  ];
}
type mediaProps = `movie` | `tv` | `person`;
const Search = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentMedia, setCurrentMedia] = useState<mediaProps>(`movie`);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const debounceSearchQuery = useDebounce(searchQuery, 500);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data } = useFetch<searchQueryProps>({
    url: debounceSearchQuery
      ? `https://api.themoviedb.org/3/search/${currentMedia}?query=${debounceSearchQuery}&include_adult=false`
      : null,
    options: {
      method: `GET`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });
  const handleMediaSelection = (media: mediaProps) => {
    setCurrentMedia(media);
    setIsDropdownOpened(false);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | globalThis.MouseEvent) => {
      if (!searchRef?.current?.contains(e.target as Node)) {
        setSearchQuery("");
        setOpenSearch(false); // Close the search area
        setIsDropdownOpened(false); // Close dropdown as well
      }
    };
    document.addEventListener("mousedown", (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener("mousedown", (e) => handleClickOutside(e));
    };
  }, []);
  //give the first 5 results related to that search
  const QueryData = data?.results.slice(0, 5);
  function handleSearchButton(
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement, unknown>
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
    setSearchQuery("");
    setOpenSearch(false);
  }
  return (
    <>
      <button
        onClick={() => setOpenSearch((prev) => !prev)}
        className="hover:bg-background_hover text-text_color opacity-90 hover:opacity-100 rounded-full transition-all p-1 lg:w-9 lg:h-9 "
      >
        <IoMdSearch size={25} />
      </button>
      <div
        ref={searchRef}
        className={`top-[60px] border-t-[1px] border-primary left-0 absolute w-full bg-secondary flex items-center transition-all justify-center ${
          openSearch ? `h-16 opacity-100` : `h-0 opacity-0 -z-[4]`
        }`}
      >
        <Link
          onClick={(e) => handleSearchButton(e)}
          href={{
            pathname: `/search/${
              currentMedia === `person` ? `person` : `media`
            }/${searchQuery}`,
            query: { media: currentMedia, q: searchQuery },
          }}
          className="bg-movie_color p-2 rounded-l-full text-white h-10 flex items-center justify-center transition-all hover:bg-movie_color_hover"
        >
          <IoMdSearch size={18} />
        </Link>
        <div className="relative">
          <input
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search... "
            className=" w-[65vw] sm:w-[50vw] bg-primary outline-none text-lg pl-4 h-10"
          />
          <div className="absolute top-1/2  -translate-y-1/2 -right-[40px] w-20">
            <button
              onClick={() => setIsDropdownOpened((prev) => !prev)}
              className="bg-movie_color p-2 rounded-r-full text-sm sm:text-base hover:bg-movie_color_hover transition-all h-10 text-white flex gap-1 items-center justify-center font-bold w-16 sm:w-24"
            >
              {currentMedia === `movie`
                ? `Movies`
                : currentMedia === `tv`
                ? `TV`
                : `Actors`}{" "}
              <IoMdArrowDropdown className="hidden sm:block" />
            </button>

            {isDropdownOpened && (
              <div
                className={`bg-primary w-20 py-2 rounded-md absolute top-10 left-0 flex flex-col gap-2 transition-all px-1 z-20`}
              >
                <button
                  className="hover:bg-background_hover rounded-md transition-all p-1"
                  onClick={() => handleMediaSelection(`movie`)}
                >
                  Movies
                </button>
                <button
                  className="hover:bg-background_hover rounded-md transition-all p-1"
                  onClick={() => handleMediaSelection(`tv`)}
                >
                  TV
                </button>
                <button
                  className="hover:bg-background_hover rounded-md transition-all p-1"
                  onClick={() => handleMediaSelection(`person`)}
                >
                  Actors
                </button>
              </div>
            )}
          </div>
          {searchQuery && (
            <IoMdClose
              size={24}
              onClick={() => setSearchQuery(``)}
              className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer p-1 hover:bg-background_hover rounded-full"
            />
          )}
        </div>
        <IoMdClose
          onClick={() => setOpenSearch(false)}
          size={30}
          className="absolute top-2 left-1 cursor-pointer p-1.5 hover:bg-background_hover rounded-full"
        />
        {searchQuery && (
          <div className="absolute left-1/2 -translate-x-1/2 w-[70vw] sm:w-[50vw] bg-secondary  rounded-lg top-[60px] mx-auto">
            {QueryData && QueryData.length > 0 ? (
              <div className="flex  flex-col">
                {QueryData.map((object, i) => {
                  if (object.profile_path === null) return;
                  return (
                    <Link
                      onClick={() => setOpenSearch((prev) => !prev)}
                      href={
                        currentMedia === `movie`
                          ? `/movie/${object.id}?media=${currentMedia}&id=${object.id}`
                          : `/actors/${object.name?.split(` `).join(`_`)}?id=${
                              object.id
                            }`
                      }
                      key={i}
                      className="flex rounded-lg items-center hover:bg-background_hover transition-all gap-1.5 sm:gap-5 p-2 cursor-pointer"
                    >
                      {object.poster_path || object.profile_path ? (
                        <img
                          src={`${
                            process.env.NEXT_PUBLIC_BASE_IMAGE_URL
                          }/original/${
                            object.poster_path || object.profile_path
                          }`}
                          alt={object?.title}
                          loading="lazy"
                          className={`rounded-sm w-10 h-16 object-cover`}
                        />
                      ) : (
                        <span className="flex justify-center items-center w-10 h-16 flex-col text-text_color">
                          <MdBrokenImage
                            size={50}
                            color={`var(--movie_color)`}
                          />
                          <p className="text-center text-[9px]">no image</p>
                        </span>
                      )}
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm sm:text-base flex items-center gap-1">
                          {object.original_language && (
                            <span className="text-[8px] text-movie_color">
                              [{object.original_language}]
                            </span>
                          )}
                          {object.title || object.name}
                        </span>
                        <span className="text-sm sm:text-base">
                          {object?.release_date
                            ? object?.release_date.split("-")[0]
                            : object?.first_air_date?.split("-")[0]}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="p-2 text-center font-bold">no results found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
