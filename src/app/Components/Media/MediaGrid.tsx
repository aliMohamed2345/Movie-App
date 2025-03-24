import { moviesProps } from "./Parallax";
import React from "react";
import MediaCard from "./MediaCard";
interface MediaGridProps {
  lastElementRef: (node: HTMLDivElement | null) => void;
  categoryData: moviesProps[];
}
const MediaGrid = ({ categoryData, lastElementRef }: MediaGridProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center max-w-screen-lg mx-auto px-4">
        {categoryData.map(
          (data) =>
            data.results!.length > 0 &&
            data!.results.map((movie, index) => {
              if (!movie.poster_path) return;
              return (
                <div
                  key={movie.id}
                  ref={
                    index === data?.results?.length - 1 ? lastElementRef : null
                  }
                >
                  <MediaCard mediaData={movie} />
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default MediaGrid;
