import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useFetch } from "@/app/hooks/useFetch";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaImdb,
} from "react-icons/fa";
import Link from "next/link";
interface externalIdsProps {
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  youtube_id: string | null;
  imdb_id: string | null;
}
const ActorInfo = () => {
  const [isInfoMenuOpen, setIsInfoMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<`biography` | `info`>(
    `biography`
  );
  function getActorAge(birthday: string, deathday?: string) {
    if (!deathday) {
      const birthDate = new Date(birthday);
      const actorAge = Date.now() - birthDate.getTime();
      const actorAgeDate = new Date(actorAge);
      return Math.abs(actorAgeDate.getUTCFullYear() - 1970);
    } else {
      const birthDate = new Date(birthday);
      const deathDate = new Date(deathday);
      const actorAge = deathDate.getTime() - birthDate.getTime();
      const actorAgeDate = new Date(actorAge);
      return Math.abs(actorAgeDate.getUTCFullYear() - 1970);
    }
  }
  const {
    name,
    id,
    place_of_birth,
    birthday,
    biography,
    deathday,
    known_for_department,
    gender,
  } = useSelector((state: RootState) => state.Actor);
  const { data } = useFetch<externalIdsProps>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${id}/external_ids`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });
  return (
    <>
      <button
        onClick={() => setIsInfoMenuOpen(true)}
        title="see more information"
        className="p-2 hover:bg-movie_color_hover w-1/3 text-white transition-all bg-movie_color rounded-md mt-4  font-bold"
      >
        See more
      </button>
      {isInfoMenuOpen && (
        <div
          onClick={() => setIsInfoMenuOpen(false)}
          className="fixed inset-0 bg-black/80 z-10"
        ></div>
      )}
      <div
        className={`w-[80vw]  min-h-[500px] p-3  z-10 bg-primary duration-300 transform -translate-x-1/2 -translate-y-1/2 fixed left-1/2 text-text_color transition-all ${
          isInfoMenuOpen
            ? `opacity-100 scale-100 top-1/2`
            : `opacity-0 scale-0 top-[-300px]`
        } rounded-lg container mx-auto`}
      >
        <div className="w-[80%] rounded-xl sm:hidden bg-slate-50 mx-auto my-4 relative border-2 border-slate-300 dark:border-gray-700 flex items-center transition-all">
          <button
            type="button"
            className={`flex items-center rounded-l-lg hover:bg-movie_color hover:text-white justify-center gap-2 p-1 w-1/2 ${
              biography === "biography" && "bg-movie_color text-white"
            } transition-all hover:opacity-100`}
            onClick={() => setCurrentTab("biography")}
          >
            Biography
          </button>
          <div className="h-full bg-slate-400 w-0.5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <button
            type="button"
            className={`flex items-center rounded-r-lg hover:bg-movie_color hover:text-white justify-center gap-2 p-1 w-1/2 transition-all hover:opacity-100 ${
              currentTab === "info" && "bg-movie_color text-white"
            }`}
            onClick={() => setCurrentTab("info")}
          >
            Info
          </button>
        </div>
        {currentTab === `biography` ? (
          <div className="flex gap-3 mt-4 mx-auto items-center overflow-y-auto h-[450px] flex-col text-center">
            <h3 className="text-movie_color font-bold text-base sm:text-xl md:text-2xl">
              {name} Biography
            </h3>
            <p className="text-xs text-left sm:text-center sm:text-sm md:text-base text-text_color leading-relaxed tracking-wide">
              {biography || `no Biography Available for this actor`}
            </p>
          </div>
        ) : (
          <div className="flex gap-3 mt-4 mx-auto items-center overflow-y-auto h-[450px] flex-col text-center">
            <h3 className="text-movie_color font-bold text-base sm:text-2xl">
              {" "}
              Info About {name}
            </h3>
            <div className="w-full overflow-hidden rounded-lg border-2 border-movie_color shadow-md">
              <table className="w-full border-collapse border-2  border-movie_color text-sm text-text_color text-center">
                <tbody>
                  <tr className="border-b border-2 border-movie_color ">
                    <td className="py-2 px-4 text-movie_color border-movie_color border-2  font-extrabold text-xs sm:text-base">
                      Name
                    </td>
                    <td className="font-bold sm:text-base text-xs">{name}</td>
                  </tr>
                  <tr className="border-b border-2 border-movie_color">
                    <td className="py-2 px-4 text-movie_color border-movie_color border-2 font-extrabold text-xs sm:text-base">
                      Age
                    </td>
                    <td className=" font-bold sm:text-base text-xs">
                      {getActorAge(birthday, deathday || ``)}
                    </td>
                  </tr>
                  <tr className="border-b border-2 border-movie_color">
                    <td className="py-2 px-4 text-movie_color border-movie_color border-2 font-extrabold text-xs sm:text-base">
                      profession
                    </td>
                    <td className="font-bold sm:text-base text-xs">
                      {known_for_department === `Acting` ? `Actor` : `Director`}
                    </td>
                  </tr>
                  <tr className="border-b border-2 border-movie_color">
                    <td className="py-2 px-4 text-movie_color border-movie_color border-2 font-extrabold text-xs sm:text-base">
                      Gender
                    </td>
                    <td className="font-bold sm:text-base text-xs">
                      {gender === 1
                        ? "Female"
                        : gender === 2
                        ? "Male"
                        : `NoN Binary`}
                    </td>
                  </tr>
                  <tr className="border-b border-2 border-movie_color">
                    <td className="py-2 px-4 text-movie_color border-movie_color border-2  font-extrabold text-xs sm:text-base">
                      Born In
                    </td>
                    <td className="font-bold sm:text-base text-xs">{place_of_birth}</td>
                  </tr>
                  {deathday && (
                    <tr className="border-b border-2 border-movie_color">
                      <td className="py-2 px-4 text-movie_color border-movie_color border-2 font-extrabold text-xs sm:text-base">
                        Died At
                      </td>
                      <td className="font-bold sm:text-base text-xs">{deathday}</td>
                    </tr>
                  )}

                  <tr className="border-b border-2 border-movie_color">
                    <td className="py-2 px-4 text-movie_color border-movie_color border-2 font-extrabold text-xs sm:text-base">
                      Birth Day
                    </td>
                    <td className=" font-bold sm:text-base text-xs">{birthday}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-base font-bold sm:text-lg">
              Follow <span className="text-movie_color">{name}</span>
            </p>
            <div className="flex gap-2 justify-center flex-wrap ">
              {data?.twitter_id && (
                <Link
                  target={`_blank`}
                  href={`https://twitter.com/${data?.twitter_id}`}
                  className="p-2 transition-all rounded-full border border-movie_color hover:bg-movie_color_hover hover:text-white text-movie_color"
                >
                  <FaTwitter size={25} />
                </Link>
              )}
              {data?.facebook_id && (
                <Link
                  target={`_blank`}
                  href={`https://www.facebook.com/${data?.facebook_id}`}
                  className="p-2 transition-all rounded-full border border-movie_color hover:bg-movie_color_hover hover:text-white text-movie_color"
                >
                  <FaFacebook size={25} />
                </Link>
              )}
              {data?.instagram_id && (
                <Link
                  target={`_blank`}
                  href={`https://instagram.com/${data.instagram_id}`}
                  className="p-2 transition-all rounded-full border border-movie_color hover:bg-movie_color_hover hover:text-white text-movie_color"
                >
                  <FaInstagram size={25} />
                </Link>
              )}
              {data?.youtube_id && (
                <Link
                  target={`_blank`}
                  href={`https://www.youtube.com/${data.youtube_id}`}
                  className="p-2 transition-all rounded-full border border-movie_color hover:bg-movie_color_hover hover:text-white text-movie_color"
                >
                  <FaYoutube size={25} />
                </Link>
              )}
              {data?.imdb_id && (
                <Link
                  target={`_blank`}
                  href={`https://www.imdb.com/name/${data?.imdb_id}`}
                  className="p-2 transition-all rounded-full border border-movie_color hover:bg-movie_color_hover hover:text-white text-movie_color"
                >
                  <FaImdb size={25} />
                </Link>
              )}
            </div>
          </div>
        )}
        <div className="hidden sm:block">
          <button
            onClick={() => setCurrentTab(`info`)}
            className={`absolute -left-[70px] w-[70px] top-1/2 -translate-y-1/2  bg-primary transition-all  ${
              currentTab === `info`
                ? `translate-x-0 opacity-100 text-movie_color`
                : `translate-x-2 opacity-50 hover:translate-x-1 hover:opacity-60`
            } w-[60px] text-center rounded-l-lg h-10 text-xs flex items-center justify-center font-bold`}
          >
            Info
          </button>
          <button
            onClick={() => setCurrentTab(`biography`)}
            className={`absolute -left-[70px] top-[60%] w-[70px] -translate-y-1/2 bg-primary transition-all  ${
              currentTab === `biography`
                ? `translate-x-0 opacity-100 text-movie_color`
                : `translate-x-2 opacity-50 hover:translate-x-1 hover:opacity-60`
            } text-center rounded-l-lg h-10 font-bold flex items-center justify-center text-xs`}
          >
            Biography
          </button>
        </div>
      </div>
    </>
  );
};

export default ActorInfo;
