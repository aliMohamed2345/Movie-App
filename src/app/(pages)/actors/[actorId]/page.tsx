/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/app/hooks/useFetch";
import ActorCredits from "@/app/Components/Actors/ActorCredits";
import { useDispatch } from "react-redux";
import { setMedia } from "@/app/redux/Slices/MediaSlice";
import ActorProfileLoading from "@/app/Components/Loading/ActorProfileLoading";
import {
  setActorBiography,
  setActorBirthDay,
  setActorDeathDay,
  setActorDepartment,
  setActorGender,
  setActorId,
  setActorName,
  setActorPlaceOfBirth,
} from "@/app/redux/Slices/ActorSlice";
import ActorInfo from "@/app/Components/Actors/ActorInfo";
import ViewActorImages from "@/app/Components/Actors/ViewActorImages";
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
  known_for_department: `Acting` | `Directing`;
}
const ActorId = () => {
  const dispatch = useDispatch();
  const actorId = useSearchParams().get(`id`);
  const { data, loading } = useFetch<actorIdProps>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${actorId}`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });
  useEffect(() => {
    //dispatch all the needed state
    dispatch(setMedia(`movie`));
    dispatch(setActorId(+actorId!));
    dispatch(setActorBiography(data?.biography || ""));
    dispatch(setActorBirthDay(data?.birthday || ""));
    dispatch(setActorDeathDay(data?.deathday || ``));
    dispatch(setActorDepartment(data?.known_for_department || "Acting"));
    dispatch(setActorGender(data?.gender || 1));
    dispatch(setActorName(data?.name || ""));
    dispatch(setActorPlaceOfBirth(data?.place_of_birth || ""));
  }, [dispatch, actorId, data]);
  const pic = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/original${data?.profile_path}`;
  return (
    <>
      <div className="pt-16 mx-auto container flex justify-center items-center flex-col text-text_color ">
        {loading ? (
          <ActorProfileLoading />
        ) : (
          <div className="flex flex-col justify-center sm:flex-row items-center gap-4">
            <div className=" group relative">
              <img
                src={pic}
                alt={data?.name}
                className="rounded-lg object-cover max-w-60 my-4 group-hover:blur-sm transition-all"
              />
              <ViewActorImages />
            </div>
            <div className=" flex flex-col text-center sm:text-left  gap-5">
              <h4 className="text-2xl font-bold">{data?.name}</h4>
              <p className="line-clamp-3  overflow-hidden text-ellipsis w-auto sm:max-w-[40em]">
                {data?.biography}
              </p>
            </div>
          </div>
        )}
        <ActorInfo />
        <ActorCredits />
      </div>
    </>
  );
};

export default ActorId;
