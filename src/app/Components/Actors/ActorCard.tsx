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
      className="flex flex-col items-center text-text_color bg-secondary rounded-md max-w-[280px] group relative cursor-pointer border-[3px] border-text_color hover:border-movie_color"
    >
      {profile_path ? (
        <img
          title={name}
          src={pic}
          alt={name}
          loading="lazy"
          className={`object-cover w-full h-full rounded-sm hover:scale-[1.01] transition-all`}
        />
      ) : (
        <span className="flex justify-center flex-col p-1  text-text_color">
          <MdBrokenImage size={225} color={`var(--movie_color)`} />
          <p className="text-center text-2xl">no image available</p>
        </span>
      )}
      <h4 className="text-md my-1 font-bold text-text_color">{name}</h4>
      {character && (
        <h5 className="text-sm my-1 font-bold">
          as <span className="text-movie_color font-bold">{character}</span>
        </h5>
      )}
      {popularity && (
        <p className="flex gap-2 m-2 items-center">
          {popularity.toFixed(2)} <FaEye color="var(--movie_color)" />
        </p>
      )}
      <div className="absolute bg-black/80 w-full h-full inset-0 rounded-md  opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center" />
    </Link>
  );
};

export default ActorCard;
