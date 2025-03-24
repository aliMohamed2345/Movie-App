"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/app/hooks/useFetch";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/app/redux/Slices/SearchSlice";
import { setMedia } from "@/app/redux/Slices/MediaSlice";
import MediaGridLoading from "@/app/Components/Loading/MediaGridLoading";
import PageSearchBar from "@/app/Components/Search/PageSearchBar";
import ActorCard, { actorInfoProps } from "@/app/Components/Actors/ActorCard";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchPage = () => {
  const dispatch = useDispatch();
  const q = useSearchParams().get("q") || "";
  const media = useSearchParams().get("media") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryData, setCategoryData] = useState<actorInfoProps[]>([]);

  const { data, loading } = useFetch<{
    results: actorInfoProps[];
    total_pages: number;
  }>({
    url: `https://api.themoviedb.org/3/search/${media}?query=${q}&include_adult=false&page=${currentPage}`,
    options: {
      method: `GET`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });

  useEffect(() => {
    if (data?.results) {
      setCategoryData((prevData) => [...prevData, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    dispatch(setSearchQuery(q));
    dispatch(setMedia(media));
  }, [dispatch, media, q]);

  useEffect(() => {
    setCategoryData([]);
    setCurrentPage(1);
  }, [q, media]);
  console.log(categoryData);
  return (
    <>
      <PageSearchBar />
      <div className="py-20"></div>
      {loading ? (
        <MediaGridLoading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categoryData.map((actor, i) => {
            if (!actor.profile_path) return;
            return (
              <ActorCard
                key={i}
                id={actor.id}
                name={actor.original_name || ""}
                popularity={actor.popularity}
                profile_path={actor.profile_path}
              />
            );
          })}
        </div>
      )}
      {!loading && categoryData?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 my-32">
          <BiSearchAlt2 size={200} className="text-movie_color" />
          <h2 className="text-lg sm:text-4xl font-bold text-center text-movie_color">
            No results found
          </h2>
          <p className="text-xs sm:text-xl text-text_color font-bold text-center max-w-lg">
            The Term &quot;{q}&quot; Don&apos;t Exist For {media && `Actor`}
          </p>
        </div>
      )}
    </>
  );
};

export default SearchPage;
