/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { moviesGenres, tvGenres } from "@/app/data/movieCategories";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { MdBrokenImage } from "react-icons/md";
interface MediaDataProps {
  mediaData: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    name?: string;
    first_air_date?: string;
  };
}
const MediaCard = ({ mediaData }: MediaDataProps) => {
  const { media } = useSelector((state: RootState) => state.Media);
  const pic = `https://image.tmdb.org/t/p/w780/${mediaData.poster_path}`;
  return (
    <div
      className={`group transition-all cursor-pointer border-[3px] border-text_color hover:border-movie_color ${
        !mediaData.poster_path && `justify-around`
      } flex flex-col gap-2 relative bg-secondary w-full h-full min-h-[425px] rounded-lg overflow-hidden text-text_color`}
    >
      {/* Overlay that appears on hover */}
      <div className="bg-black/80 text-white w-full h-full opacity-0 gap-2 group-hover:opacity-100 absolute inset-0 transition-all flex flex-col items-center justify-center text-2xl">
        <p>
          {mediaData?.release_date?.split("-")[0] ||
            mediaData?.first_air_date?.split("-")[0]}
        </p>
        {mediaData?.vote_average && (
          <h3 className="flex gap-2 items-center">
            <FaStar color="gold" />
            {mediaData?.vote_average?.toFixed(1)} | 10
          </h3>
        )}
        {mediaData?.genre_ids?.map((id) => (
          <span key={id}>
            {media === "movie"
              ? moviesGenres[id as keyof typeof moviesGenres]
              : tvGenres[id as keyof typeof tvGenres]}
          </span>
        ))}
        <Link
          className="p-2 hover:bg-movie_color_hover transition-all bg-movie_color rounded-md"
          href={{
            pathname: `${media}/${mediaData.id}`,
            query: { media, id: mediaData.id },
          }}
        >
          View Details
        </Link>
      </div>
      {mediaData.poster_path ? (
        <img
          title={mediaData.name}
          src={pic}
          alt={mediaData?.title}
          loading="lazy"
          className={`object-cover w-full h-full `}
        />
      ) : (
        <span className="flex justify-center flex-col p-1  text-text_color">
          <MdBrokenImage size={225} color={`var(--movie_color)`} />
          <p className="text-center text-2xl">no image available</p>
        </span>
      )}
      {/* Info Section */}
      <div className="p-2 flex flex-col justify-center">
        <h6 className="text-text_color p-1 border-[1px] gap-1 flex justify-center items-center font-bold text-center bg-primary rounded-full border-text_color sm:text-sm">
          {mediaData?.original_language !== "en" && (
            <span className="text-[8px] text-movie_color">
              [{mediaData?.original_language}]
            </span>
          )}
          {mediaData?.title || mediaData?.name}
        </h6>
      </div>
    </div>
  );
};

export default MediaCard;
