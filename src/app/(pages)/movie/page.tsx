"use client";
import Carousel from "@/app/Components/Media/Carousel";
import { movieCategories } from "@/app/data/movieCategories";
import React, { useEffect } from "react";
import Slider from "@/app/Components/Media/Slider";
import { useDispatch } from "react-redux";
import { setMedia } from "@/app/redux/Slices/MediaSlice";
const Movies = () => {
  let newFormattedCategory = "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMedia("movie"));
  }, [dispatch]);
  return (
    <>
      <Carousel />
      {movieCategories.map((category, i) => {
        newFormattedCategory =
          category.split(" ").length > 1
            ? category.split(" ").join("_").toLowerCase()
            : category.toLowerCase();
        return <Slider category={newFormattedCategory} key={i} />;
      })}
    </>
  );
};

export default Movies;
