/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { MdBrokenImage } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { moviesGenres, tvGenres } from "@/app/data/movieCategories";

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
  const imageURL = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/w780/${mediaData.poster_path}`;
  const releaseYear =
    mediaData?.release_date?.split("-")[0] ||
    mediaData?.first_air_date?.split("-")[0];

  const genres = mediaData.genre_ids.map((id) =>
    media === "movie"
      ? moviesGenres[id as keyof typeof moviesGenres]
      : tvGenres[id as keyof typeof tvGenres]
  );

  return (
    <Link
      href={{
        pathname: `/${media}/${mediaData.id}`,
        query: { media, id: mediaData.id },
      }}
      className="relative block rounded-xl overflow-hidden group shadow-md border-2 border-border hover:border-movie_color bg-secondary transition-all duration-300 hover:shadow-lg"
    >
      {/* Image or fallback */}
      {mediaData.poster_path ? (
        <img
          src={imageURL}
          alt={mediaData.title || mediaData.name || "poster"}
          loading="lazy"
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-72 bg-background flex flex-col items-center justify-center text-muted-foreground gap-2">
          <MdBrokenImage size={64} />
          <p className="text-sm font-medium">No image available</p>
        </div>
      )}

      {/* Overlay on hover */}
      <div className="absolute inset-0 w-full h-full bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2 text-white">
        <div className="flex justify-between items-center text-sm">
          <span className="bg-movie_color text-white px-2 py-0.5 rounded-full text-sm font-semibold">
            {releaseYear}
          </span>
          {mediaData.vote_average > 0 && (
            <span className="flex items-center gap-1 text-sm">
              <FaStar className="text-yellow-400" />
              {mediaData.vote_average.toFixed(1)}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1 text-sm">
          {genres.map((genre, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-white/10 border border-white/20 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Title Section */}
      <div className="p-3 bg-background text-center">
        <h3 className="text-sm font-bold text-foreground line-clamp-2">
          {mediaData.original_language !== "en" && (
            <span className="text-movie_color font-semibold mr-1">
              [{mediaData.original_language}]
            </span>
          )}
          {mediaData.title || mediaData.name}
        </h3>
      </div>
    </Link>
  );
};

export default MediaCard;
