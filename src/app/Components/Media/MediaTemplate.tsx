import { useFetch } from "@/app/hooks/useFetch";
import { useState, useEffect } from "react";
import useInfiniteScroll from "@/app/hooks/useInfinityScroll";
import MediaGridLoading from "../Loading/MediaGridLoading";
import MediaGrid from "./MediaGrid";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { moviesProps } from "./Parallax";
import {
  moviesGenres,
  tvGenres,
} from "@/app/data/movieCategories";
export interface categoryDataProps extends moviesProps {
  total_pages: number;
  total_results: number;
}
const MediaTemplate = () => {
  const { media, category, genre } = useSelector(
    (state: RootState) => state.Media
  );
  const { URL } = useSelector((state: RootState) => state.Search);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoryData, setCategoryData] = useState<categoryDataProps[]>([]);
  const validCategory =
    category!.split("_")?.length > 1
      ? category?.split("_").join(" ")
      : category;
  const currentGenre =
    media === "movie"
      ? moviesGenres[genre as keyof typeof moviesGenres]
      : tvGenres[genre as keyof typeof tvGenres];
  const { data, loading } = useFetch<categoryDataProps>({
    url: `${URL}?page=${currentPage}&include_adult=false&api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }${genre > 0 && "&with_genres=" + genre}`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });

  useEffect(() => {
    if (data) {
      setCategoryData((prevData) => [...prevData, data]);
    }
  }, [data]);

  const lastElementRef = useInfiniteScroll(setCurrentPage, data?.total_pages);
  return (
    <>
      {loading ? (
        <MediaGridLoading numberOfLoadingElements={15} />
      ) : (
        <>
          <h3 className="pt-20 pb-5 text-movie_color text-xl sm:text-3xl text-center">
            Discover {categoryData[0]?.total_results}{" "}
            {genre ? currentGenre : validCategory}
            {media === "movie" ? ` Movies` : ` TV Shows`}
          </h3>
          <MediaGrid
            categoryData={categoryData}
            lastElementRef={lastElementRef}
          />
        </>
      )}
    </>
  );
};

export default MediaTemplate;
