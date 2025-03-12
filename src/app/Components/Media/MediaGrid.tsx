import { moviesProps } from "./Carousel";
import React from "react";
import MediaCard from "./MediaCard";
interface MediaGridProps {
  lastElementRef: (node: HTMLDivElement | null) => void;
  categoryData: moviesProps[];
}
const MediaGrid = ({ categoryData, lastElementRef }: MediaGridProps) => {
  return (
    <div className="container mb-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  items-center justify-center">
      {categoryData.map(
        (data) =>
          data.results!.length > 0 &&
          data!.results.map((movie, index) => (
            <div
              key={movie.id}
              ref={index === data?.results?.length - 1 ? lastElementRef : null}
            >
              <MediaCard mediaData={movie} />
            </div>
          ))
      )}
    </div>
  );
};

export default MediaGrid;
