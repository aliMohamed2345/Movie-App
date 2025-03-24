/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { MdZoomOutMap } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Keyboard, Navigation, Zoom } from "swiper/modules";
// Swiper css files
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import { useFetch } from "@/app/hooks/useFetch";
import { setBackDropsImages } from "@/app/redux/Slices/MediaDataSlice";

interface FetchedData {
  id: number;
  backdrops: ImageProps[];
  posters: ImageProps[];
}
interface ImageProps {
  aspect_ratio: number;
  file_path: string;
  height: number;
  vote_average: number;
  vote_count: number;
  width: number;
}

const ViewMediaImages = () => {
  const dispatch = useDispatch();
  const [isImagesOpened, setIsImagesOpened] = useState(false);
  const [posters, setPosters] = useState<ImageProps[]>();
  const { id } = useSelector((state: RootState) => state.MediaData);
  const { media } = useSelector((state: RootState) => state.Media);
  const { data } = useFetch<FetchedData>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${media}/${id}/images`,
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
      setPosters(data.posters);
      dispatch(setBackDropsImages(data.backdrops));
    }
  }, [data, dispatch]);

  return (
    <>
      {/* Overlay that appears on hover */}
      <div className="absolute inset-0  flex-col items-center justify-center hidden group-hover:flex transition-all delay-150 text-white">
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
            modules={[Navigation, Keyboard, Zoom]}
            loop
            keyboard={{ enabled: true }}
            navigation
            zoom={{ maxRatio: 3, minRatio: 1 }}
            slidesPerView={1}
            className="mySwiper object-cover w-[80vw] sm:w-[55vw] md:w-[60vw] lg:w-[32vw] flex items-center justify-center max-w-screen-lg"
          >
            {posters?.map((poster, i) => {
              const { file_path, width, height } = poster;
              const pic = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/original/${file_path}`;
              return (
                <SwiperSlide
                  key={i}
                  className="flex items-center justify-center"
                >
                  <div className="swiper-zoom-container">
                    <img
                      width={width}
                      height={height}
                      loading="lazy"
                      src={pic}
                      title={`poster number ${i + 1}`}
                      alt={`Image ${i + 1}`}
                      className="w-auto max-w-full h-auto max-h-full object-cover rounded-lg shadow-md mx-auto"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ViewMediaImages;
