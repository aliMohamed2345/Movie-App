/* eslint-disable @next/next/no-img-element */
"use client";

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
  const [currentTab, setCurrentTab] = useState<"biography" | "info">("biography");

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
        title="See more information"
        className="px-4 py-2 bg-movie_color text-secondary_text_color rounded-full font-semibold hover:bg-movie_color_hover transition-all duration-300 mt-4"
      >
        See More
      </button>

      {isInfoMenuOpen && (
        <div
          onClick={() => setIsInfoMenuOpen(false)}
          className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-10"
        ></div>
      )}

      <div
        className={`fixed left-1/2 top-1/2 w-[90vw] sm:w-[80vw] max-w-4xl min-h-[400px] p-6 bg-secondary rounded-2xl shadow-2xl z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
          isInfoMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Tab Navigation for Small Screens */}
        <div className="sm:hidden flex justify-center gap-2 mb-4">
          <button
            onClick={() => setCurrentTab("biography")}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              currentTab === "biography"
                ? "bg-movie_color text-secondary_text_color"
                : "bg-primary text-text_color hover:bg-background_hover"
            }`}
          >
            Biography
          </button>
          <button
            onClick={() => setCurrentTab("info")}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              currentTab === "info"
                ? "bg-movie_color text-secondary_text_color"
                : "bg-primary text-text_color hover:bg-background_hover"
            }`}
          >
            Info
          </button>
        </div>

        {/* Tab Navigation for Larger Screens */}
        <div className="hidden sm:flex absolute -left-16 top-1/2 -translate-y-1/2 flex-col gap-2">
          <button
            onClick={() => setCurrentTab("biography")}
            className={`w-16 h-12 rounded-l-xl bg-primary text-text_color font-semibold transition-all duration-300 ${
              currentTab === "biography"
                ? "translate-x-0 opacity-100 bg-movie_color text-secondary_text_color"
                : "translate-x-2 opacity-70 hover:opacity-90 hover:translate-x-1"
            } flex items-center justify-center`}
          >
            Bio
          </button>
          <button
            onClick={() => setCurrentTab("info")}
            className={`w-16 h-12 rounded-l-xl bg-primary text-text_color font-semibold transition-all duration-300 ${
              currentTab === "info"
                ? "translate-x-0 opacity-100 bg-movie_color text-secondary_text_color"
                : "translate-x-2 opacity-70 hover:opacity-90 hover:translate-x-1"
            } flex items-center justify-center`}
          >
            Info
          </button>
        </div>

        {/* Content */}
        {currentTab === "biography" ? (
          <div className="max-h-[500px] overflow-y-auto p-4 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-movie_color mb-4">
              {name} Biography
            </h3>
            <p className="text-sm sm:text-base text-text_color leading-relaxed tracking-wide">
              {biography || "No biography available for this actor"}
            </p>
          </div>
        ) : (
          <div className="max-h-[500px] overflow-y-auto p-4 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-movie_color mb-4">
              Info About {name}
            </h3>
            <div className="w-full mx-auto max-w-md rounded-xl border border-movie_color/50 bg-primary/30 backdrop-blur-sm shadow-md">
              <table className="w-full text-sm text-text_color">
                <tbody>
                  <tr className="border-b border-movie_color/30">
                    <td className="py-3 px-4 font-semibold text-movie_color">Name</td>
                    <td className="py-3 px-4 font-medium">{name}</td>
                  </tr>
                  <tr className="border-b border-movie_color/30">
                    <td className="py-3 px-4 font-semibold text-movie_color">Age</td>
                    <td className="py-3 px-4 font-medium">
                      {getActorAge(birthday, deathday || "")}
                    </td>
                  </tr>
                  <tr className="border-b border-movie_color/30">
                    <td className="py-3 px-4 font-semibold text-movie_color">Profession</td>
                    <td className="py-3 px-4 font-medium">
                      {known_for_department === "Acting" ? "Actor" : "Director"}
                    </td>
                  </tr>
                  <tr className="border-b border-movie_color/30">
                    <td className="py-3 px-4 font-semibold text-movie_color">Gender</td>
                    <td className="py-3 px-4 font-medium">
                      {gender === 1 ? "Female" : gender === 2 ? "Male" : "Non-Binary"}
                    </td>
                  </tr>
                  <tr className="border-b border-movie_color/30">
                    <td className="py-3 px-4 font-semibold text-movie_color">Born In</td>
                    <td className="py-3 px-4 font-medium">{place_of_birth}</td>
                  </tr>
                  {deathday && (
                    <tr className="border-b border-movie_color/30">
                      <td className="py-3 px-4 font-semibold text-movie_color">Died At</td>
                      <td className="py-3 px-4 font-medium">{deathday}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-movie_color">Birthday</td>
                    <td className="py-3 px-4 font-medium">{birthday}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-lg font-semibold text-secondary_text_color mt-6">
              Follow <span className="text-movie_color">{name}</span>
            </p>
            <div className="flex justify-center gap-3 mt-4 flex-wrap">
              {data?.twitter_id && (
                <Link
                  target="_blank"
                  href={`https://twitter.com/${data.twitter_id}`}
                  className="p-2.5 bg-primary rounded-full border border-movie_color text-movie_color hover:bg-movie_color hover:text-secondary_text_color transition-all duration-300"
                >
                  <FaTwitter size={20} />
                </Link>
              )}
              {data?.facebook_id && (
                <Link
                  target="_blank"
                  href={`https://www.facebook.com/${data.facebook_id}`}
                  className="p-2.5 bg-primary rounded-full border border-movie_color text-movie_color hover:bg-movie_color hover:text-secondary_text_color transition-all duration-300"
                >
                  <FaFacebook size={20} />
                </Link>
              )}
              {data?.instagram_id && (
                <Link
                  target="_blank"
                  href={`https://instagram.com/${data.instagram_id}`}
                  className="p-2.5 bg-primary rounded-full border border-movie_color text-movie_color hover:bg-movie_color hover:text-secondary_text_color transition-all duration-300"
                >
                  <FaInstagram size={20} />
                </Link>
              )}
              {data?.youtube_id && (
                <Link
                  target="_blank"
                  href={`https://www.youtube.com/${data.youtube_id}`}
                  className="p-2.5 bg-primary rounded-full border border-movie_color text-movie_color hover:bg-movie_color hover:text-secondary_text_color transition-all duration-300"
                >
                  <FaYoutube size={20} />
                </Link>
              )}
              {data?.imdb_id && (
                <Link
                  target="_blank"
                  href={`https://www.imdb.com/name/${data.imdb_id}`}
                  className="p-2.5 bg-primary rounded-full border border-movie_color text-movie_color hover:bg-movie_color hover:text-secondary_text_color transition-all duration-300"
                >
                  <FaImdb size={20} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ActorInfo;