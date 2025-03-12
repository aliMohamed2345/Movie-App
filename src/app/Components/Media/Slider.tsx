"use client";
import { SwiperSlide, Swiper } from "swiper/react";
import MediaCard from "./MediaCard";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useFetch } from "@/app/hooks/useFetch";
import SliderLoading from "../Loading/SliderLoading";
import SeeMore from "./SeeMore";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setMedia } from "@/app/redux/Slices/MediaSlice";
import { useEffect } from "react";
export interface TvProps {
  results: [
    {
      first_air_date: string;
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
    }
  ];
}
const Slider = ({ category }: { category: string }) => {
  const dispatch = useDispatch();
  const { media } = useSelector((state: RootState) => state.Media);
  //get the current media props
  const currentMedia = media === `movie` ? `movies` : `TV Shows`;
  //validate the title to be added to the slider
  const validTitle =
    category.split(" ").length > 1
      ? `Discover ${category} ${currentMedia}`
      : `Discover ${category.split("_").join(" ")} ${currentMedia}`;
  const { data, loading } = useFetch<TvProps>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${media}/${category}`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });
  useEffect(() => {
    dispatch(setMedia(currentMedia === "movies" ? `movie` : `tv`));
  }, [dispatch, currentMedia]);
  return (
    <div className="relative container mx-auto text-text_color my-5  ">
      <div className="flex items-center justify-between mx-2">
        <h4 className="font-bold text-md sm:text-xl my-3">{validTitle}</h4>
        <Link
          href={{
            pathname: `/${media}/${category}`,
            query: { media, category },
          }}
          className="text-movie_color hover:text-movie_color_hover hidden sm:block"
        >
          See more
        </Link>
      </div>
      {loading && <SliderLoading />}
      <Swiper
        modules={[Navigation, Scrollbar]}
        navigation
        // Default configuration is overridden by breakpoints
        slidesPerView={1}
        breakpoints={{
          // When viewport is 0px or more (very small devices)
          0: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          // When viewport is 480px or more (small phones)
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // When viewport is 768px or more (tablets)
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          // When viewport is 1024px or more (laptops)
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          // When viewport is 1280px or more (desktops)
          1280: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
        }}
        className="mySwiper mx-auto cursor-grab bg-primary flex items-center"
      >
        {data?.results.map((object, i) => {
          if (i === data.results.length - 1) {
            return (
              <SwiperSlide key={i}>
                <SeeMore category={category} />
              </SwiperSlide>
            );
          }
          return (
            <SwiperSlide key={i} className="w-[250px]">
              <MediaCard mediaData={object} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
