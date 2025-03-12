import MovieCarousel from "@/app/Components/Media/Carousel";
import { movieCategories } from "@/app/data/movieCategories";
import React from "react";
import Slider from "@/app/Components/Media/Slider";
const movies = () => {
  return (
    <>
      <MovieCarousel media="movie" />{" "}
      {movieCategories.map((category, i) => (
        <Slider
          key={i}
          media="movie"
          category={
            category.split(` `).length > 1
              ? category.split(" ").join("_").toLowerCase()
              : category.toLowerCase()
          }
        />
      ))}
    </>
  );
};

export default movies;
