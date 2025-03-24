"use client";
import ActorCard, { actorInfoProps } from "@/app/Components/Actors/ActorCard";
import { useFetch } from "@/app/hooks/useFetch";
import React, { useEffect, useState } from "react";
import useInfiniteScroll from "@/app/hooks/useInfinityScroll";
import MediaGridLoading from "@/app/Components/Loading/MediaGridLoading";
interface ActorsData {
  page: number;
  total_results: number;
  total_pages: number;
  results: actorInfoProps[];
}
const Actors = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [actorsData, setActorsData] = useState<actorInfoProps[]>([]);
  const { data, loading } = useFetch<ActorsData>({
    url: `https://api.themoviedb.org/3/person/popular?page=${currentPage}&include_adult=false`,
    options: {
      method: `GET`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });
  const lastElementRef = useInfiniteScroll(
    setCurrentPage,
    (data?.results && data?.results?.length > 0 && data?.total_pages) || 0
  );
  useEffect(() => {
    if (data?.results) {
      setActorsData((prevData) => [...prevData, ...data.results]);
    }
  }, [data]);

  return (
    <div
      className="container mx-auto flex flex-col items-center"
      ref={lastElementRef}
    >
      <p className="pt-16 my-4 text-2xl text-movie_color">
        Popular Actors And Directors
      </p>
      {loading ? (
        <MediaGridLoading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-center gap-3 ">
          {actorsData?.length > 0 &&
            actorsData.map((actorInfo, i) => {
              const { name, id, popularity, profile_path } = actorInfo;
              if (!profile_path) return;
              return (
                <div
                  key={i}
                  ref={i === actorsData.length - 1 ? lastElementRef : null}
                >
                  <ActorCard
                    key={i}
                    id={id}
                    name={name}
                    popularity={popularity}
                    profile_path={profile_path}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Actors;
