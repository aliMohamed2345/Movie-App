/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useFetch } from "@/app/hooks/useFetch";
import { moviesGenres, tvGenres } from "@/app/data/movieCategories";
import CarouseLoading from "../Loading/CarouseLoading";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Link from "next/link";

export interface moviesProps {
  results: {
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
  }[];
}

function Parallax() {
  const { media } = useSelector((state: RootState) => state.Media);
  const { data, loading } = useFetch<moviesProps>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/discover/${media}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&limit=5`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });

  const [showControls, setShowControls] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchedMovies = data?.results?.slice(0, 5) || [];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % fetchedMovies.length);
  }, [fetchedMovies.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + fetchedMovies.length) % fetchedMovies.length
    );
  }, [fetchedMovies.length]);

  useEffect(() => {
    if (!fetchedMovies.length) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 15000);

    return () => clearInterval(interval);
  }, [nextSlide, fetchedMovies.length]);

  return (
    <div
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      className="relative w-full min-h-[750px] overflow-hidden rounded-sm shadow-lg"
    >
      {loading ? (
        <CarouseLoading />
      ) : (
        <AnimatePresence mode="wait">
          {fetchedMovies.length > 0 && (
            <motion.div
              key={fetchedMovies[currentIndex]?.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <img
                loading="lazy"
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/w1280${fetchedMovies[currentIndex].poster_path}`}
                alt={
                  fetchedMovies[currentIndex].title ||
                  fetchedMovies[currentIndex].name
                }
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 rounded-sm" />
              <div className="absolute bottom-40 sm:left-2 left-0 text-center sm:text-left sm:w-[500px] w-full text-white px-5 py-3 rounded-lg overflow-hidden min-h-[200px]">
                <h3 className="font-bold text-lg sm:text-xl text-movie_color">
                  {fetchedMovies[currentIndex].title ||
                    fetchedMovies[currentIndex].name}
                </h3>
                <div className="flex gap-2 flex-wrap justify-center sm:justify-start my-3">
                  {fetchedMovies[currentIndex].genre_ids.map((id) => (
                    <Link
                      href={{
                        pathname: `/${media}/genre/${
                          media === `movie`
                            ? moviesGenres[id as keyof typeof moviesGenres]
                            : tvGenres[id as keyof typeof moviesGenres]
                        }`,
                        query: { media, genre: id },
                      }}
                      key={id}
                      className=" bg-movie_color rounded-md text-white p-2 font-semibold hover:bg-movie_color_hover transition-all"
                    >
                      {moviesGenres[id as keyof typeof moviesGenres]}
                    </Link>
                  ))}
                </div>
                <p className="flex pb-2 justify-center sm:justify-start">
                  <span className="flex gap-0.5 items-center pr-1">
                    {fetchedMovies[currentIndex].vote_average.toFixed(1)}
                    <FaStar className="text-yellow-500" />
                  </span>
                  | {`${fetchedMovies[currentIndex].popularity.toFixed(0)}K`}
                </p>
                <p className="line-clamp-3 overflow-hidden text-ellipsis mb-5">
                  {fetchedMovies[currentIndex].overview}
                </p>
                <Link
                  className="p-2 text-xl hover:bg-movie_color_hover transition-all bg-movie_color rounded-md"
                  href={{
                    pathname: `/${media}/${fetchedMovies[currentIndex].id}`,
                    query: { media, id: fetchedMovies[currentIndex].id },
                  }}
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className={`absolute top-1/2 opacity-0 left-0 -translate-y-1/2 transition-all bg-black/50 p-2 h-16 rounded-e-lg text-white ${
          showControls && "opacity-100"
        }`}
      >
        <FaChevronLeft size={22} />
      </button>
      <button
        onClick={nextSlide}
        className={`absolute opacity-0 top-1/2 transition-all right-0 -translate-y-1/2 bg-black/50 p-2 h-16 rounded-s-lg text-white ${
          showControls && "opacity-100"
        }`}
      >
        <FaChevronRight size={22} />
      </button>

      {/* Thumbnails / Indicators */}
      <div
        className={`absolute bottom-5 w-full flex justify-center gap-2 opacity-0 transition-all duration-300 ${
          showControls && "opacity-100"
        }`}
      >
        {fetchedMovies.map((movie, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)}>
            <img
              loading="lazy"
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/w185${movie.poster_path}`}
              alt={movie.original_title}
              className={`w-[40px] h-[60px] sm:w-[70px] sm:h-[100px] rounded-md transition-all hover:opacity-100 ${
                index === currentIndex ? "opacity-100" : "opacity-40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Parallax;
