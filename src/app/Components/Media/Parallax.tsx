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
      className="relative w-full min-h-[700px] overflow-hidden rounded-2xl shadow-2xl"
    >
      {loading ? (
        <CarouseLoading />
      ) : (
        <AnimatePresence mode="wait">
          {fetchedMovies.length > 0 && (
            <motion.div
              key={fetchedMovies[currentIndex]?.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                loading="lazy"
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/w1280${fetchedMovies[currentIndex].poster_path}`}
                alt={
                  fetchedMovies[currentIndex].title ||
                  fetchedMovies[currentIndex].name
                }
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/50 to-transparent" />
              <div className="absolute bottom-10 left-4 sm:left-8 max-w-[90%] sm:max-w-[600px] text-secondary_text_color p-6 rounded-xl bg-primary/30 backdrop-blur-md">
                <h3 className="font-bold text-2xl sm:text-3xl tracking-tight text-movie_color">
                  {fetchedMovies[currentIndex].title ||
                    fetchedMovies[currentIndex].name}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-start">
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
                      className="px-3 py-1.5 bg-movie_color text-sm font-semibold rounded-full hover:bg-movie_color_hover text-secondary_text_color transition-all duration-300"
                    >
                      {moviesGenres[id as keyof typeof moviesGenres]}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <span className="flex items-center gap-1 text-lg text-secondary_text_color">
                    <FaStar className="text-yellow-400" />
                    {fetchedMovies[currentIndex].vote_average.toFixed(1)}
                  </span>
                  <span className="text-text_color">
                    {`${fetchedMovies[currentIndex].popularity.toFixed(0)}K Views`}
                  </span>
                </div>
                <p className="mt-4 text-text_color line-clamp-3">
                  {fetchedMovies[currentIndex].overview}
                </p>
                <Link
                  className="mt-6 inline-block px-6 py-3 bg-movie_color rounded-full text-lg font-semibold hover:bg-movie_color_hover text-secondary_text_color transition-all duration-300"
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
        className={`absolute top-1/2 left-4 -translate-y-1/2 bg-primary/50 p-4 rounded-full text-secondary_text_color transition-all duration-300 ${
          showControls ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className={`absolute top-1/2 right-4 -translate-y-1/2 bg-primary/50 p-4 rounded-full text-secondary_text_color transition-all duration-300 ${
          showControls ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <FaChevronRight size={24} />
      </button>

      {/* Thumbnails / Indicators */}
      <div
        className={`absolute bottom-6 w-full flex justify-center gap-3 transition-all duration-300 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {fetchedMovies.map((movie, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="group relative"
          >
            <img
              loading="lazy"
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/w185${movie.poster_path}`}
              alt={movie.original_title}
              className={`w-16 h-24 sm:w-20 sm:h-28 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                index === currentIndex
                  ? "opacity-100 ring-2 ring-movie_color"
                  : "opacity-60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Parallax;