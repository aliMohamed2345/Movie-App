/* eslint-disable @next/next/no-img-element */
import { useFetch } from "@/app/hooks/useFetch";
import React from "react";
import { mediaDurationCalculator } from "@/app/utils/mediaDurationCalculator";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import MediaDetailsLoading from "../Loading/MediaDetailsLoading";
import ViewMediaImages from "./ViewMediaImages";
import { FaStar } from "react-icons/fa";
import MediaSimilarSlider from "./MediaSimilarSlider";
import MediaScenesSlider from "./MediaScenesSlider";
import MediaCastSlider from "./MediaCastSlider";
interface MediaProps {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: [{ id: number; name: string }];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    { id: number; logo_path: string; name: string; origin_country: string }
  ];
  production_countries: [{ iso_3166_1: string; name: string }];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [{ english_name: string; iso_639_1: string; name: string }];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  first_air_date?: string;
  original_name?: string;
  last_air_date?: string;
  episode_run_time?: number[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  in_production: true;
}

const MediaIdTemplate = () => {
  const { media } = useSelector((state: RootState) => state.Media);
  const { id } = useSelector((state: RootState) => state.MediaData);
  const { data, loading } = useFetch<MediaProps>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${media}/${+id}`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });
  const moviePic = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/original${data?.poster_path}`;
  return (
    <div className="container mx-auto pt-20 text-text_color px-4">
      {loading ? (
        <MediaDetailsLoading />
      ) : (
        <>
          {/* Movie Details Section */}
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            {/* Movie Poster */}
            <div className="relative group w-[250px] sm:w-[300px]">
              <img
                loading="lazy"
                src={moviePic}
                alt={data?.title}
                className="rounded-lg object-cover shadow-md w-full transition-all duration-300 group-hover:blur-sm"
              />
              <ViewMediaImages />
            </div>

            {/* Movie Information */}
            <div className="flex flex-col sm:w-[60%] w-full text-center sm:text-left">
              <h5 className="text-movie_color font-bold text-3xl flex flex-col sm:flex-row items-center sm:items-start gap-2">
                <span className="text-sm font-extrabold">
                  [{data?.origin_country}]
                </span>
                {data?.title || data?.name} (
                {data?.release_date?.split(`-`)[0] ||
                  data?.first_air_date?.split("-")[0]}
                )
              </h5>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-lg font-semibold">
                <FaStar color="gold" />
                {data?.vote_average?.toFixed(1)} / 10 ({data?.vote_count})
              </div>
              {data?.in_production && (
                <span className="text-movie_color font-bold my-1">
                  In Production
                </span>
              )}
              <p className="text-text_color mt-4 leading-relaxed">
                {data?.overview}
              </p>

              {/* Genres */}
              <div className="flex flex-wrap gap-3 mt-5 justify-center sm:justify-start">
                {data?.genres?.map((genre) => (
                  <button
                    key={genre.id}
                    className="bg-movie_color text-white px-3 py-1.5 rounded-md font-semibold hover:bg-movie_color_hover transition-all"
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-10 flex-col">
            {/* Movie Info */}
            <div className=" p-6  mt-10">
              <h2 className="text-movie_color font-bold text-2xl text-center mb-4">
                {media === `movie` ? `Movie Info` : `TV Show Info`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center gap-4 font-medium">
                {data?.original_language !== "en" && (
                  <p>
                    <span className="text-movie_color font-bold">
                      Original Title :
                    </span>{" "}
                    {data?.original_title ||
                      data?.original_name ||
                      "Not Available"}
                  </p>
                )}
                <p>
                  <span className="text-movie_color font-bold">Status :</span>{" "}
                  {data?.status || "Unknown"}
                </p>
                <p>
                  <span className="text-movie_color font-bold">
                    {!data?.first_air_date
                      ? `Release Date :`
                      : `First Air Date :`}
                  </span>{" "}
                  {data?.release_date ||
                    data?.first_air_date ||
                    "Not Available"}
                </p>
                {data?.last_air_date && (
                  <p>
                    <span className="text-movie_color font-bold">
                      Last Air Date :
                    </span>{" "}
                    {data?.release_date ||
                      data?.first_air_date ||
                      "Not Available"}
                  </p>
                )}
                <p>
                  <span className="text-movie_color font-bold">
                    {data?.episode_run_time
                      ? `Episode Duration :`
                      : `Duration :`}
                  </span>{" "}
                  {data?.runtime
                    ? mediaDurationCalculator(data?.runtime)
                    : data?.episode_run_time
                    ? mediaDurationCalculator(data.episode_run_time[0])
                    : `Not Available`}
                </p>
                {data?.budget && (
                  <p>
                    <span className="text-movie_color font-bold">Budget :</span>{" "}
                    {data?.budget
                      ? `${data.budget.toLocaleString()}$`
                      : "Not Available"}
                  </p>
                )}
                {data?.revenue && (
                  <p>
                    <span className="text-movie_color font-bold">
                      Revenue :
                    </span>{" "}
                    {data?.revenue
                      ? `${data.revenue.toLocaleString()}$`
                      : "Not Available"}
                  </p>
                )}
                {data?.number_of_episodes && (
                  <p>
                    <span className="text-movie_color font-bold">
                      Number Of Episodes :
                    </span>{" "}
                    {data?.number_of_episodes
                      ? `${data.number_of_episodes}`
                      : "Not Available"}
                  </p>
                )}
                {data?.number_of_seasons && (
                  <p>
                    <span className="text-movie_color font-bold">
                      Number Of Seasons :
                    </span>{" "}
                    {data?.number_of_seasons
                      ? `${data.number_of_seasons}`
                      : "Not Available"}
                  </p>
                )}
              </div>
            </div>

            {/* Cast Section */}
            <div className=" p-6 mt-10">
              <h3 className="text-2xl font-bold my-3 text-movie_color text-center">
                Top Billed Cast
              </h3>
              <MediaCastSlider />
            </div>

            {/* Media Section */}
            <div className="bg-secondary p-3 mb-5 rounded-xl">
              <h3 className="text-2xl font-bold mb-3 text-movie_color text-center">
                Media
              </h3>
              <MediaScenesSlider />
            </div>
            {/* Similar Movies */}

            <div>
              <h3 className="text-2xl font-bold mb-3 text-movie_color text-center">
                Similar Movies
              </h3>
              <MediaSimilarSlider />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MediaIdTemplate;
