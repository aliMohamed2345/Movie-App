import Carousel from "@/app/Components/Media/Carousel";
import Slider from "@/app/Components/Media/Slider";
import React from "react";
import { tvCategories } from "@/app/data/movieCategories";
const tv = () => {
  return (
    <>
      <Carousel media="tv" />
      {tvCategories.map((category, i) => (
        <Slider
          key={i}
          media="tv"
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

export default tv;
