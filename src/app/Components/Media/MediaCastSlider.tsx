import { useFetch } from "@/app/hooks/useFetch";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ActorCard, { actorInfoProps } from "../Actors/ActorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface castProps {
  id: number;
  cast: actorInfoProps[];
}

const MediaCastSlider = () => {
  const { media } = useSelector((state: RootState) => state.Media);
  const { id } = useSelector((state: RootState) => state.MediaData);
  const { data } = useFetch<castProps>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${media}/${+id}/credits`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });

  const castMembers = data?.cast || [];

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      {castMembers.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          spaceBetween={15}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 10 },
          }}
          className="mySwiper cursor-grab bg-primary flex items-center w-full"
        >
          {castMembers.map((castMember) => {
            if (!castMember.profile_path) return;
            return (
              <SwiperSlide
                key={castMember.id}
                className=" flex items-center justify-center"
              >
                <ActorCard
                  character={castMember.character}
                  popularity={castMember.popularity}
                  name={castMember.name || "Unknown"}
                  profile_path={castMember.profile_path}
                  id={castMember.id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p className="text-center text-text_color">
          No cast information available.
        </p>
      )}
    </div>
  );
};

export default MediaCastSlider;
