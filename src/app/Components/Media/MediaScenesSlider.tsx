/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useFetch } from "@/app/hooks/useFetch";
import { GoPlay } from "react-icons/go";
import Link from "next/link";
import { useState } from "react";
import { GiTv } from "react-icons/gi";
import { BiCameraMovie } from "react-icons/bi";

interface videoProps {
  results: {
    type: `Trailer` | `Featurette` | `Clip` | `Teaser` | `Behind the Scenes`;
    site: string;
    id: string;
    key: string;
    name: string;
    size: number;
    official: boolean;
  }[];
}

const MediaScenesSlider = () => {
  const { backdrops, id } = useSelector((state: RootState) => state.MediaData);
  const { media } = useSelector((state: RootState) => state.Media);
  const { data } = useFetch<videoProps>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${media}/${id}/videos`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });

  const TypeSortOrder = [
    "Trailer",
    "Teaser",
    "Clip",
    "Featurette",
    "Behind the Scenes",
  ];

  const [currentMedia, setCurrentMedia] = useState<`videos` | `photos`>(
    "videos"
  );
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // Sort videos based on priority order
  const sortedVideos =
    data?.results
      ?.slice()
      .sort(
        (a, b) => TypeSortOrder.indexOf(a.type) - TypeSortOrder.indexOf(b.type)
      ) || [];

  return (
    <div className="w-full max-w-[1280px] mx-auto pb-5">
      <div className="flex w-full my-5 gap-2">
        <button
          className={`px-4 py-2 rounded-md text-md w-1/2 hover:bg-movie_color hover:text-white transition-all font-bold ${
            currentMedia === "videos"
              ? "bg-movie_color text-white"
              : "bg-primary text-movie_color"
          }`}
          onClick={() => setCurrentMedia("videos")}
        >
          Videos
        </button>
        <button
          className={`px-4 py-2 rounded-md text-md w-1/2 hover:bg-movie_color hover:text-white transition-all font-bold ${
            currentMedia === "photos"
              ? "bg-movie_color text-white"
              : "bg-primary text-movie_color"
          }`}
          onClick={() => setCurrentMedia("photos")}
        >
          Photos
        </button>
      </div>

      {currentMedia === "videos" ? (
        sortedVideos.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            spaceBetween={15}
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 1, spaceBetween: 15 },
              1024: { slidesPerView: 2, spaceBetween: 20 },
              1280: { slidesPerView: 3, spaceBetween: 15 },
            }}
            className="mySwiper cursor-grab flex items-center w-full"
          >
            {sortedVideos.map((result, i) => (
              <SwiperSlide key={i}>
                <Link
                  href={`https://youtube.com/watch?v=${result.key}`}
                  target="_blank"
                  className="relative group"
                  rel="noopener noreferrer"
                >
                  <img
                    title={`Video ${i + 1}`}
                    src={`https://img.youtube.com/vi/${result.key}/hqdefault.jpg`}
                    alt={result.name}
                    className="object-cover rounded-md hover:shadow-md"
                    loading="lazy"
                  />
                  <div className="absolute w-full h-full bg-black/60 inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex justify-center items-center">
                    <GoPlay
                      color="white"
                      size={50}
                      className="transition-all"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 my-16">
            <GiTv size={200} color="var(--movie_color)" />
            <h2 className="text-lg sm:text-3xl font-bold text-center">
              No videos available
            </h2>
          </div>
        )
      ) : backdrops.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          spaceBetween={15}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 1, spaceBetween: 15 },
            1024: { slidesPerView: 2, spaceBetween: 20 },
            1280: { slidesPerView: 3, spaceBetween: 15 },
          }}
          className="mySwiper cursor-grab flex items-center w-full"
        >
          {backdrops.map((backdrop, i) => {
            if (!backdrop.file_path) return null;
            return (
              <SwiperSlide key={i} className="flex items-center justify-center">
                <img
                  onClick={() => setCurrentImage(backdrop.file_path)}
                  src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/original/${backdrop.file_path}`}
                  alt={`Backdrop ${i + 1}`}
                  className="object-cover rounded-md hover:scale-[1.05] w-full h-full transition-all"
                  loading="lazy"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 my-16">
          <BiCameraMovie size={200} color="var(--movie_color)" />
          <h2 className="text-lg sm:text-3xl font-bold text-center">
            No photos available
          </h2>
        </div>
      )}

      {currentMedia === "photos" && currentImage && (
        <div
          className="inset-0 w-full h-full z-50 fixed bg-black/80 flex justify-center items-center cursor-auto"
          onClick={() => setCurrentImage(null)}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/original/${currentImage}`}
            alt="Current backdrop"
            className="object-cover w-[90vw] sm:w-[72vw] rounded-lg container mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default MediaScenesSlider;
