"use client";
import Carousel from "@/app/Components/Media/Carousel";
import Slider from "@/app/Components/Media/Slider";
import React from "react";
import { tvCategories } from "@/app/data/movieCategories";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setMedia } from "@/app/redux/Slices/MediaSlice";
const Tv = () => {
  let formattedCategory = "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMedia("tv"));
  }, [dispatch, formattedCategory]);
  return (
    <>
      <Carousel />
      {tvCategories.map((category, i) => {
        formattedCategory =
          category.split(` `).length > 1
            ? category.split(" ").join("_").toLowerCase()
            : category.toLowerCase();
        return <Slider category={formattedCategory} key={i} />;
      })}
    </>
  );
};

export default Tv;
