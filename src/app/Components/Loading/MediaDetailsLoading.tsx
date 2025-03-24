const MediaDetailsLoading = () => {
  return (
    <div className="container mx-auto pt-20 px-4 animate-pulse">
      {/* Movie Details Section */}
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        {/* Movie Poster Skeleton */}
        <div className="relative w-[250px] sm:w-[300px] h-[400px] bg-background_hover rounded-lg"></div>

        {/* Movie Information Skeleton */}
        <div className="flex flex-col sm:w-[60%] w-full text-center sm:text-left">
          <div className="h-8 w-3/4 bg-background_hover rounded mb-4"></div>
          <div className="h-6 w-1/3 bg-background_hover rounded mb-4"></div>
          <div className="h-20 w-full bg-background_hover rounded mb-4"></div>
          <div className="flex flex-wrap gap-3 mt-5 justify-center sm:justify-start">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-24 bg-background_hover rounded-md"
                ></div>
              ))}
          </div>
        </div>
      </div>

      {/* Movie Info Skeleton */}
      <div className="p-6 mt-10">
        <div className="h-6 w-32 bg-background_hover rounded mx-auto mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-6 w-3/4 bg-background_hover rounded mx-auto"
              ></div>
            ))}
        </div>
      </div>

      {/* Cast Section Skeleton */}
      <div className="p-6 mt-10">
        <div className="h-6 w-48 bg-background_hover rounded mx-auto mb-4"></div>
        <div className="h-40 w-full bg-background_hover rounded"></div>
      </div>

      {/* Media Section Skeleton */}
      <div className="bg-secondary p-3 mb-5 rounded-xl">
        <div className="h-6 w-32 bg-background_hover rounded mx-auto mb-4"></div>
        <div className="h-40 w-full bg-background_hover rounded"></div>
      </div>

      {/* Similar Movies Skeleton */}
      <div>
        <div className="h-6 w-48 bg-background_hover rounded mx-auto mb-4"></div>
        <div className="h-40 w-full bg-background_hover rounded"></div>
      </div>
    </div>
  );
};

export default MediaDetailsLoading;
