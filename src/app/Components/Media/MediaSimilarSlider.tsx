import { useFetch } from "@/app/hooks/useFetch";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { moviesProps } from "./Parallax";
import MediaCard from "./MediaCard";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
const MediaSimilarSlider = () => {
  const { media } = useSelector((state: RootState) => state.Media);
  const { id } = useSelector((state: RootState) => state.MediaData);
  const { data } = useFetch<moviesProps>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${media}/${+id}/similar`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });
  return (
    <div className="max-w-[90%] lg:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-4">
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={1}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 8 },
          480: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 25 },
        }}
        className="mySwiper cursor-grab bg-primary flex items-center"
      >
        {data?.results.map((object, i) => {
          if (!object.poster_path) return;
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

export default MediaSimilarSlider;
