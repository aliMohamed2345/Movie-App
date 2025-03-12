/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/app/hooks/useFetch";
import ActorCredits from "@/app/Components/Actors/ActorCredits";
const ActorId = () => {
  interface actorIdProps {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
  }
  const actorId = useSearchParams().get(`id`);
  const { data } = useFetch<actorIdProps>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${actorId}`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });
  const pic = `https://image.tmdb.org/t/p/original${data?.profile_path}`;
  console.log(data);
  return (
    <>
      <div className="pt-16 mx-auto container flex justify-center items-center flex-col text-text_color ">
        <div className="flex flex-col justify-center sm:flex-row items-center gap-4">
          <img
            src={pic}
            alt={data?.name}
            className="rounded-lg object-cover max-w-60 my-4"
          />
          <div className=" flex flex-col text-center sm:text-left  gap-5">
            <h4 className="text-2xl font-bold">{data?.name}</h4>
            <p className="line-clamp-3  overflow-hidden text-ellipsis w-auto sm:max-w-[40em]">
              {data?.biography}
            </p>
          </div>
        </div>
        {/* <ActorInfo biography={data?.biography} /> */}
        {/* <button className="p-2 hover:bg-movie_color_hover text-white transition-all bg-movie_color rounded-md mt-4 w-40 font-bold">
          See more
        </button> */}
        <ActorCredits id={+actorId!} media={`movie`} />
      </div>
    </>
  );
};

export default ActorId;
