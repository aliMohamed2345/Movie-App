/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { MdZoomOutMap } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Keyboard, Navigation, Zoom } from "swiper/modules";
//Swiper css files
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import { useFetch } from "@/app/hooks/useFetch";
interface FetchedData {
  id: number;
  profiles: ProfileProps[];
}
interface ProfileProps {
  aspect_ratio: number;
  file_path: string;
  height: number;
  vote_average: number;
  vote_count: number;
  width: number;
}

const ViewActorImages = () => {
  const [isImagesOpened, setIsImagesOpened] = useState(false);
  const [profiles, setProfiles] = useState<ProfileProps[]>();
  const { id } = useSelector((state: RootState) => state.Actor);
  const { data } = useFetch<FetchedData>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${id}/images`,
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
      setProfiles(data?.profiles);
    }
  }, [data]);
  return (
    <>
      {/* View More Button & Icon */}
      <div className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute hidden group-hover:block text-center transition-all delay-150 text-white">
        <MdZoomOutMap size={180} className="opacity-60" />
        <button
          onClick={() => setIsImagesOpened(true)}
          className="text-xl mt-3 px-4 py-2 bg-movie_color rounded-md hover:bg-movie_color/80 transition"
        >
          View More
        </button>
      </div>

      {/* Full-Screen Overlay */}
      {isImagesOpened && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsImagesOpened(false)}
            className="absolute top-5 right-5 text-white text-3xl bg-movie_color hover:bg-movie_color_hover rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition"
          >
            <IoClose />
          </button>

          <Swiper
            modules={[Navigation, Keyboard, Zoom]} //adding navigation buttons , pagination buttons, applying the keyboard array navigation And adding the ability to zoom in and out
            loop
            keyboard={{ enabled: true }} //  Enable keyboard navigation
            zoom={{ maxRatio: 3, minRatio: 1 }} //  Enable zoom with limits
            navigation
            slidesPerView={1} // Only one image per view
            className="mySwiper w-full h-[650px] flex items-center justify-center max-w-screen-lg"
          >
            {profiles?.map((profile, i) => {
              const { file_path, width, height } = profile;
              const pic = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/original/${file_path}`;
              return (
                <SwiperSlide
                  key={i}
                  className="flex items-center justify-center"
                >
                  <SwiperSlide className="flex justify-center items-center">
                    <div className="swiper-zoom-container">
                      <img
                        width={width}
                        height={height}
                        loading="lazy"
                        src={pic}
                        title={`image number ${i + 1}`}
                        alt={`Image number ${i + 1}`}
                        className="w-[80vw] sm:w-[55vw] md:w-[60vw] lg:w-[35vw] object-cover rounded-md shadow-md mx-auto "
                      />
                    </div>
                  </SwiperSlide>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ViewActorImages;
