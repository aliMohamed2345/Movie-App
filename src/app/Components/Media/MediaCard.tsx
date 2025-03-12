"use client";
import Link from "next/link";
import React from "react";

interface mediaProps {
  media: `tv` | `movie`;
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
  };
}
const MediaCard = ({ mediaData, media }: mediaProps) => {
  const pic = `https://image.tmdb.org/t/p/w780/${mediaData.poster_path}`;

  return (
    <Link
      // href={`/movies/${mediaData.id}`}
      href={{
        pathname: `${media}/${mediaData.id}`,
        query: { media, id: mediaData.id },
      }}
      className="group cursor-pointer flex flex-col relative bg-secondary w-full min-h-[460px] rounded-sm overflow-hidden text-text_color"
    >
      {/* Image Section */}
      <img
        src={pic}
        alt={mediaData.title}
        loading="lazy"
        className="object-cover w-full h-full "
        height={200}
      />
      {/* Info Section */}
      <div className=" p-2 flex flex-col justify-center">
        <h6 className="text-movie_color text-center">
          {mediaData.title || mediaData.name}
        </h6>
        <p className="text-sm text-center">{mediaData.vote_average} / 10</p>
        <p className="font-bold text-sm text-center">
          {mediaData?.release_date?.slice(0, 4)}
        </p>
      </div>
    </Link>
  );
};

export default MediaCard;
