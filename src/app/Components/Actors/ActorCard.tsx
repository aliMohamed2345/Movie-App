/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { MdBrokenImage } from "react-icons/md";

export interface actorInfoProps {
  id: number;
  name: string;
  original_name?: string;
  media_type?: string;
  adult?: boolean;
  popularity: number;
  gender?: number;
  known_for_department?: string;
  profile_path: string;
  known_for?: [];
  character?: string;
}

const ActorCard = ({
  id,
  name,
  popularity,
  profile_path,
  character,
}: actorInfoProps) => {
  const pic = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/original${profile_path}`;

  return (
    <Link
      href={{
        pathname: `/actors/${name.split(` `).join(`_`)}`,
        query: { id },
      }}
      className="relative flex flex-col items-center bg-secondary rounded-xl max-w-[280px] group cursor-pointer border-2 border-transparent hover:border-movie_color transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
    >
      {profile_path ? (
        <div className="relative w-full h-[350px] overflow-hidden rounded-t-xl">
          <img
            title={name}
            src={pic}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-[350px] bg-primary rounded-t-xl">
          <MdBrokenImage size={100} color="var(--movie_color)" />
          <p className="text-center text-lg text-text_color mt-2">No Image Available</p>
        </div>
      )}
      <div className="p-4 w-full text-center">
        <h4 className="text-lg font-semibold text-secondary_text_color tracking-tight">{name}</h4>
        {character && (
          <h5 className="text-sm font-medium text-text_color mt-1">
            as <span className="text-movie_color font-semibold">{character}</span>
          </h5>
        )}
        {popularity && (
          <p className="flex items-center justify-center gap-2 mt-2 text-sm text-text_color">
            {popularity.toFixed(2)} <FaEye color="var(--movie_color)" size={16} />
          </p>
        )}
      </div>
      <div className="absolute inset-0 bg-primary/80 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </Link>
  );
};

export default ActorCard;