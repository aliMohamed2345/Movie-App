"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MediaGrid from "@/app/Components/Media/MediaGrid";
import useInfiniteScroll from "@/app/hooks/useInfinityScroll";
import { useFetch } from "@/app/hooks/useFetch";
import { categoryDataProps } from "@/app/Components/Media/MediaTemplate";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/app/redux/Slices/SearchSlice";
import { setMedia } from "@/app/redux/Slices/MediaSlice";
import MediaGridLoading from "@/app/Components/Loading/MediaGridLoading";
import PageSearchBar from "@/app/Components/Search/PageSearchBar";
import { BiSearchAlt2 } from "react-icons/bi";
const SearchPage = () => {
  const dispatch = useDispatch();
  const q = useSearchParams().get("q") || "";
  const media = useSearchParams().get("media") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryData, setCategoryData] = useState<categoryDataProps[]>([]);
  const { data, loading } = useFetch<categoryDataProps[]>({
    url: `https://api.themoviedb.org/3/search/${media}?query=${q}&include_adult=false&page=${currentPage}`,
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
    categoryData.length > 0 ? categoryData[0].total_pages : 0
  );
  useEffect(() => {
    if (data) {
      setCategoryData((prevData) => {
        //this will check weather the data is array or not for fetching it and added to the categoryData
        return Array.isArray(data)
          ? [...prevData, ...data]
          : [...prevData, data];
      });
    }
  }, [data]);
  console.log(data);
  useEffect(() => {
    dispatch(setSearchQuery(q));
    dispatch(setMedia(media));
  }, [dispatch, media, q]);

  //when the search query changes it , will remove all the old results
  useEffect(() => {
    setCategoryData([]);
    setCurrentPage(1);
  }, [q, media]);
  return (
    <>
      <PageSearchBar />
      <div className="py-20"></div>
      {loading ? (
        <MediaGridLoading />
      ) : (
        <MediaGrid
          categoryData={categoryData}
          lastElementRef={lastElementRef}
        />
      )}
      {!loading && categoryData[0] && categoryData[0].results && (
        <div className="flex flex-col items-center justify-center gap-4 my-32">
          <BiSearchAlt2 size={200} className="text-movie_color" />
          <h2 className="text-lg sm:text-4xl font-bold text-center text-movie_color">
            No results found
          </h2>
          <p className="text-xs sm:text-xl text-text_color font-bold text-center max-w-lg">
            The Term &quot;{q}&quot; Don&apos;t Exist For{" "}
            {media === `movie` ? `Movies` : `TV Shows`}
          </p>
        </div>
      )}
    </>
  );
};

export default SearchPage;
